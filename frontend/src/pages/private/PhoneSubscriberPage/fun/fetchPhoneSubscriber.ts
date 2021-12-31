import CpeWithLatestCpeRecordDTO from "../../../../@types/services/phone_subscriber/CpeWithLatestCpeRecordDTO";
import api from "../../../../api/api";

export async function fetchPhoneSubscriber(): Promise<CpeWithLatestCpeRecordDTO[]> {
    const { data }: { data: CpeWithLatestCpeRecordDTO[] } = await api.get('phone_subscriber');

    data.forEach(obj => {
        console.log("dicoverSipDevice")
        //check if is registered on the ONU FXS
        if (obj.pots_enable && obj.phone_number === obj.tel_num) {
            obj.sipDiscovery = `ONU/${obj.tel_num}@${obj.signal_vlan}/${obj.software_version}`;
            return;
        }

        //check if voice VLAN is used
        if (obj.port_vlan && obj.port_vlan.indexOf(obj.ap_voice_vlan)) {
            let voice_vlan_in_lan_port_index = -1;

            const portVlans: string[] = obj.port_vlan.includes('#') ? obj.port_vlan.split('#') : [obj.port_vlan];
            portVlans.forEach((vlans, index) => {
                if (vlans.includes(obj.ap_voice_vlan)) {
                    voice_vlan_in_lan_port_index = index;
                }
            })

            if (voice_vlan_in_lan_port_index >= 0) {
                obj.sipDiscovery = `LAN_${voice_vlan_in_lan_port_index + 1}: VOZ ${portVlans[voice_vlan_in_lan_port_index]}`;
                return;
            }
        }

        //check if it's behind NAT
        if (obj.observation && obj.observation.includes('#SIP_NAT#')) {
            obj.sipDiscovery = `VOZ EM NAT`;
            return;
        }

        obj.sipDiscovery = '!! Desconhecido !!';
    });

    return data;
}