from typing import List
from app._constants.OID_FiberHome_PotsUserCfgEntry import OID_FiberHome_PotsUserCfgEntry
from app._models.bra_admin.gpon.PotsUserCfgList import PotsUserCfgList
import app._services.snmp.GetBulkService as GetBulkService

def run(ap):
    pots_user_cfg_list: List[PotsUserCfgList] = []
    i = 0

    snmpResponse = []
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_PotsUserCfgEntry._potsEnable, ap.snmp_community)
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_PotsUserCfgEntry._telNum, ap.snmp_community)
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_PotsUserCfgEntry._bindingSignalName, ap.snmp_community) 
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_PotsUserCfgEntry._signalVlan, ap.snmp_community) 
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_PotsUserCfgEntry._protocolPort, ap.snmp_community) 
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_PotsUserCfgEntry._userNameSipTelNum, ap.snmp_community) 
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_PotsUserCfgEntry._sipUserName, ap.snmp_community) 
    snmpResponse = snmpResponse + snmpResponse1
    
    while i < len(snmpResponse):
        line = str(snmpResponse[i])
        #print(line)
        substringedStart = line.rfind(OID_FiberHome_PotsUserCfgEntry.authOnuListEntryResponse) + len(OID_FiberHome_PotsUserCfgEntry.authOnuListEntryResponse)
        #print(substringedStart)
        substringed = line[substringedStart:]
        #print(substringed)

        valueSeparator = substringed.find("=")

        optionDotIndex = substringed[:valueSeparator].strip()
        optionSeparator = substringed.find(".")

        option = (optionDotIndex[:optionSeparator]).strip() 
        index = (optionDotIndex[optionSeparator+1:]).strip() 
        value = (substringed[valueSeparator+1:]).strip()
        
        if (option == OID_FiberHome_PotsUserCfgEntry.potsEnable):
            potsUserCfg = PotsUserCfgList(onuPonIndex=index, pots_enable=value)
            pots_user_cfg_list.append(potsUserCfg)
        else:
            potsUserCfg = None
            for pots in pots_user_cfg_list:
                if pots.onuPonIndex == index:
                    potsUserCfg = pots
                    break
            
            if (option == OID_FiberHome_PotsUserCfgEntry.telNum):
                potsUserCfg.tel_num = value
            if (option == OID_FiberHome_PotsUserCfgEntry.bindingSignalName):
                potsUserCfg.binding_signal_name = value
            if (option == OID_FiberHome_PotsUserCfgEntry.signalVlan):
                potsUserCfg.signal_vlan = value
            if (option == OID_FiberHome_PotsUserCfgEntry.protocolPort):
                potsUserCfg.protocol_port = value
            if (option == OID_FiberHome_PotsUserCfgEntry.userNameSipTelNum):
                potsUserCfg.username_siptel_num = value
            if (option == OID_FiberHome_PotsUserCfgEntry.sipUserName):
                potsUserCfg.sip_username = value

        i += 1


    return pots_user_cfg_list
