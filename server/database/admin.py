from django.contrib import admin
from django.db.models import QuerySet
from django.http import HttpRequest

from .models import User, Message
from django.contrib import admin


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    
    list_display = ["user_id", "first_name", 
                    "last_name", "email",
                    "password"]
    
    class Meta:
        pass
