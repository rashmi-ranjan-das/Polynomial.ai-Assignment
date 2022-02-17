"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework import routers
from urlapp import views
from django.urls.conf import include

router_text = routers.DefaultRouter()
router_ip = routers.DefaultRouter()
router_text.register('', views.UserTextViewSet, basename='usertext')
router_ip.register('ip', views.UserTextAccessViewset, basename='usertextaccess')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router_text.urls)),
    path('api/', include(router_ip.urls)),
]
