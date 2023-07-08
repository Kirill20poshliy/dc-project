"""
Сериализация моделей.

Содержит классы сериализация трех моделей: Пользователей, сообщений и вложений
"""


from rest_framework import serializers

from .models import (
    UserProfile,
    Message,
)

class UserProfileSerializer(serializers.ModelSerializer):
    """
    Сериализация модели UserProfile
    """
    class Meta:
        model = UserProfile
        fields = (
            "first_name",
            "last_name",
            "middle_name",
            "login",
            "type",
        )
        
        
# class AttachmentSerializer(serializers.ModelSerializer):
#     """
#     """
#     class Meta:
#         model = Attachment
#         fields = (
#             "file",
#             "file_name",
#             "file_type",
#         )        


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
            "attach",
            "status",
            "important",
            "deleted",
        )