from django.db import models
from app.models.Ap import Ap

class ApAvailableOid(models.Model):
    description = models.CharField(max_length=100)
    oid = models.CharField(max_length=60, null=True, blank=True)
    oid_reduced = models.CharField(max_length=60, null=True, blank=True)
    ap = models.ForeignKey(Ap, on_delete=models.CASCADE, null=True, default=None, blank=True)

    class Meta:
        db_table = "ap_available_oid"