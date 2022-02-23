class OID_FiberHome_AuthOnuListEntry:
    authOnuListEntry="1.3.6.1.4.1.5875.800.3.10.1.1"
    authOnuListEntryResponse="SNMPv2-SMI::enterprises.5875.800.3.10.1.1."

    _authOnuListOnuType="1.3.6.1.4.1.5875.800.3.10.1.1.5"
    _authOnuListMac="1.3.6.1.4.1.5875.800.3.10.1.1.10"
    _onuStatus="1.3.6.1.4.1.5875.800.3.10.1.1.11"
    #0:offonline/fiber cut/power failure(0)
	#1:online(1)"
    _authOnuSoftwareVersion="1.3.6.1.4.1.5875.800.3.10.1.1.12"
    _authOnuHardwareVersion="1.3.6.1.4.1.5875.800.3.10.1.1.13"
    _authOnuListOnuReboot="1.3.6.1.4.1.5875.800.3.10.1.1.15"
    _authOnuCpuUsage="1.3.6.1.4.1.5875.800.3.10.1.1.16"
    _authOnuMemoryUsage="1.3.6.1.4.1.5875.800.3.10.1.1.17"
    _authOnuMacNumberLimit="1.3.6.1.4.1.5875.800.3.10.1.1.28"
    _authOnuMacNumberLimitApply="1.3.6.1.4.1.5875.800.3.10.1.1.29"
    _authOnuLastUp="1.3.6.1.4.1.5875.800.3.10.1.1.30"
    _authOnuLastDown="1.3.6.1.4.1.5875.800.3.10.1.1.31"
    _authOnuListOnuTypeDescription="1.3.6.1.4.1.5875.800.3.10.1.1.37"

    authOnuListOnuType="5"
        #Integer32
    authOnuListMac="10"
        #STRING
    onuStatus="11"
        #Integer32
        #1-online
        #2-offline
    authOnuSoftwareVersion="12"
        #String
    authOnuHardwareVersion="13"
        #string
    authOnuListOnuReboot="15"
        # !!!! READ-CREATE
        # 1 ?? Restart 
		# 0 ?? Normal (only for query)
    authOnuCpuUsage="16"
        #Integer32
    authOnuMemoryUsage="17"
        #Integer32
    authOnuMacNumberLimit="28"
        #Integer32
    authOnuMacNumberLimitApply="29"
        #Integer32
    authOnuLastUp="30"
        #STRING
    authOnuLastDown="31"
        #STRING
    authOnuListOnuTypeDescription="37"