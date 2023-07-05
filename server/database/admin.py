from django.contrib import admin
from .models import UserProfile, Message, Attachment

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'first_name', 'last_name', 'middle_name', 'login', 'password', 'type')

class MessageAdmin(admin.ModelAdmin):
    list_display = ('message_id', 'sender', 'recipient', 'date_received', 'subject', 'status', 'important')
    list_filter = ('status', 'important')
    search_fields = ('subject', 'sender__first_name', 'sender__last_name', 'recipient__first_name', 'recipient__last_name')

class AttachmentAdmin(admin.ModelAdmin):
    list_display = ('message', 'file_name', 'file_type')

admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Message, MessageAdmin)
admin.site.register(Attachment, AttachmentAdmin)