"""
URL configuration for REST API part of project.

"""
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from .views import AttachmentViewSet, MessageViewSet, UserProfileViewSet, UserViewSet

app_name = "apiapp"


router = DefaultRouter()
router.register("profiles", UserProfileViewSet)
router.register("messages", MessageViewSet)
router.register("attachment", AttachmentViewSet)
router.register("user", UserViewSet)


urlpatterns = [
    path("", include(router.urls)),
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "schema/swagger-ui/",
        SpectacularSwaggerView.as_view(url_name="apiapp:schema"),
        name="swagger-ui",
    ),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
]
