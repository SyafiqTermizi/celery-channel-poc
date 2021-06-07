import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.utils.crypto import get_random_string

from falconeye.response import Response

from .tasks import search_user_by_name


class SearchCharacterConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = get_random_string()
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )
        return self.accept()

    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    def receive(self, text_data):
        """
        search_data
            {'name': 'abc'}
        """

        search_data = json.loads(text_data)

        search_user_by_name.delay(
            {
                "name": search_data["name"],
                "group_name": self.room_group_name,
            }
        )

        self.send(Response("PENDING", "Processing data...").to_json())

    def status_update(self, event):
        """
        event
            {'type': 'status_update', 'data': {'status': 'PENDING', 'message': ''}}
        """
        self.send(Response(**event["data"]).to_json())

    def search_result(self, event):
        """
        event
            {'type': 'search_result', 'data': {...}}
        """
        data = event["data"]
        self.send(Response("SUCCESS", "Data retrieved!", data=data).to_json())
