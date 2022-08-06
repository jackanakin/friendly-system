from pysnmp.hlapi import *

def create(host, oid, community):
    result = []
    iterator = getCmd(SnmpEngine(),
                  CommunityData(community),
                  UdpTransportTarget((host, 161)),
                  ContextData(),
                  ObjectType(ObjectIdentity(oid)))

    errorIndication, errorStatus, errorIndex, varBinds = next(iterator)

    if errorIndication:  # SNMP engine errors
        return "#"
    else:
        if errorStatus:  # SNMP agent errors
            return "#"
        else:
            for varBind in varBinds:  # SNMP response contents
                return (' = '.join([x.prettyPrint() for x in varBind]))

    return result