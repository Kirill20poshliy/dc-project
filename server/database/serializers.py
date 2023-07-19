"""
Сериализация моделей.

Содержит классы сериализация трех моделей: Пользователей, сообщений и вложений
"""


from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Attachment, Message, UserProfile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
        )


class UserProfileSerializer(serializers.ModelSerializer):
    """
    Сериализация модели UserProfile
    """

    class Meta:
        model = UserProfile
        user = UserSerializer
        fields = (
            "id",
            "first_name",
            "last_name",
            "middle_name",
            "user",
            "type",
        )


class AttachmentSerializer(serializers.ModelSerializer):
    """ """

    class Meta:
        model = Attachment
        fields = (
            "id",   
            "file",
            "file_name",
            "file_type",
        )


class MessageSerializer(serializers.ModelSerializer):
    """
    Сериализация модели Message
    """

    class Meta:
        model = Message
        attach = AttachmentSerializer()
        fields = (
            "message_id",
            "sender",
            "recipient",
            "date_received",
            "subject",
            "body",
            "attach",
            "status",
            "status_sender",
            "status_recipient",
            "important",
            "important_sender",
            "important_recipient",
            "deleted",
            "deleted_sender",
            "deleted_recipient",
        
        )
