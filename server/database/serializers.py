"""
Сериализация моделей.

Содержит классы сериализация трех моделей: Пользователей, сообщений и вложений
"""


from rest_framework import serializers

from django.contrib.auth.models import User

from .models import (
    UserProfile,
    Message,
    Attachment,
)

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
            "first_name",
            "last_name",
            "middle_name",
            "user",
            "type",
        )
        
        
class AttachmentSerializer(serializers.ModelSerializer):
    """
    """
    class Meta:
        model = Attachment
        fields = (
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
            "important",
            "deleted",
        )