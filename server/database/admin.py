from django.contrib import admin
from .models import UserProfile, Message, Attachment

"""
Административные классы для управления моделями UserProfile, Message в административном интерфейсе Django.
"""

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'middle_name', 'login', 'type')


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('message_id', 'sender', 'recipient', 'date_received', 'subject', 'status', 'important')
    list_filter = ('status', 'important')
    search_fields = ('subject', 'sender__user__username', 'recipient__user__username')


@admin.register(Attachment)
class AttachmentAdmin(admin.ModelAdmin):
    list_display = ('message', 'file', 'file_name', 'file_type')


