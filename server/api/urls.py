"""
URL configuration for REST API part of project.

"""
from django.urls import path
from .views import ExampleView

app_name = 'apiapp'

urlpatterns = [
    path('hello/', ExampleView.as_view(), name='hello_world'),
]
