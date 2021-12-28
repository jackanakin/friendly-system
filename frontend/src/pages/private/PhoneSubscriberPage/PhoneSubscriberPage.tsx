import { useState, useEffect, Fragment } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { format, parseISO } from "date-fns";

import api from '../../../api/api';
import {
    Surface, HorizontalWrapper, TableWrapper
} from './styles';
import AppBackground from '../../../components/AppLayout/AppBackground/AppBackground';
import CpeWithLatestCpeRecordDTO from '../../../@types/services/phone_subscriber/CpeWithLatestCpeRecordDTO';
import PhoneSubscriberInconsistenceDTO from '../../../@types/services/phone_subscriber/PhoneSubscriberInconsistenceDTO';
import AxiosFetch from '../../../@types/api/AxiosFetch';
import { FetchRunning, FetchSuccessful } from '../../../@dto/api/FetchStatus';
import { axiosErrorHandler } from '../../../utils/ErrorHandler/axiosErrorHandler';
import { FetchStatus } from '../../../@enum/api/FetchStatus';
import { ErrorPage } from '../../../components/ErrorPage/ErrorPage';
import { LoadingPage } from '../../../components/LoadingPage/LoadingPage';

export default function PhoneSubscriberPage() {
    const [fetchPhoneSubscriberStatus, setFetchPhoneSubscriberStatus] = useState<AxiosFetch>(FetchRunning);

    const [phoneSubscribers, setPhoneSubscribers] = useState<CpeWithLatestCpeRecordDTO[]>([]);
    const [inconsistentPhoneSubscribers, setInconsistentPhoneSubscribers] = useState<PhoneSubscriberInconsistenceDTO[]>([]);

    useEffect(() => {
        fetchAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function fetchInconsistentPhoneSubscriber() {
        setInconsistentPhoneSubscribers([]);
        const { data }: { data: PhoneSubscriberInconsistenceDTO[] } = await api.get('phone_subscriber/inconsistences');
        setInconsistentPhoneSubscribers(data);
    }

    async function fetchPhoneSubscriber() {
        setPhoneSubscribers([]);
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
        setPhoneSubscribers(data);
    }

    async function fetchAll() {
        setFetchPhoneSubscriberStatus(FetchRunning);

        try {
            await fetchPhoneSubscriber();
            await fetchInconsistentPhoneSubscriber();
            setFetchPhoneSubscriberStatus(FetchSuccessful);
        } catch (error: any) {
            const handledError = axiosErrorHandler(error);
            setFetchPhoneSubscriberStatus({
                message: handledError,
                status: FetchStatus.FAILED
            });
        }
    }

    return (
        <AppBackground>
            {fetchPhoneSubscriberStatus.status === FetchStatus.LOADING ?
                <LoadingPage /> : fetchPhoneSubscriberStatus.status === FetchStatus.FAILED ? <ErrorPage callback={fetchAll} /> :
                    <Surface>
                        <HorizontalWrapper>
                            {inconsistentPhoneSubscribers.length > 0 &&
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography>Inconsistências</Typography>
                                    {
                                        inconsistentPhoneSubscribers.map((ips, index) =>
                                            <p key={index} style={{ margin: 0 }}>{ips.inconsistence_message}</p>
                                        )
                                    }
                                </div>}
                        </HorizontalWrapper>
                        <TableWrapper>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell id="name" align="left">Assinante</TableCell>
                                        <TableCell id="phone_number" align="left">Número</TableCell>
                                        <TableCell id="sip_device" align="left">Disp. SIP</TableCell>
                                        <TableCell id="ap_name" align="left">POP</TableCell>
                                        <TableCell id="last_online" align="left" >Última vista (ONU)</TableCell>
                                        <TableCell id="obs" align="left" >Obs.</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {phoneSubscribers.map((obj, index) => (
                                        <PhoneSubscriberRow key={index} obj={obj} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableWrapper>
                    </Surface>}
        </AppBackground>
    );
}

interface PhoneSubscriberRowProps {
    obj: CpeWithLatestCpeRecordDTO;
}

function PhoneSubscriberRow({ obj }: PhoneSubscriberRowProps) {
    return (
        <Fragment>
            <TableRow>
                <TableCell align="left">{obj.erp_contract_id} - {obj.subscriber_name}</TableCell>
                <TableCell align="left">{obj.phone_number}</TableCell>
                <TableCell align="left">{obj.sipDiscovery}</TableCell>
                <TableCell align="left">{obj.ap_name}</TableCell>
                <TableCell align="left">{obj.last_online ? format(parseISO(obj.last_online), "dd/MM HH:mm") : 'Nunca'}</TableCell>
                <TableCell align="left">{obj.observation}</TableCell>
            </TableRow>
        </Fragment>
    );
}