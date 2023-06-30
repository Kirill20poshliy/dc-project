"""
URL configuration for REST API part of project.

"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserProfileViewSet,
    MessageViewSet,
)

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView
)

app_name = 'apiapp'


router =  DefaultRouter()
router.register("profiles", UserProfileViewSet)
router.register("messages", MessageViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='apiapp:schema'), name='swagger-ui'),
]
