from typing import Optional, TypedDict

import requests
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from celery import shared_task

from falconeye.utils import update_task_status


class People(TypedDict):
    name: str
    birth_year: str
    gender: str
    homeworld: str


class Planet(TypedDict):
    name: str
    population: int
    climate: str
    terrain: str


class ProcessedPeople(People):
    homeworld: Planet


class SearchData(TypedDict):
    name: str
    group_name: str
    result: Optional[People]


@shared_task
def search_people(search_data: SearchData) -> SearchData:
    update_task_status(search_data["group_name"], "Fetching user data...")

    name = search_data["name"]
    url = f"https://swapi.dev/api/people/?search={name}"

    try:
        search_result = requests.get(url).json()["results"][0]
    except IndexError:
        return None

    search_data["result"] = search_result
    return search_data


@shared_task
def get_homeworld(search_data: SearchData) -> SearchData:
    update_task_status(search_data["group_name"], "Fetching homeworld data...")

    home_url = search_data["result"]["homeworld"]
    planet: Planet = requests.get(home_url).json()
    search_data["result"].update({"homeworld": planet})

    return search_data


@shared_task
def broadcast_to_group(search_data: SearchData) -> None:
    group_name = search_data["group_name"]
    data = search_data["result"]

    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        group_name, {"type": "search_result", "data": data}
    )


search_user_by_name = search_people.s() | get_homeworld.s() | broadcast_to_group.s()
