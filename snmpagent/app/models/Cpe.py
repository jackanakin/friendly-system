from django.db import models

class Cpe(models.Model):
   erp_cpe_id = models.IntegerField()
   erp_ap_id = models.IntegerField()
   erp_contract_id = models.IntegerField(blank=True, null=True)

   name = models.CharField(max_length = 100)
   username = models.CharField(max_length = 50)
   device_password = models.CharField(default=None, blank=True, max_length = 50, null=True)
   mac_address = models.CharField(max_length = 50)
   onu_serial = models.CharField(default=None, blank=True, max_length = 50, null=True)
   nap = models.CharField(default=None, blank=True, max_length = 50, null=True)
   nap_port = models.IntegerField(default=-1, null=False)
   technology = models.CharField(default=None, blank=True, max_length = 1, null=True)
   cadastrado = models.CharField(default=None, blank=True, max_length = 10, null=True)
   integration_updated = models.BooleanField(default=True, blank=False, null=False)
   observation = models.CharField(max_length=1000, null=True)
   address_list = models.CharField(max_length=50, null=True)

   last_snmp_index = models.CharField(max_length=50, null=True, default='')
   last_pon_index = models.CharField(max_length=20, null=True, default='')
   last_software_version = models.CharField(max_length = 30, null=True, default='')
   last_hardware_version = models.CharField(max_length = 30, null=True, default='')
   last_firmware_version = models.CharField(max_length = 30, null=True, default='')
   last_onu_type = models.IntegerField(default=-1)
   last_onu_serial = models.CharField(max_length=20, null=True, default='')
   last_rx = models.FloatField(null=True)
   last_tx = models.FloatField(null=True)
   online = models.BooleanField(default=False, null=False)
   last_online = models.DateTimeField(auto_now_add=False, null=True)

   olt_matched = models.BooleanField(default=False, blank=False, null=False)

   class Meta:
      db_table = "cpe"