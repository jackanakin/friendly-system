from typing import List
from app.constants.oids.OID_FiberHome_AuthOnuListEntry import OID_FiberHome_AuthOnuListEntry
from app.models.gpon.AuthOnuList import AuthOnuList
import app.services.snmp.GetBulkService as GetBulkService

def run(ap):
    auth_onu_list: List[AuthOnuList] = []
    i = 0

    snmpResponse = []
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_AuthOnuListEntry._authOnuListOnuType, ap.snmp_community)
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_AuthOnuListEntry._authOnuListMac, ap.snmp_community)
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_AuthOnuListEntry._onuStatus, ap.snmp_community) 
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_AuthOnuListEntry._authOnuSoftwareVersion, ap.snmp_community) 
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_AuthOnuListEntry._authOnuHardwareVersion, ap.snmp_community) 
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_AuthOnuListEntry._authOnuCpuUsage, ap.snmp_community) 
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_AuthOnuListEntry._authOnuMemoryUsage, ap.snmp_community) 
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_AuthOnuListEntry._authOnuMacNumberLimit, ap.snmp_community)
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_AuthOnuListEntry._authOnuMacNumberLimitApply, ap.snmp_community) 
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_AuthOnuListEntry._authOnuLastUp, ap.snmp_community) 
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_AuthOnuListEntry._authOnuLastDown, ap.snmp_community) 
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_AuthOnuListEntry._authOnuListOnuTypeDescription, ap.snmp_community)
    snmpResponse = snmpResponse + snmpResponse1
    
    while i < len(snmpResponse):
        line = str(snmpResponse[i])
        #print(line)
        substringedStart = line.rfind(OID_FiberHome_AuthOnuListEntry.authOnuListEntryResponse) + len(OID_FiberHome_AuthOnuListEntry.authOnuListEntryResponse)
        #print(substringedStart)
        substringed = line[substringedStart:]
        #print(substringed)

        valueSeparator = substringed.find("=")

        optionDotIndex = substringed[:valueSeparator].strip()
        optionSeparator = substringed.find(".")

        option = (optionDotIndex[:optionSeparator]).strip() 
        index = (optionDotIndex[optionSeparator+1:]).strip() 
        value = (substringed[valueSeparator+1:]).strip()
        
        if (option == OID_FiberHome_AuthOnuListEntry.authOnuListOnuType):
            authOnu = AuthOnuList(onuPonIndex=index, auth_onu_list_onu_type=value)
            auth_onu_list.append(authOnu)
        else:
            authOnu = None
            for ponInfo in auth_onu_list:
                if ponInfo.onuPonIndex == index:
                    authOnu = ponInfo
                    break
            
            if (option == OID_FiberHome_AuthOnuListEntry.authOnuListMac):
                authOnu.auth_onu_list_mac = value
            if (option == OID_FiberHome_AuthOnuListEntry.onuStatus):
                authOnu.onu_status = value
            if (option == OID_FiberHome_AuthOnuListEntry.authOnuSoftwareVersion):
                authOnu.auth_onu_software_version = value
            if (option == OID_FiberHome_AuthOnuListEntry.authOnuHardwareVersion):
                authOnu.auth_onu_hardware_version = value
            if (option == OID_FiberHome_AuthOnuListEntry.authOnuListOnuReboot):
                authOnu.auth_onu_list_onu_reboot = value
            if (option == OID_FiberHome_AuthOnuListEntry.authOnuCpuUsage):
                authOnu.auth_onu_cpu_usage = value
            if (option == OID_FiberHome_AuthOnuListEntry.authOnuMemoryUsage):
                authOnu.auth_onu_memory_usage = value
            if (option == OID_FiberHome_AuthOnuListEntry.authOnuMacNumberLimit):
                authOnu.auth_onu_mac_number_limit = value
            if (option == OID_FiberHome_AuthOnuListEntry.authOnuMacNumberLimitApply):
                authOnu.auth_onu_mac_number_limit_apply = value
            if (option == OID_FiberHome_AuthOnuListEntry.authOnuLastUp):
                authOnu.auth_onu_last_up = value
            if (option == OID_FiberHome_AuthOnuListEntry.authOnuLastDown):
                authOnu.auth_onu_last_down = value
            if (option == OID_FiberHome_AuthOnuListEntry.authOnuListOnuTypeDescription):
                authOnu.auth_onu_list_onu_type_description = value

        i += 1


    return auth_onu_list
