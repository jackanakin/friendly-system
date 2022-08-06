from typing import List
from app.constants.oids.OID_FiberHome_WanServiceEntry import OID_FiberHome_WanServiceEntry
from app.models.gpon.WanService import WanService
import app.services.snmp.GetBulkService as GetBulkService

def run(ap):
    wan_service_list: List[WanService] = []
    i = 0

    snmpResponse = []
    #snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_WanServiceEntry._wanConnType, ap.snmp_community)
    #snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_WanServiceEntry._wanVlanId, ap.snmp_community)
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_WanServiceEntry._wanNatEnable, ap.snmp_community) 
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_WanServiceEntry._wanDsp, ap.snmp_community) 
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_WanServiceEntry._wanPPPoeUsername, ap.snmp_community) 
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_WanServiceEntry._wanPPPoePassword, ap.snmp_community) 
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_WanServiceEntry._wanVlanMode, ap.snmp_community) 
    snmpResponse = snmpResponse + snmpResponse1
    
    while i < len(snmpResponse):
        line = str(snmpResponse[i])
        #print(line)
        substringedStart = line.rfind(OID_FiberHome_WanServiceEntry.wanServiceEntryResponse) + len(OID_FiberHome_WanServiceEntry.wanServiceEntryResponse)
        #print(substringedStart)
        substringed = line[substringedStart:]
        #print(substringed)

        valueSeparator = substringed.find("=")

        optionDotIndex = substringed[:valueSeparator].strip()
        optionSeparator = substringed.find(".")

        option = (optionDotIndex[:optionSeparator]).strip() 
        index = (optionDotIndex[optionSeparator+1:]).strip() 
        indexItem = index[index.find(".")+1:]
        index = index[:index.find(".")]
        value = (substringed[valueSeparator+1:]).strip()
        
        if (option == OID_FiberHome_WanServiceEntry._wanVlanId):
            portInfo = WanService(onuPonIndex=index, wan_conn_type=-1, wan_vlan_id=value, wan_index=indexItem)
            wan_service_list.append(portInfo)
        else:
            wan = None
            for ponInfo in wan_service_list:
                if ponInfo.onuPonIndex == index and ponInfo.wan_index == indexItem:
                    wan = ponInfo
                    break
            
            #if (option == OID_FiberHome_WanServiceEntry.wanVlanId):
                #wan.wan_vlan_id = value
            if (option == OID_FiberHome_WanServiceEntry.wanNatEnable):
                wan.wan_nat_enable = value
            if (option == OID_FiberHome_WanServiceEntry.wanDsp):
                wan.wan_dsp = value
            if (option == OID_FiberHome_WanServiceEntry.wanPPPoeUsername):
                wan.wan_pppoe_username = value
            if (option == OID_FiberHome_WanServiceEntry.wanPPPoePassword):
                wan.wan_pppoe_password = value
            if (option == OID_FiberHome_WanServiceEntry.wanVlanMode):
                wan.wan_vlan_mode = value

        i += 1


    return wan_service_list
