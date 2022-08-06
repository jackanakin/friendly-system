from typing import List
from app.constants.oids.OID_FiberHome_PortInfoTableEntry import OID_FiberHome_PortInfoTableEntry
from app.models.gpon.PortInfoTable import PortInfoTable
import app.services.snmp.GetBulkService as GetBulkService

def run(ap):
    port_info_list: List[PortInfoTable] = []
    i = 0

    snmpResponse = []
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_PortInfoTableEntry._portSpeed, ap.snmp_community)
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_PortInfoTableEntry._portName, ap.snmp_community)
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_PortInfoTableEntry._portMode, ap.snmp_community) 
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_PortInfoTableEntry._portVlan, ap.snmp_community) 
    snmpResponse = snmpResponse + snmpResponse1
    snmpResponse1 = GetBulkService.create(ap.address, OID_FiberHome_PortInfoTableEntry._portMac, ap.snmp_community) 
    snmpResponse = snmpResponse + snmpResponse1
    
    while i < len(snmpResponse):
        line = str(snmpResponse[i])
        #print(line)
        substringedStart = line.rfind(OID_FiberHome_PortInfoTableEntry.portInfoTableEntryResponse) + len(OID_FiberHome_PortInfoTableEntry.portInfoTableEntryResponse)
        #print(substringedStart)
        substringed = line[substringedStart:]
        #print(substringed)

        valueSeparator = substringed.find("=")

        optionDotIndex = substringed[:valueSeparator].strip()
        optionSeparator = substringed.find(".")

        option = (optionDotIndex[:optionSeparator]).strip() 
        index = (optionDotIndex[optionSeparator+1:]).strip() 
        value = (substringed[valueSeparator+1:]).strip()
        
        if (option == OID_FiberHome_PortInfoTableEntry.portSpeed):
            portInfo = PortInfoTable(onuPonSubIndex=index, port_speed=value)
            port_info_list.append(portInfo)
        else:
            portInfo = None
            for ponInfo in port_info_list:
                if ponInfo.onuPonSubIndex == index:
                    portInfo = ponInfo
                    break
            
            if (option == OID_FiberHome_PortInfoTableEntry.portName):
                portInfo.port_name = value
            if (option == OID_FiberHome_PortInfoTableEntry.portMode):
                portInfo.port_mode = value
            if (option == OID_FiberHome_PortInfoTableEntry.portVlan):
                portInfo.port_vlan = value
            if (option == OID_FiberHome_PortInfoTableEntry.portMac):
                portInfo.port_mac = value

        i += 1


    return port_info_list
