import datetime

from app._constants.OID_FiberHome import OID_FiberHome
import app._services.snmp.GetOIDService as GetOIDService

def run(ap, snpm_id):
    date = datetime.datetime.now()

    result = GetOIDService.create(ap.address, OID_FiberHome.onuPonRxOpticalPower + '.' + snpm_id, ap.snmp_community)
    line = str(result)
    substringedStart = line.rfind(OID_FiberHome.onuPonRxOpticalPowerReduced) + len(OID_FiberHome.onuPonRxOpticalPowerReduced) + 1
    substringed = line[substringedStart:]
    endID = substringed.find("=")
    rx = (substringed[endID+1:]).strip()
    rx = round(float(rx)/100, 2)

    result = GetOIDService.create(ap.address, OID_FiberHome.onuPonTxOpticalPower + '.' + snpm_id, ap.snmp_community)
    line = str(result)
    substringedStart = line.rfind(OID_FiberHome.onuPonTxOpticalPowerReduced) + len(OID_FiberHome.onuPonTxOpticalPowerReduced) + 1
    substringed = line[substringedStart:]
    endID = substringed.find("=")
    tx = (substringed[endID+1:]).strip()
    tx = round(float(tx)/100, 2)

    response = {'tx': tx, 'rx': rx}
    
    return response
