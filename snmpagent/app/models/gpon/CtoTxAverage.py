from django.db import models
from app._models.bra_admin.Ap import Ap

class CtoTxAverage(models.Model):
    description = models.CharField(max_length=100)
    value = models.FloatField(null=False)
    
    erp_ap_id = models.IntegerField()
    gpon_integration_id = models.IntegerField()

    class Meta:
        db_table = "cto_tx_average"
    
    def __str__(self):
        return '{}|{}'.format(self.description, self.value)