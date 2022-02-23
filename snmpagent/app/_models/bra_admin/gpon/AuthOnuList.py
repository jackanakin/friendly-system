from django.db import models

class AuthOnuList(models.Model):
    onuPonIndex = models.CharField(max_length=20)

    auth_onu_list_onu_type=models.IntegerField()
        #Integer32
    auth_onu_list_mac=models.CharField(max_length=100)
        #STRING
    onu_status=models.IntegerField()
        #Integer32
    auth_onu_software_version=models.CharField(max_length=100)
        #String
    auth_onu_hardware_version=models.CharField(max_length=100)
        #string
    auth_onu_list_onu_reboot=models.IntegerField()
        #Integer32
    auth_onu_cpu_usage=models.IntegerField()
        #Integer32
    auth_onu_memory_usage=models.IntegerField()
        #Integer32
    auth_onu_mac_number_limit=models.IntegerField()
        #Integer32
    auth_onu_mac_number_limit_apply=models.IntegerField()
        #Integer32
    auth_onu_last_up=models.CharField(max_length=100)
        #STRING
    auth_onu_last_down=models.CharField(max_length=100)
        #STRING
    auth_onu_list_onu_type_description=models.CharField(max_length=100)
        #STRING

    class Meta:
        db_table = "auth_onu_list"
    
    def __str__(self):
        return '{}|{}|{}|{}|{}|{}|{}|{}|{}|{}|{}|{}|{}|{}|'.format(self.onuPonIndex, self.auth_onu_list_onu_type, self.auth_onu_list_mac, self.onu_status, self.auth_onu_software_version, self.auth_onu_hardware_version, self.auth_onu_list_onu_reboot,
            self.auth_onu_cpu_usage, self.auth_onu_memory_usage, self.auth_onu_mac_number_limit, self.auth_onu_mac_number_limit_apply, self.auth_onu_last_up, self.auth_onu_last_down, self.auth_onu_list_onu_type_description)