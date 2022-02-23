from django.db import models

class WanService(models.Model):
    onuPonIndex = models.CharField(max_length=20)

    wan_index=models.IntegerField()
        #Integer32
    wan_conn_type=models.IntegerField()
        #Integer32
        #0:bridge
		#1:route"
    wan_vlan_id=models.IntegerField()
        #Integer32
    wan_nat_enable=models.IntegerField()
        #Integer32
        #0:disable
		#1:enable"
    wan_dsp=models.IntegerField()
        #Integer32
        #"DSP
		#0:DHCP
		#1:Static
		#2:PPPOE
		#0xffff:null"
    wan_pppoe_username= models.CharField(max_length=100)
        #STRING
    wan_pppoe_password= models.CharField(max_length=100)
        #STRING
    wan_vlan_mode=models.IntegerField()

    class Meta:
        db_table = "wan_service"
    
    def __str__(self):
        return '{}|ind={}|{}|{}|{}|{}|{}|{}|{}|'.format(self.onuPonIndex, self.wan_index, self.wan_conn_type, self.wan_vlan_id, self.wan_nat_enable, self.wan_dsp, self.wan_pppoe_username, self.wan_pppoe_password,
            self.wan_vlan_mode)