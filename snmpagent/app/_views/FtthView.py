from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotFound
import logging

from django.http.response import HttpResponseServerError
try:
    from django.utils import simplejson as json
except ImportError:
    import json

import app.services.integration.fiberhome.FiberhomeSingleOnuRxTxService as FiberhomeSingleOnuRxTxService
from app.models.Ap import Ap
from app.models.Cpe import Cpe

import app.models.gpon.AuthOnuList
import app.models.gpon.CtoCount
import app.models.gpon.CtoRxAverage
import app.models.gpon.CtoTxAverage
import app.models.gpon.GponCount
import app.models.gpon.GponRxAverage
import app.models.gpon.GponTxAverage
import app.models.gpon.GponUnauthorized
import app.models.gpon.OnuPonInfo
import app.models.GponIntegration
import app.models.PhoneSubscriber
import app.models.PhonePrefixCity
import app.models.gpon.PortInfoTable
import app.models.gpon.PotsUserCfgList
import app.models.Users
import app.models.gpon.WanService

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
