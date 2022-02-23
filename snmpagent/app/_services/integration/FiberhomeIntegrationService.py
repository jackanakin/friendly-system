import datetime
from typing import List, Dict
try:
    from django.utils import simplejson as json
except ImportError:
    import json

from app._models.bra_admin.Ap import Ap
from app._models.bra_admin.Cpe import Cpe
from app._models.bra_admin.GponIntegration import GponIntegration
import app._services.integration.fiberhome.FiberhomeSnmpExtractorService as FiberhomeSnmpExtractorService

def run():
    fiberhome_olt_list: List[Ap] = Ap.objects.all().filter(enabled=True)
    
    for ap in fiberhome_olt_list:
        print("started {} IP {}:{} integration at {}".format(ap.description, ap.address, ap.snmp_port, datetime.datetime.now()))

        Cpe.objects.filter(erp_ap_id=ap.erp_id).update(olt_matched=False)
        cpes = Cpe.objects.all().filter(erp_ap_id=ap.erp_id)
        cpe_list: Dict[str, Cpe] = {}
        for cpe in cpes:
            if cpe.onu_serial:
                cpe_list[cpe.onu_serial] = cpe

        gpon_integration = GponIntegration(datetime=datetime.datetime.now(), erp_ap_id=ap.erp_id)
        gpon_integration.save()
        FiberhomeSnmpExtractorService.run(ap, gpon_integration, cpe_list)

        print("finished {} IP {}:{} integration at {}".format(ap.description, ap.address, ap.snmp_port, datetime.datetime.now()))