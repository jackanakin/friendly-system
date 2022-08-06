from django.db import models
from app._models.bra_admin.Ap import Ap

class GponIntegration(models.Model):
    datetime = models.DateTimeField(auto_now_add=False, null=False)
    erp_ap_id = models.IntegerField()

    class Meta:
        db_table = "gpon_integration"
    