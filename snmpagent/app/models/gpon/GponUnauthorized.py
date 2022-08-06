from django.db import models
from app.models.Ap import Ap

class GponUnauthorized(models.Model):
    description = models.CharField(max_length=100)
    value = models.FloatField(null=False)
    datetime = models.DateTimeField(auto_now_add=False, null=False)

    erp_ap_id = models.IntegerField()

    class Meta:
        db_table = "gpon_unauthorized"
    
    def __str__(self):
        return '{}|{}'.format(self.description, self.value)