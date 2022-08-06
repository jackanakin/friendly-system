from django.db import models

class PotsUserCfgList(models.Model):
    onuPonIndex = models.CharField(max_length=20)

    pots_enable=models.IntegerField()
        #INTEGER
    tel_num=models.CharField(max_length=100)
        #STRING
    binding_signal_name=models.CharField(max_length=100)
        #STRING
    signal_vlan=models.CharField(max_length=100)
        #Integer32
    protocol_port=models.IntegerField()
        #Integer32
    username_sip_tel_num=models.CharField(max_length=100)
        #STRING
    sip_username=models.CharField(max_length=100)
        #STRING

    class Meta:
        db_table = "pots_user_cfg_list"
    
    def __str__(self):
        return '{}|{}|{}|{}|{}|{}|{}|{}|'.format(self.onuPonIndex, self.pots_enable, self.tel_num, self.binding_signal_name, self.signal_vlan, self.protocol_port, self.username_siptel_num, self.sip_username)