import PhoneSubscriberDTO from "../../../../@dto/phone_subscriber/PhoneSubscriberDTO";
import { FetchStatus } from "../../../../@enum/api/FetchStatus";
import AxiosFetch from "../../../../@types/api/AxiosFetch";
import api from "../../../../api/api";
import { axiosErrorHandler } from "../../../../utils/ErrorHandler/axiosErrorHandler";

export async function fetchPhoneSubscriber(promise: (p: Promise<any>) => Promise<any>, resolve: (data: PhoneSubscriberDTO) => void, reject: (error: AxiosFetch) => void): Promise<void> {
    promise(fetch())
        .then(resolve)
        .catch((error: any) => {
            if (!error.isCanceled) {
                const handledError = axiosErrorHandler(error);
                reject({
                    status: FetchStatus.FAILED,
                    message: handledError
                });
            }
        });
}

async function fetch(): Promise<PhoneSubscriberDTO> {
    const { data }: { data: PhoneSubscriberDTO } = await api.get('phone_subscriber');

    data.subscribers_info.forEach(obj => {
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