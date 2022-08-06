from django.db import models
from app._models.bra_admin.Ap import Ap

class GponRxAverage(models.Model):
    description = models.CharField(max_length=100)
    value = models.FloatField(null=False)
    
    erp_ap_id = models.IntegerField()
    gpon_integration_id = models.IntegerField()

    class Meta:
        db_table = "gpon_rx_average"
    
    def __str__(self):
        return '{}|{}'.format(self.description, self.value)