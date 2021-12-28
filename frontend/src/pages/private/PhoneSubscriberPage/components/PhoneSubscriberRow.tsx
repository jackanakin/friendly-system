import React from 'react';
import { format, parseISO } from "date-fns";

import { TableTd, TableTr } from '../styles';
import CpeWithLatestCpeRecordDTO from '../../../../@types/services/phone_subscriber/CpeWithLatestCpeRecordDTO';

interface PhoneSubscriberRowProps {
    obj: CpeWithLatestCpeRecordDTO;
}

const PhoneSubscriberRow: React.FC<PhoneSubscriberRowProps> = ({ obj }) => {

    function dicoverSipDevice(): string {
        //check if is registered on the ONU FXS
        if (obj.pots_enable && obj.phone_number === obj.tel_num) {
            return `ONU/${obj.tel_num}@${obj.signal_vlan}/${obj.software_version}`;
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
                return `LAN_${voice_vlan_in_lan_port_index + 1}: VOZ ${portVlans[voice_vlan_in_lan_port_index]}`;
            }
        }

        //check if it's behind NAT
        if (obj.observation && obj.observation.includes('#SIP_NAT#')) {
            return `VOZ EM NAT`;
        }

        return '!! Desconhecido !!';
    }

    return (
        <TableTr>
            <TableTd>{obj.erp_contract_id} - {obj.subscriber_name}</TableTd>
            <TableTd>{obj.phone_number}</TableTd>
            <TableTd>{dicoverSipDevice()}</TableTd>
            <TableTd>{obj.ap_name}</TableTd>
            <TableTd>{obj.last_online ? format(parseISO(obj.last_online), "dd/MM HH:mm") : 'Nunca'}</TableTd>
            <TableTd>{obj.observation}</TableTd>
        </TableTr>
    );
}

export default PhoneSubscriberRow;