import sys
from pysnmp.hlapi import *
import logging

def create(host, oid, community):
    result = []
    try:
        for (errorIndication,
            errorStatus,
            errorIndex,
            varBinds) in nextCmd(SnmpEngine(),
                                CommunityData(community),
                                UdpTransportTarget((host, 161)),
                                ContextData(),
                                ObjectType(ObjectIdentity(oid)),
                                lexicographicMode=False):
            if errorIndication:
                raise ValueError(errorIndication)
            elif errorStatus:
                print('%s at %s' % (errorStatus.prettyPrint(),
                                    errorIndex and varBinds[int(errorIndex) - 1][0] or '?'),
                                    file=sys.stderr)
                raise ValueError(errorStatus.prettyPrint())
            else:
                for varBind in varBinds:
                    result.append(varBind)
    except Exception as e:
        logging.warning(msg=(host, oid, e))
    return result
