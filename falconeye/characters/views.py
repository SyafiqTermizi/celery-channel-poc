from django.views.generic import ListView, TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import generics
from rest_framework import permissions

from .serializers import PeopleSerializer

from .models import People


class PeopleListView(LoginRequiredMixin, ListView):
    model = People


class PeopleCreateView(LoginRequiredMixin, TemplateView):
    template_name = "characters/people_form.html"


class PeopleCreateApiView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PeopleSerializer
