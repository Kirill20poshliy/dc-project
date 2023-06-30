"""
Сериализация моделей.

Содержит классы сериализация трех моделей: Пользователей, сообщений и вложений
"""


from rest_framework import serializers

from .models import (
    UserProfile,
    Message,
    Attachment,
)

class UserProfileSerializer(serializers.ModelSerializer):
    """
    Сериализация модели UserProfile
    """
    class Meta:
        model = UserProfile
        fields = (
            "user",
            "first_name",
            "last_name",
            "middle_name",
            "login",
            "type",
        )
        

class MessageSerializer(serializers.ModelSerializer):
    """
    Сериализация модели Message
    """
    class Meta:
        model = Message
        fields = (
            "message_id",
            "sender",
            "recipient",
            "date_received",
            "subject",
            "body",
            "status",
            "important",
            "deleted",
        )