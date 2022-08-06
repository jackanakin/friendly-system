from django.urls import path
from app._views import FtthView

urlpatterns = [
    path('ftth/cpe/signal', FtthView.get_one_signal_by_snmp_id, name='FiberhomeSingleOnuRxTxServiceGet_one_signal_by_snmp_id'),
]