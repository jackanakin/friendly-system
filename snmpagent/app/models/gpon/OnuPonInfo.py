from django.db import models

class OnuPonInfo(models.Model):
    onuPonIndex = models.CharField(max_length=20)

    onu_pon_type = models.IntegerField()
        #Integer32,
    onu_pon_name = models.CharField(max_length=100)
        #OCTET STRING,
    onu_pon_enable_status = models.IntegerField()
        #Integer32,
    onu_pon_speed = models.IntegerField()
        #Integer32,
    onu_pon_rx_optical_power = models.IntegerField()
        #Integer32,
    onu_pon_tx_optical_power = models.IntegerField()
        #Integer32,
    onu_pon_optical_vltage = models.IntegerField()
        #Integer32,
    onu_pon_optical_current = models.IntegerField()
        #Integer32,
    onu_pon_optical_temperature = models.IntegerField()
        #Integer32,
    onu_pon_is_optical_power_valid = models.IntegerField()
        #INTEGER,
    onu_pon_upstream_speed = models.IntegerField()
        #Integer32

    class Meta:
        db_table = "onu_pon_info"
    
    def __str__(self):
        return '{}|{}|{}|{}|{}|{}|{}|'.format(self.onuPonIndex, self.onu_pon_type, self.onu_pon_name, self.onu_pon_enable_status, self.onu_pon_speed, self.onu_pon_rx_optical_power,
            self.onu_pon_tx_optical_power)