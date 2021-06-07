from django.urls import re_path

from .consumers import SearchCharacterConsumer


websocket_urlpatterns = [
    re_path(r"ws/search/$", SearchCharacterConsumer.as_asgi()),
]
