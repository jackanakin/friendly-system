from django.db import models

class PhonePrefixCity(models.Model):
   prefix = models.CharField(max_length = 4)
   city = models.CharField(max_length = 50)
   
   class Meta:
      db_table = "phone_prefix_city"