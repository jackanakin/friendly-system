import datetime
from typing import List, Dict

import app.services.integration.fiberhome.snmp_extractors.FiberhomeOnuPonInfoExtractor as FiberhomeOnuPonInfoExtractor
import app.services.integration.fiberhome.snmp_extractors.FiberhomeAuthOnuListExtractor as FiberhomeAuthOnuListExtractor
import app.services.integration.fiberhome.snmp_extractors.FiberhomePortInfoListExtractor as FiberhomePortInfoListExtractor
import app.services.integration.fiberhome.snmp_extractors.FiberhomePotsUserCfgListExtractor as FiberhomePotsUserCfgListExtractor
import app.services.integration.fiberhome.snmp_extractors.FiberhomeWanServiceExtractor as FiberhomeWanServiceExtractor

from app.models.Ap import Ap
from app.models.GponIntegration import GponIntegration
from app.models.Cpe import Cpe
from app.models.CpeRecord import CpeRecord
from app.models.gpon.GponCount import GponCount
from app.models.gpon.GponTxAverage import GponTxAverage
from app.models.gpon.GponRxAverage import GponRxAverage
from app.models.gpon.CtoRxAverage import CtoRxAverage
from app.models.gpon.CtoTxAverage import CtoTxAverage
from app.models.gpon.CtoCount import CtoCount

def run(ap: Ap, gpon_integration: GponIntegration, cpe_list: Dict[str, Cpe]):
    run_datetime = datetime.datetime.now()

    cpe_matched_list: List[Cpe] = []
    cpe_record_list: List[CpeRecord] = []

    gpon_count_list: List[GponCount] = []
    gpon_tx_list: List[GponTxAverage] = []
    gpon_rx_list: List[GponRxAverage] = []

    nap_count_list: List[CtoCount] = []
    nap_tx_list: List[CtoTxAverage] = []
    nap_rx_list: List[CtoRxAverage] = []
    
    nap_rx_list_tmp: Dict[str, float] = {} #summ all rx and put it here {BRA-CTO-1-x18=-405555}
    nap_tx_list_tmp: Dict[str, float] = {} #summ all tx and put it here {BRA-CTO-1-x18=-405555}
    nap_count_list_tmp: Dict[str, int] = {} #count all and put it here {BRA-CTO-1-x18=94}
    nap_offline_list_tmp: Dict[str, int] = {}

    #wan_service_list = FiberhomeWanServiceExtractor.run(ap)
    onu_pots_user_cfg_list = FiberhomePotsUserCfgListExtractor.run(ap)
    onu_pon_info_list = FiberhomeOnuPonInfoExtractor.run(ap)
    auth_onu_list = FiberhomeAuthOnuListExtractor.run(ap)
    port_info_table = FiberhomePortInfoListExtractor.run(ap)

    for ponInfo in onu_pon_info_list:
        cpeRecord = CpeRecord(erp_ap_id=ap.erp_id, snmp_index=ponInfo.onuPonIndex, pon_index=ponInfo.onu_pon_name, datetime=run_datetime, gpon_integration_id = gpon_integration.id,
            rx=round(float(ponInfo.onu_pon_rx_optical_power)/100, 2), tx=round(float(ponInfo.onu_pon_tx_optical_power)/100, 2),
            onu_pon_type=ponInfo.onu_pon_type, onu_pon_enable_status=ponInfo.onu_pon_enable_status, onu_pon_speed=ponInfo.onu_pon_speed, onu_pon_optical_vltage=ponInfo.onu_pon_optical_vltage,
            onu_pon_optical_current=ponInfo.onu_pon_optical_current, onu_pon_optical_temperature=ponInfo.onu_pon_optical_temperature, onu_pon_is_optical_power_valid=ponInfo.onu_pon_is_optical_power_valid,
            onu_pon_upstream_speed=ponInfo.onu_pon_upstream_speed)
        
        for pots in onu_pots_user_cfg_list:
            onuIndex = int(cpeRecord.snmp_index)
            subIndex = int(pots.onuPonIndex)
            if (subIndex >= onuIndex and subIndex <= (onuIndex + 255)):
                if (pots.pots_enable == '1'):
                    cpeRecord.pots_enable = True
                    cpeRecord.tel_num = pots.tel_num
                    cpeRecord.binding_signal_name = pots.binding_signal_name
                    cpeRecord.signal_vlan = pots.signal_vlan
                    cpeRecord.protocol_port = pots.protocol_port
                    cpeRecord.username_sip_tel_num = pots.username_sip_tel_num
                    cpeRecord.sip_username = pots.sip_username

        for port in port_info_table:
            onuIndex = int(cpeRecord.snmp_index)
            subIndex = int(port.onuPonSubIndex)
            if (subIndex >= onuIndex and subIndex <= (onuIndex + 255)):
                if cpeRecord.port_speed:
                    cpeRecord.port_speed = cpeRecord.port_speed + '#' + port.port_speed
                    cpeRecord.port_name = cpeRecord.port_name + '#' + port.port_name
                    cpeRecord.port_mode = cpeRecord.port_mode + '#' + port.port_mode
                    cpeRecord.port_vlan = cpeRecord.port_vlan + '#' + port.port_vlan
                    cpeRecord.port_mac = cpeRecord.port_mac + '#' + port.port_mac
                else:    
                    cpeRecord.port_speed = port.port_speed
                    cpeRecord.port_name = port.port_name
                    cpeRecord.port_mode = port.port_mode
                    cpeRecord.port_vlan = port.port_vlan
                    cpeRecord.port_mac = port.port_mac

        cpe_record_list.append(cpeRecord)

    for auth in auth_onu_list:
        for cpe in cpe_record_list:
            if (auth.onuPonIndex == cpe.snmp_index):
                cpe.onu_type = int(auth.auth_onu_list_onu_type)
                cpe.onu_serial = (auth.auth_onu_list_mac).upper()
                cpe.software_version = auth.auth_onu_software_version
                cpe.hardware_version = auth.auth_onu_hardware_version

                cpe.onu_status = auth.onu_status
                cpe.auth_onu_cpu_usage = auth.auth_onu_cpu_usage
                cpe.auth_onu_memory_usage = auth.auth_onu_memory_usage
                cpe.auth_onu_mac_number_limit = auth.auth_onu_mac_number_limit
                cpe.auth_onu_mac_number_limit_apply = auth.auth_onu_mac_number_limit_apply
                cpe.auth_onu_last_up = auth.auth_onu_last_up
                cpe.auth_onu_last_down = auth.auth_onu_last_down
                cpe.auth_onu_list_onu_type_description = auth.auth_onu_list_onu_type_description
                break

    #COUNT AND SUM TX, RX FOR EACH PON X/X
    #Also create CpeRecord object for further storing in database
    for obj in cpe_record_list:
        matchCpe = cpe_list[obj.onu_serial] if obj.onu_serial in cpe_list else None
        if matchCpe:
            obj.erp_cpe_id = matchCpe.erp_cpe_id

            matchCpe.olt_matched = True
            matchCpe.online = True
            matchCpe.last_snmp_index = obj.snmp_index
            matchCpe.last_pon_index = obj.pon_index
            matchCpe.last_software_version = obj.software_version
            matchCpe.last_hardware_version = obj.hardware_version
            matchCpe.last_firmware_version = obj.firmware_version
            matchCpe.last_onu_type = obj.onu_type
            matchCpe.last_onu_serial = obj.onu_serial
            matchCpe.last_rx = obj.rx
            matchCpe.last_tx = obj.tx
            matchCpe.last_online = run_datetime
            matchCpe.gpon_integration_id = gpon_integration.id

            cpe_matched_list.append(matchCpe)

        #store cto data if cpe matched
        if matchCpe and matchCpe.nap:
            gponDescription = matchCpe.nap[:(matchCpe.nap.find('-1X'))]
            gponDescription = gponDescription[:(gponDescription.rfind('-'))]
            gponDescription = gponDescription.replace('CTO-1', 'PON')

            #store cto count
            if matchCpe.nap in nap_count_list_tmp:
                nap_count_list_tmp[matchCpe.nap] = nap_count_list_tmp[matchCpe.nap] + 1
            else:
                nap_count_list_tmp[matchCpe.nap] = 1
            
            #store cto rx
            if matchCpe.nap in nap_rx_list_tmp:
                nap_rx_list_tmp[matchCpe.nap] = nap_rx_list_tmp[matchCpe.nap] + obj.rx
            else:
                nap_rx_list_tmp[matchCpe.nap] = obj.rx

            #store cto tx
            if matchCpe.nap in nap_tx_list_tmp:
                nap_tx_list_tmp[matchCpe.nap] = nap_tx_list_tmp[matchCpe.nap] + obj.tx
            else:
                nap_tx_list_tmp[matchCpe.nap] = obj.tx

    #calculate cto avg rx
    for nap, total_rx in nap_rx_list_tmp.items():
        avg = round(total_rx / nap_count_list_tmp[nap],2)
        ctoCount = CtoCount(description=nap, online=nap_count_list_tmp[nap], offline=0, erp_ap_id=ap.erp_id, gpon_integration_id = gpon_integration.id)
        ctoRx = CtoRxAverage(description=nap, value=avg, erp_ap_id=ap.erp_id, gpon_integration_id = gpon_integration.id)
        nap_count_list.append(ctoCount)
        nap_rx_list.append(ctoRx)
    
    #calculate cto avg tx
    for nap, total_tx in nap_tx_list_tmp.items():
        avg = round(total_tx / nap_count_list_tmp[nap],2)
        ctoTx = CtoTxAverage(description=nap, value=avg, erp_ap_id=ap.erp_id, gpon_integration_id = gpon_integration.id)
        nap_tx_list.append(ctoTx)

    #store all data collected
    Cpe.objects.filter(erp_ap_id=ap.erp_id).update(integration_updated=True)

    if cpe_matched_list:
        Cpe.objects.bulk_update(cpe_matched_list, ['olt_matched', 'online', 'last_snmp_index', 'last_pon_index', 
            'last_software_version', 'last_hardware_version', 'last_firmware_version', 
            'last_onu_type', 'last_onu_serial', 'last_rx', 'last_tx', 'last_online'])
    if nap_rx_list:
        CtoRxAverage.objects.bulk_create(nap_rx_list)
    if nap_tx_list:
        CtoTxAverage.objects.bulk_create(nap_tx_list)

    #get cpe where are unmatched
    cpes_unmatched = Cpe.objects.all().filter(erp_ap_id=ap.erp_id, olt_matched=False)
    if cpes_unmatched:
        for obj in cpes_unmatched:
            #fake cpe_record
            cpeRecord = CpeRecord(erp_cpe_id=obj.erp_cpe_id, erp_ap_id=ap.erp_id, datetime=run_datetime, online=False, onu_type=-1, gpon_integration_id = gpon_integration.id)
            cpe_record_list.append(cpeRecord)
            obj.online = False

            #store cto OFFLINE count in temp. list
            if obj.nap in nap_offline_list_tmp:
                nap_offline_list_tmp[obj.nap] = nap_offline_list_tmp[obj.nap] + 1
            else:
                nap_offline_list_tmp[obj.nap] = 1

    #assemble CTO OFFLINE COUNT
    for nap, offlineCount in nap_offline_list_tmp.items():
        napMatch = False
        for ctoCount in nap_count_list:
            if ctoCount.description == nap:
                napMatch = True
                ctoCount.offline = ctoCount.offline + 1
        
        if not napMatch:
            ctoCount = CtoCount(description=nap, online=0, offline=1, erp_ap_id=ap.erp_id, gpon_integration_id = gpon_integration.id)
            nap_count_list.append(ctoCount)
        
    gponMatchList = {}

    #assemble GPON
    for onu_pon in onu_pon_info_list:
        onu_pon_description = onu_pon.onu_pon_name.rsplit(sep='/', maxsplit=1)[0]
        onu_tx = onu_pon.onu_pon_tx_optical_power
        onu_rx = onu_pon.onu_pon_rx_optical_power

        #COUNT
        ponAlreadyAdded = False
        for gponCount in gpon_count_list:
            if gponCount.description == onu_pon_description:
                ponAlreadyAdded = True
                gponCount.online = gponCount.online + 1
                break
        if not ponAlreadyAdded:
            gponCount = GponCount(description=onu_pon_description, online=1, offline=0, erp_ap_id=ap.erp_id, gpon_integration_id = gpon_integration.id)
            gpon_count_list.append(gponCount)

        #TX
        ponAlreadyAdded = False
        for gponTx in gpon_tx_list:
            if gponTx.description == onu_pon_description:
                ponAlreadyAdded = True
                gponTx.value = gponTx.value + float(onu_tx)/100
                break
        if not ponAlreadyAdded:
            gponTx = GponTxAverage(description=onu_pon_description, value=(float(onu_tx)/100), erp_ap_id=ap.erp_id, gpon_integration_id = gpon_integration.id)
            gpon_tx_list.append(gponTx)
        
        #RX
        ponAlreadyAdded = False
        for gponRx in gpon_rx_list:
            if gponRx.description == onu_pon_description:
                ponAlreadyAdded = True
                gponRx.value = gponRx.value + float(onu_rx)/100
                break
        if not ponAlreadyAdded:
            gponRx = GponRxAverage(description=onu_pon_description, value=(float(onu_rx)/100), erp_ap_id=ap.erp_id, gpon_integration_id = gpon_integration.id)
            gpon_rx_list.append(gponRx)
    
    #calculate tx/rx average and count total
    gponCountTotal = GponCount(description="TOTAL", online=0, offline=0, erp_ap_id=ap.erp_id, gpon_integration_id = gpon_integration.id)
    gponRxTotal = GponRxAverage(description="TOTAL", value=0, erp_ap_id=ap.erp_id, gpon_integration_id = gpon_integration.id)
    gponTxTotal = GponTxAverage(description="TOTAL", value=0, erp_ap_id=ap.erp_id, gpon_integration_id = gpon_integration.id)
    for tx in gpon_tx_list:
        for count in gpon_count_list:
            if tx.description == count.description:
                avg = tx.value/count.online
                avg = round(avg, 2)
                tx.value = avg
                gponCountTotal.online = gponCountTotal.online + count.online
                gponTxTotal.value = gponTxTotal.value + avg
                break
    for rx in gpon_rx_list:
        for count in gpon_count_list:
            if rx.description == count.description:
                avg = rx.value/count.online
                avg = round(avg, 2)
                rx.value = avg
                gponRxTotal.value = gponRxTotal.value + avg
                break

    #calculate all totals
    gponRxTotal.value = round(gponRxTotal.value / len(gpon_rx_list), 2)
    gponTxTotal.value = round(gponTxTotal.value / len(gpon_tx_list), 2)
    gpon_count_list.append(gponCountTotal)
    gpon_rx_list.append(gponRxTotal)
    gpon_tx_list.append(gponTxTotal)

    if cpe_record_list:
        CpeRecord.objects.bulk_create(cpe_record_list)
    if nap_count_list:
        CtoCount.objects.bulk_create(nap_count_list)
    if gpon_count_list:
        GponCount.objects.bulk_create(gpon_count_list)
    if gpon_rx_list:
        GponRxAverage.objects.bulk_create(gpon_rx_list)
    if gpon_tx_list:
        GponTxAverage.objects.bulk_create(gpon_tx_list)
    if cpes_unmatched:
        Cpe.objects.bulk_update(cpes_unmatched, ['online'])

    return 
