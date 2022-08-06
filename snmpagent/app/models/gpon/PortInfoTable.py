from django.db import models

class PortInfoTable(models.Model):
    onuPonSubIndex = models.CharField(max_length=20)

    port_speed=models.IntegerField()
        #Integer32
    port_name=models.CharField(max_length=100)
        #STRING
    port_mode=models.IntegerField()
        #Integer32
        # 1 FULL
        # 2 HALF
    port_vlan=models.CharField(max_length=100)
        #STRING
    port_mac=models.CharField(max_length=500)
        #STRING
        # : separator

    class Meta:
        db_table = "port_info_table"
    
    def __str__(self):
        return '{}|{}|{}|{}|{}|{}|'.format(self.onuPonSubIndex, self.port_speed, self.port_name, self.port_mode, self.port_vlan, self.port_mac)