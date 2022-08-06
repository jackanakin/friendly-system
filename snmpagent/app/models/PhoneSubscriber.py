from django.db import models

class PhoneSubscriber(models.Model):
   erp_contract_id = models.IntegerField(blank=True, null=True)

   name = models.CharField(max_length = 100)
   phone_number = models.CharField(max_length = 50)
   plan_name = models.CharField(max_length = 150, null=True)
   product_name = models.CharField(max_length = 150, null=True)
   summit_license = models.CharField(max_length = 10, null=True)
   summit_category = models.CharField(max_length = 200, null=True)
   summit_partition = models.CharField(max_length = 200, null=True)
   city = models.CharField(max_length = 50, null=False)
   
   class Meta:
      db_table = "phone_subscriber"