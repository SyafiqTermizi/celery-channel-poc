# Generated by Django 3.2.3 on 2021-06-02 15:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('characters', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='people',
            old_name='home_world',
            new_name='homeworld',
        ),
    ]
