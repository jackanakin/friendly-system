from django.db import models

class CpeRecord(models.Model):
    erp_cpe_id = models.IntegerField(default=-1)
    erp_ap_id = models.IntegerField()
    online = models.BooleanField(default=True, blank=False, null=False)

    snmp_index = models.CharField(max_length=50, null=False, default='')
    pon_index = models.CharField(max_length=20, null=False, default='')
    software_version = models.CharField(max_length = 30, null=False, default='')
    hardware_version = models.CharField(max_length = 30, null=False, default='')
    firmware_version = models.CharField(max_length = 30, null=False, default='')
    onu_type = models.IntegerField()
    onu_serial = models.CharField(max_length=20, null=False, default='')
    rx = models.FloatField(null=True)
    tx = models.FloatField(null=True)
    wan_config = models.BooleanField(default=False, blank=False, null=False)

    onu_pon_type = models.IntegerField(blank=True, null=True)
    onu_pon_enable_status = models.IntegerField(blank=True, null=True)
    onu_pon_speed = models.IntegerField(blank=True, null=True)
    onu_pon_optical_vltage = models.IntegerField(blank=True, null=True)
    onu_pon_optical_current = models.IntegerField(blank=True, null=True)
    onu_pon_optical_temperature = models.IntegerField(blank=True, null=True)
    onu_pon_is_optical_power_valid = models.IntegerField(blank=True, null=True)
    onu_pon_upstream_speed = models.IntegerField(blank=True, null=True)

    onu_status=models.IntegerField(blank=True, null=True)
    auth_onu_cpu_usage=models.IntegerField(blank=True, null=True)
    auth_onu_memory_usage=models.IntegerField(blank=True, null=True)
    auth_onu_mac_number_limit=models.IntegerField(blank=True, null=True)
    auth_onu_mac_number_limit_apply=models.IntegerField(blank=True, null=True)
    auth_onu_last_up=models.CharField(max_length=100, null=True, blank=True)
    auth_onu_last_down=models.CharField(max_length=100, null=True, blank=True)
    auth_onu_list_onu_type_description=models.CharField(max_length=100, null=True, blank=True)

    port_speed=models.CharField(max_length=200, null=True, blank=True)
    port_name=models.CharField(max_length=200, null=True, blank=True)
    port_mode=models.CharField(max_length=200, null=True, blank=True)
    port_vlan=models.CharField(max_length=200, null=True, blank=True)
    port_mac=models.CharField(max_length=1000, null=True, blank=True)

    pots_enable=models.BooleanField(default=False, blank=False, null=False)
    tel_num=models.CharField(max_length=100, null=True, blank=True)
    binding_signal_name=models.CharField(max_length=100, null=True, blank=True)
    signal_vlan=models.CharField(max_length=200, null=True, blank=True)
    protocol_port=models.IntegerField(blank=True, null=True)
    username_sip_tel_num=models.CharField(max_length=100, null=True, blank=True)
    sip_username=models.CharField(max_length=100, null=True, blank=True)

    wan_index=models.CharField(max_length=200, null=True, blank=True)
    wan_conn_type=models.CharField(max_length=200, null=True, blank=True)
    wan_vlan_id=models.CharField(max_length=200, null=True, blank=True)
    wan_nat_enable=models.CharField(max_length=200, null=True, blank=True)
    wan_dsp=models.CharField(max_length=200, null=True, blank=True)
    wan_pppoe_username= models.CharField(max_length=200, null=True, blank=True)
    wan_pppoe_password= models.CharField(max_length=200, null=True, blank=True)
    wan_vlan_mode=models.CharField(max_length=200, null=True, blank=True)

    datetime = models.DateTimeField(auto_now_add=False, null=False)
    gpon_integration_id = models.IntegerField()

    class Meta:
        db_table = "cpe_record"
