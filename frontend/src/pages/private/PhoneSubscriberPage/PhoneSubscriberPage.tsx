import { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';

import api from '../../../api/api';
import {
    Surface, HorizontalWrapper, TableWrapper, TableTr, TableTh, Table
} from './styles';
import AppBackground from '../../../components/AppLayout/AppBackground/AppBackground';
import PhoneSubscriberRow from './components/PhoneSubscriberRow';
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
                                <tbody>
                                    <TableTr>
                                        <TableTh id="name" scope="col">Assinante</TableTh>
                                        <TableTh id="phone_number" scope="col">Número</TableTh>
                                        <TableTh id="sip_device" scope="col">Disp. SIP</TableTh>
                                        <TableTh id="ap_name" scope="col">POP</TableTh>
                                        <TableTh id="last_online" scope="col" >Última vista (ONU)</TableTh>
                                        <TableTh id="obs" scope="col" >Obs.</TableTh>
                                    </TableTr>
                                </tbody>
                                <tbody>
                                    {
                                        phoneSubscribers.map((ps, index) =>
                                            <PhoneSubscriberRow key={index} obj={ps} />
                                        )
                                    }
                                </tbody>
                            </Table>
                        </TableWrapper>
                    </Surface>}
        </AppBackground>
    );
}
