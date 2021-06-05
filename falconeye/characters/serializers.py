from typing import Dict

from rest_framework import serializers

from .models import GenderChoices, People, Planet
from .validators import birth_year_validator


class PlanetSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    population = serializers.IntegerField()
    climate = serializers.CharField()
    terrain = serializers.CharField()

    class Meta:
        model = Planet
        fields = ["name", "population", "climate", "terrain"]


class PeopleSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    birth_year = serializers.CharField(validators=[birth_year_validator])
    gender = serializers.ChoiceField(choices=GenderChoices.values)
    homeworld = PlanetSerializer()

    class Meta:
        model = People
        fields = ["name", "birth_year", "gender", "homeworld"]

    def create(self, validated_data: Dict):
        homeworld_data = validated_data.pop("homeworld")
        validated_data.update(
            {
                "homeworld": Planet.objects.create(**homeworld_data),
            }
        )
        return People.objects.create(**validated_data)
