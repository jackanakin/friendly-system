export default interface Cpe {
    cadastrado: string;
    device_password: string;
    erp_ap_id: number;
    erp_cpe_id: number;
    erp_contract_id: number;
    id: number;
    integration_updated: boolean;
    mac_address: string;
    nap: string;
    nap_port: number;
    olt_matched: boolean;
    online: boolean;
    onu_serial: string;
    technology: string;
    username: string;
    name: string;
    observation: string,
    address_list: string,

    last_firmware_version: string | null;
    last_hardware_version: string | null;
    last_online: string | null;
    last_onu_serial: string | null;
    last_onu_type: number | null;
    last_pon_index: string | null;
    last_rx: number | null;
    last_snmp_index: number | null;
    last_tx: number | null;
    last_software_version: string | null;
}