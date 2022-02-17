from rest_framework import serializers
from .models import UserText, UserTextAccess
from django.conf import settings
from random import choice
from string import ascii_letters, digits
from rest_framework.response import Response
import datetime

SIZE = getattr(settings, "MAXIMUM_URL_CHARS", 7)
AVAIABLE_CHARS = ascii_letters + digits

def create_random_code(chars=AVAIABLE_CHARS):
    return "".join([choice(chars) for _ in range(SIZE)])

def create_shortened_url(model_instance):
    random_code = create_random_code()
    model_class = model_instance.__class__
    if model_class.objects.filter(short_url=random_code).exists():
        return create_shortened_url(model_instance)
    return random_code

class UserTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserText
        fields = '__all__'
    
    def create(self, validated_data):
        usertext = UserText(**validated_data)
        if 'short_url' not in validated_data.keys():
            print("######################")
            validated_data['short_url'] = create_shortened_url(usertext)
        usertext = UserText(**validated_data)
        usertext.save()
        return usertext
    
    def update(self, instance, validated_data):
        instance.created = datetime.datetime.now()
        instance.save()
        return instance

class UserTextAccessSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTextAccess
        fields = '__all__'

