from typing import List
from app._constants.OID_FiberHome_OnuPonInfoEntry import OID_FiberHome_OnuPonInfoEntry
from app._models.bra_admin.gpon.OnuPonInfo import OnuPonInfo
import app._services.snmp.GetBulkService as GetBulkService

def run(ap):
    onu_pon_info_list: List[OnuPonInfo] = []
    i = 0
    
    snmpResponse = GetBulkService.create(ap.address, OID_FiberHome_OnuPonInfoEntry.onuPonInfoEntry, ap.snmp_community)    

    while i < len(snmpResponse):
        line = str(snmpResponse[i])
        substringedStart = line.rfind(OID_FiberHome_OnuPonInfoEntry.onuPonInfoEntryResponse) + len(OID_FiberHome_OnuPonInfoEntry.onuPonInfoEntryResponse)
        substringed = line[substringedStart:]
        #print(substringed)

        valueSeparator = substringed.find("=")

        optionDotIndex = substringed[:valueSeparator].strip()
        optionSeparator = substringed.find(".")

        option = (optionDotIndex[:optionSeparator]).strip() 
        index = (optionDotIndex[optionSeparator+1:]).strip() 
        value = (substringed[valueSeparator+1:]).strip()
        
        if (option == OID_FiberHome_OnuPonInfoEntry.onuPonType):
            onuPonInfo = OnuPonInfo(onuPonIndex=index, onu_pon_type=value)
            onu_pon_info_list.append(onuPonInfo)
        else:
            onuPonInfo = None
            for ponInfo in onu_pon_info_list:
                if ponInfo.onuPonIndex == index:
                    onuPonInfo = ponInfo
                    break
            
            if (option == OID_FiberHome_OnuPonInfoEntry.onuPonName):
                onuPonInfo.onu_pon_name = value
            if (option == OID_FiberHome_OnuPonInfoEntry.onuPonEnableStatus):
                onuPonInfo.onu_pon_enable_status = value
            if (option == OID_FiberHome_OnuPonInfoEntry.onuPonSpeed):
                onuPonInfo.onu_pon_speed = value
            if (option == OID_FiberHome_OnuPonInfoEntry.onuPonRxOpticalPower):
                onuPonInfo.onu_pon_rx_optical_power = value
            if (option == OID_FiberHome_OnuPonInfoEntry.onuPonTxOpticalPower):
                onuPonInfo.onu_pon_tx_optical_power = value
            if (option == OID_FiberHome_OnuPonInfoEntry.onuPonOpticalVltage):
                onuPonInfo.onu_pon_optical_vltage = value
            if (option == OID_FiberHome_OnuPonInfoEntry.onuPonOpticalCurrent):
                onuPonInfo.onu_pon_optical_current = value
            if (option == OID_FiberHome_OnuPonInfoEntry.onuPonOpticalTemperature):
                onuPonInfo.onu_pon_optical_temperature = value
            if (option == OID_FiberHome_OnuPonInfoEntry.onuPonIsOpticalPowerValid):
                onuPonInfo.onu_pon_is_optical_power_valid = value
            if (option == OID_FiberHome_OnuPonInfoEntry.onuPonUpstreamSpeed):
                onuPonInfo.onu_pon_upstream_speed = value

        i += 1


    return onu_pon_info_list
