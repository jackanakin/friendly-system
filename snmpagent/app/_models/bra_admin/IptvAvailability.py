from django.db import models

class IptvAvailability(models.Model):
    name = models.CharField(max_length=100)
    last_sequence = models.IntegerField()

    class Meta:
        db_table = "iptv_availability"