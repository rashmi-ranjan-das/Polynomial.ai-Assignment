from django.db import models

class UserText(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    short_url = models.CharField(max_length=15, unique=True, blank=True)
    data = models.TextField()
    encrypted = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created"]

    def __str__(self):
        return f'{self.short_url}'


class UserTextAccess(models.Model):
    accessed = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField()
    user_text = models.ForeignKey(UserText, on_delete=models.CASCADE)

    class Meta:
        ordering = ["-accessed"]
