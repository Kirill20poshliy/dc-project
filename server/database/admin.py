from django.contrib import admin
from .models import UserProfile, Message, Attachment

admin.site.register(UserProfile)
admin.site.register(Message)
admin.site.register(Attachment)
