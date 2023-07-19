"""
ViewSet представления моделей для API веб приложения.

Файл содержит представления трех моделей: UserProfile, Message и Attachment,
которые используются для создания внутренней почты и связанных с ней объектов.
"""


from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.viewsets import ModelViewSet

from rest_framework.decorators import action
from rest_framework.response import Response

from database.models import Attachment, Message, UserProfile
from database.serializers import (
    AttachmentSerializer,
    MessageSerializer,
    UserProfileSerializer,
    UserSerializer,
)


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filterset_fields = [
        "username",
        "id",
    ]


class UserProfileViewSet(ModelViewSet):
    """
    Класс представления модели пользователей.
    Полный CRUD сущности Пользователь
    """

    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    filterset_fields = [
        "id",
        "user",
        "type",
    ]


class AttachmentViewSet(ModelViewSet):
    """
    Класс представления модели пользователей.
    Полный CRUD сущности Вложение
    """

    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer
    # filter_backends = [
    #     "file_name"
    # ]

    @action(detail=True, methods=['post'])
    def send_id(self, request, pk=None):
        attachment = self.get_object()
        return Response(
            {'id': attachment}
        )

class MessageViewSet(ModelViewSet):
    """
    Класс представления модели сообщений.
    Полный CRUD сущности Сообщение
    """

    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    filter_backends = [
        OrderingFilter,
        DjangoFilterBackend,
    ]
    filterset_fields = [
        "sender",
        "recipient",
        "status",
        "important",
        "deleted",
    ]
    ordering_fields = [
        "date_received",
    ]
    search_fields = ["subject"]
