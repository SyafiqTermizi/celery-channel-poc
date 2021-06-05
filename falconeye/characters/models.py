from django.db import models

from .validators import birth_year_validator


class GenderChoices(models.TextChoices):
    MALE = "male", "Male"
    FEMALE = "female", "Female"
    NOT_APPLICABLE = "n/a", "Not Applicable"
    UNKNOWN = "unknown", "Unknown"


class Planet(models.Model):
    name = models.CharField(max_length=255)
    population = models.IntegerField()
    climate = models.CharField(max_length=255)
    terrain = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.name


class People(models.Model):
    name = models.CharField(max_length=255)
    birth_year = models.CharField(
        max_length=255,
        validators=[birth_year_validator],
    )
    gender = models.CharField(max_length=10, choices=GenderChoices.choices)
    homeworld = models.ForeignKey(
        Planet,
        on_delete=models.SET_NULL,
        null=True,
    )

    def __str__(self) -> str:
        return self.name


class Vehicle(models.Model):
    name = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    manufacturer = models.CharField(max_length=255)
    pilots = models.ManyToManyField(People, related_name="vehicles")

    def __str__(self) -> str:
        return f"{self.model} - {self.name}"
