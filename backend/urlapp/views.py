from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserTextSerializer, UserTextAccessSerializer
from rest_framework.response import Response
from .models import UserText, UserTextAccess

# Create your views here.

class UserTextViewSet(viewsets.ModelViewSet):
    serializer_class = UserTextSerializer
    queryset = UserText.objects.all()

    def retrieve(self, request, pk=None):
        code = request.path[1:8]
        print(code)
        instance = UserText.objects.get(short_url = code)
        return Response(self.serializer_class(instance).data)

class UserTextAccessViewset(viewsets.ModelViewSet):
    serializer_class = UserTextAccessSerializer
    # queryset = UserTextAccess.objects.all()

    def get_queryset(self):
        code = self.request.query_params.get('text')
        print(code)
        instance = UserText.objects.get(short_url = code)
        print(instance.id)
        ip_list =  UserTextAccess.objects.filter(user_text = instance)
        print(ip_list)
        return ip_list

