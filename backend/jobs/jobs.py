from django.conf import settings
from urlapp.models import UserText
from datetime import datetime, timedelta

def schedule_api():
    user_texts = UserText.objects.all()
    for text in user_texts:
        if (datetime.now() - text.created) > timedelta(hours=24):
            text.delete()
            print("deleted")
        else:
            print("Not deleted")