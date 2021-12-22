export default interface CpeRecord {
    erp_cpe_id: number;
    erp_ap_id: number;
    online: boolean;

    snmp_index: string;
    pon_index: string;
    software_version: string;
    hardware_version: string;
    firmware_version: string;
    onu_type: number;
    onu_serial: string;
    rx: number;
    tx: number;

    wan_config: boolean;

    onu_pon_type: number;
    onu_pon_enable_status: number;
    onu_pon_speed: number;
    onu_pon_optical_vltage: number;
    onu_pon_optical_current: number;
    onu_pon_optical_temperature: number;
    onu_pon_is_optical_power_valid: number;
    onu_pon_upstream_speed: number;

    onu_status: number;
    auth_onu_cpu_usage: number;
    auth_onu_memory_usage: number;
    auth_onu_mac_number_limit: number;
    auth_onu_mac_number_limit_apply: number;
    auth_onu_last_up: string;
    auth_onu_last_down: string;
    auth_onu_list_onu_type_description: string;

    port_speed: string;
    port_name: string;
    port_mode: string;
    port_vlan: string;
    port_mac: string;

    pots_enable: boolean;
    tel_num: string;
    binding_signal_name: string;
    signal_vlan: string;
    protocol_port: number;
    username_sip_tel_num: string;
    sip_username: string;

    wan_index: string;
    wan_conn_type: string;
    wan_vlan_id: string;
    wan_nat_enable: string;
    wan_dsp: string;
    wan_pppoe_username: string;
    wan_pppoe_password: string;
    wan_vlan_mode: string;

    datetime: string;
    date?: string;
}