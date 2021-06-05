from typing import TypedDict

import requests
from celery import shared_task


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


@shared_task
def search_people(name: str) -> None:
    url = f"https://swapi.dev/api/people/?search={name}"
    try:
        search_result = requests.get(url).json()["results"][0]
    except IndexError:
        return None
    return search_result


@shared_task
def get_homeworld(people: People) -> ProcessedPeople:
    home_url = people["homeworld"]
    planet: Planet = requests.get(home_url).json()
    people.update({"homeworld": planet})

    return people


search_user_by_name = search_people.s() | get_homeworld.s()
