"""
ViewSet представления моделей для API веб приложения.

Файл содержит представления трех моделей: UserProfile, Message и Attachment,
которые используются для создания внутренней почты и связанных с ней объектов.
"""


from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import OrderingFilter 
from django_filters.rest_framework import DjangoFilterBackend

from database.models import (
    UserProfile,
    Message,
    Attachment,
)

from database.serializers import (
    UserProfileSerializer,
    MessageSerializer,
    AttachmentSerializer,
)


class UserProfileViewSet(ModelViewSet):
    """
    Класс представления модели пользователей.
    Полный CRUD сущности Пользователь
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    filterset_fields = [
        "login"
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
