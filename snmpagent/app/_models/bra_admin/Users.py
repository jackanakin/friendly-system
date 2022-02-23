from django.db import models

class Users(models.Model):
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    password_hash = models.CharField(max_length=150)
    enabled = models.BooleanField(null=False)

    created_at = models.DateTimeField(auto_now_add=True, null=False)
    updated_at = models.DateTimeField(auto_now_add=True, null=False)

    class Meta:
        db_table = "users"