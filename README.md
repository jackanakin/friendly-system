# friendly-system
<p>Integrate MK ERP with Fiberhome OLT's using SNMP for ONU's signal and online counters</p>
<p>Features</p>

- [x] Average signal (TX and RX) for PON and CTO (Optical Termination Box)
- [x] Online ONU's counter for PON and CTO (Optical Termination Box)
- [x] Signal and counter history
- [x] ONU details such signal, hardware and firmware version, PON index, VLAN, LAN speed and more collection
- [x] Integration with external ERP MK Solutions through SQL connection
- [x] SNMP and SQL integrations are made using Python, website backend in NodeJS and frontend in ReactJS

<h1>Screenshots</h1>

<p>OLT ONU list:</p>
<img src="https://github.com/jackanakin/friendly-system/blob/main/screenshots/ftth_table.png" 
data-canonical-src="https://github.com/jackanakin/friendly-system/blob/main/screenshots/ftth_table.png" width="860" height="520" />


<p>OLT ONU list with row expanded:</p>
<img src="https://github.com/jackanakin/friendly-system/blob/main/screenshots/ftth_row.png" 
data-canonical-src="https://github.com/jackanakin/friendly-system/blob/main/screenshots/ftth_row.png" width="860" height="520" />


<p>GPON page with average signal and counter for PON and CTO (Optical Termination Box):</p>
<img src="https://github.com/jackanakin/friendly-system/blob/main/screenshots/gpon.png" 
data-canonical-src="https://github.com/jackanakin/friendly-system/blob/main/screenshots/gpon.png" width="860" height="520" />

<p>ap table must be populated manually, ex:</p>
<p>insert into ap values (default,	111, 'ANY-OLT-01-01', '1.3.6.1.4.1.5875.800.3.10.1.1.10', '5875.800.3.10.1.1.10', '127.0.0.1', 1, 2, 161, 'snmp_community', true);</p>
