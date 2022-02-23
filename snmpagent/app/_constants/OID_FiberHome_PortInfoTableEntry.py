class OID_FiberHome_PortInfoTableEntry:
    portInfoTableEntry="1.3.6.1.4.1.5875.800.3.9.3.1.1"
    portInfoTableEntryResponse="SNMPv2-SMI::enterprises.5875.800.3.9.3.1.1."

    _portSpeed="1.3.6.1.4.1.5875.800.3.9.3.1.1.5"
    _portName="1.3.6.1.4.1.5875.800.3.9.3.1.1.6"
    _portMode="1.3.6.1.4.1.5875.800.3.9.3.1.1.8"
    _portVlan="1.3.6.1.4.1.5875.800.3.9.3.1.1.9"
    _portMac="1.3.6.1.4.1.5875.800.3.9.3.1.1.10"

    portSpeed="5"
        #Integer32
    portName="6"
        #STRING
    portMode="8"
        #Integer32
        # 1 FULL
        # 2 HALF
    portVlan="9"
        #STRING
    portMac="10"
        #STRING
        # : separator
    