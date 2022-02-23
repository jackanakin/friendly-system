class OID_FiberHome_WanServiceEntry:
    wanServiceEntry="1.3.6.1.4.1.5875.800.3.52.1.1"
    wanServiceEntryResponse="SNMPv2-SMI::enterprises.5875.800.3.52.1.1."

    _wanConnType="1.3.6.1.4.1.5875.800.3.52.1.1.3"
    _wanVlanId="1.3.6.1.4.1.5875.800.3.52.1.1.4"
    _wanNatEnable="1.3.6.1.4.1.5875.800.3.52.1.1.6"
    _wanDsp="1.3.6.1.4.1.5875.800.3.52.1.1.7"
    _wanPPPoeUsername="1.3.6.1.4.1.5875.800.3.52.1.1.14"
    _wanPPPoePassword="1.3.6.1.4.1.5875.800.3.52.1.1.15"
    _wanVlanMode="1.3.6.1.4.1.5875.800.3.52.1.1.19"

    wanConnType="3"
        #Integer32
        #0:bridge
		#1:route"
    wanVlanId="4"
        #Integer32
    wanNatEnable="6"
        #Integer32
        #0:disable
		#1:enable"
    wanDsp="7"
        #Integer32
        #"DSP
		#0:DHCP
		#1:Static
		#2:PPPOE
		#0xffff:null"
    wanPPPoeUsername="14"
        #STRING
    wanPPPoePassword="15"
        #STRING
    wanVlanMode="19"
        #Integer32
        #"Vlan Mode
		#1:tag
		#3:transparent"