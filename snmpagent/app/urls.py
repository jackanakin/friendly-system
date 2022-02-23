from django.urls import path
from app._views.prtg import PrtgRestView
from app._views.ftth import FtthView

urlpatterns = [
    path('ftth/cpe/signal', FtthView.get_one_signal_by_snmp_id, name='FiberhomeSingleOnuRxTxServiceGet_one_signal_by_snmp_id'),
    path('prtg/create_iptv_availability', PrtgRestView.create_iptv_availability, name='PrtgRestView_create_iptv_availability')
]