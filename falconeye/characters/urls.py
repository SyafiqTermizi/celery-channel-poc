from django.urls import path

from .views import PeopleListView, PeopleCreateView, PeopleCreateApiView

app_name = "characters"
urlpatterns = [
    path("", PeopleListView.as_view(), name="list"),
    path("create", PeopleCreateView.as_view(), name="create"),
    path("api/create", PeopleCreateApiView.as_view(), name="api-create"),
]
