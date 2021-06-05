from django.contrib import admin

from .models import People, Planet, Vehicle


admin.site.register(People)
admin.site.register(Planet)
admin.site.register(Vehicle)
