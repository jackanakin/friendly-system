from django.db import models

class Ap(models.Model):
    erp_id = models.IntegerField()
    description = models.CharField(max_length=100)
    oid_identification = models.CharField(max_length=60, null=True, blank=True)
    oid_identification_reduced = models.CharField(max_length=60, null=True, blank=True)

    address = models.CharField(max_length=50)
    voice_vlan = models.CharField(max_length=4)
    data_vlan = models.CharField(max_length=4)
    snmp_port = models.IntegerField(null=True, blank=True)
    snmp_community = models.CharField(max_length=20)
    enabled = models.BooleanField(default=True, blank=False, null=False)

    class Meta:
        db_table = "ap"