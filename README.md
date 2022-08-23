# :construction: friendly-system
<p>Integrate ERP Mk Solutions through SQL with Fiberhome OLT's vendor using SNMP for ONU's signal and online counters</p>

### :computer: Usefull CLI commands

Enter the app-api container:
>docker exec -it friendly-system-app-api-1 bash

Listing available commands:
>node build/admin/index.js --help

Listing users:
>node build/admin/index.js list-user

Adding new user:
>node build/admin/index.js add-user --name=Jardel --email=jardel@jk.com.br

Removing existing user:
>node build/admin/index.js del-user --email=jardel@jk.com.br

### 🛠 Tech stacks used

- [x] Django
- [x] Express
- [x] ReactJS with [MUI](https://mui.com/) and [Recharts](https://recharts.org/en-US/)
- [x] Docker

### :label:	Features

- [x] Average signal (TX and RX) for PON and CTO (Optical Termination Box)
- [x] Online ONU's counter for PON and CTO (Optical Termination Box)
- [x] Signal and counter history
- [x] ONU details such signal, hardware and firmware version, PON index, VLAN, LAN speed and more collection
- [x] Integration with external ERP MK Solutions through SQL connection
- [x] SNMP and SQL integrations are made using Python, website backend in NodeJS and frontend in ReactJS

### :national_park: Screenshots

<p>OLT ONU list:</p>
<img src="https://github.com/jackanakin/friendly-system/blob/main/screenshots/ftth_table.png" 
data-canonical-src="https://github.com/jackanakin/friendly-system/blob/main/screenshots/ftth_table.png" width="860" height="520" />


<p>OLT ONU list with row expanded:</p>
<img src="https://github.com/jackanakin/friendly-system/blob/main/screenshots/ftth_row.png" 
data-canonical-src="https://github.com/jackanakin/friendly-system/blob/main/screenshots/ftth_row.png" width="860" height="520" />


<p>GPON page with average signal and counter for PON and CTO (Optical Termination Box):</p>
<img src="https://github.com/jackanakin/friendly-system/blob/main/screenshots/gpon.png" 
data-canonical-src="https://github.com/jackanakin/friendly-system/blob/main/screenshots/gpon.png" width="860" height="520" />
