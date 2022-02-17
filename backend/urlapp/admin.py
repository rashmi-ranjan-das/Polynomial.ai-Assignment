from django.contrib import admin
from .models import UserText, UserTextAccess
# Register your models here.
@admin.register(UserText)
class UserTextadmin(admin.ModelAdmin):
    list_display=['id','created','short_url','data', 'encrypted']

@admin.register(UserTextAccess)
class UserTextAccessadmin(admin.ModelAdmin):
    list_display=['id','accessed','ip_address','user_text']