from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotFound
import logging

from django.http.response import HttpResponseServerError
try:
    from django.utils import simplejson as json
except ImportError:
    import json

import app._services.integration.fiberhome.FiberhomeSingleOnuRxTxService as FiberhomeSingleOnuRxTxService
from app._models.bra_admin.Ap import Ap
from app._models.bra_admin.Cpe import Cpe

import app._models.bra_admin.gpon.AuthOnuList
import app._models.bra_admin.gpon.CtoCount
import app._models.bra_admin.gpon.CtoRxAverage
import app._models.bra_admin.gpon.CtoTxAverage
import app._models.bra_admin.gpon.GponCount
import app._models.bra_admin.gpon.GponRxAverage
import app._models.bra_admin.gpon.GponTxAverage
import app._models.bra_admin.gpon.GponUnauthorized
import app._models.bra_admin.gpon.OnuPonInfo
import app._models.bra_admin.GponIntegration
import app._models.bra_admin.PhoneSubscriber
import app._models.bra_admin.PhonePrefixCity
import app._models.bra_admin.gpon.PortInfoTable
import app._models.bra_admin.gpon.PotsUserCfgList
import app._models.bra_admin.Users
import app._models.bra_admin.gpon.WanService

def get_one_signal_by_snmp_id(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    ip = None
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')

    if ip and ip != '127.0.0.1':
        print("IP: " + ip + ' Not Authorized')
        return HttpResponseNotFound()

    erp_cpe_id = request.GET.get('erp_cpe_id', '')
    erp_cpe_id = int(erp_cpe_id)

    try:
        cpe: Cpe = Cpe.objects.get(erp_cpe_id=erp_cpe_id)
        ap: Ap = Ap.objects.get(erp_id=cpe.erp_ap_id)
        
        snmp_index = cpe.last_snmp_index
        if not snmp_index:
            return HttpResponseServerError("snmp_index not found")
        snmp_index = int(snmp_index)

        result = FiberhomeSingleOnuRxTxService.run(ap, str(snmp_index))

        return HttpResponse(json.dumps(result))
    except Cpe.DoesNotExist:
        return HttpResponseServerError("Cpe not found")
