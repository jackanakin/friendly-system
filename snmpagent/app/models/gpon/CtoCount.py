from django.db import models
from app._models.bra_admin.Ap import Ap

class CtoCount(models.Model):
    description = models.CharField(max_length=100)
    online = models.IntegerField(null=False)
    offline = models.IntegerField(null=False)

    erp_ap_id = models.IntegerField()
    gpon_integration_id = models.IntegerField()

    class Meta:
        db_table = "cto_count"
    
    def __str__(self):
        return '{}|{}'.format(self.description, self.online)