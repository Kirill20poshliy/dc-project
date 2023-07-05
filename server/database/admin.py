from django.contrib import admin
from .models import UserProfile, Message, Attachment

from django.contrib import admin
from .models import UserProfile, Message, Attachment

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'first_name', 'last_name', 'middle_name', 'login', 'password', 'type')

