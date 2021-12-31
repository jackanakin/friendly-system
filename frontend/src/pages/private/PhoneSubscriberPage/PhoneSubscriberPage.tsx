import { useState, useEffect, useCallback, Fragment } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { format, parseISO } from "date-fns";

import {
    Surface, HorizontalWrapper, TableWrapper
} from './styles';
import AppBackground from '../../../components/AppLayout/AppBackground/AppBackground';
import CpeWithLatestCpeRecordDTO from '../../../@types/services/phone_subscriber/CpeWithLatestCpeRecordDTO';
import PhoneSubscriberInconsistenceDTO from '../../../@types/services/phone_subscriber/PhoneSubscriberInconsistenceDTO';
import AxiosFetch from '../../../@types/api/AxiosFetch';
import { FetchRunning, FetchSuccessful } from '../../../@dto/api/FetchStatus';
import { FetchStatus } from '../../../@enum/api/FetchStatus';
import { ErrorPage } from '../../../components/ErrorPage/ErrorPage';
import { LoadingPage } from '../../../components/LoadingPage/LoadingPage';
import { usePromise } from '../../../hooks/@promises/usePromise';
import { fetchPhoneSubscriber } from './fun/fetchPhoneSubscriber';
import PhoneSubscriberDTO from '../../../@dto/phone_subscriber/PhoneSubscriberDTO';

export default function PhoneSubscriberPage() {
    const { promise } = usePromise();

    const [phoneSubscribers, setPhoneSubscribers] = useState<CpeWithLatestCpeRecordDTO[]>([]);
    const [inconsistentPhoneSubscribers, setInconsistentPhoneSubscribers] = useState<PhoneSubscriberInconsistenceDTO[]>([]);

    const [fetchLoadPageResourcesStatus, setFetchLoadPageResourcesStatus] = useState<AxiosFetch>(FetchRunning);

    const resolvePageResources = useCallback((data: PhoneSubscriberDTO) => {
        setInconsistentPhoneSubscribers(data.inconsistences);
        setPhoneSubscribers(data.subscribers_info);
        setFetchLoadPageResourcesStatus(FetchSuccessful);
    }, []);

    const loadPageResources = useCallback(() => {
        setFetchLoadPageResourcesStatus(FetchRunning);
        setInconsistentPhoneSubscribers([]);
        setPhoneSubscribers([]);

        fetchPhoneSubscriber(promise, resolvePageResources, setFetchLoadPageResourcesStatus);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        loadPageResources();
    }, [loadPageResources]);

    return (
        <AppBackground>
            {fetchLoadPageResourcesStatus.status === FetchStatus.LOADING ?
                <LoadingPage /> : fetchLoadPageResourcesStatus.status === FetchStatus.FAILED ? <ErrorPage callback={loadPageResources} /> :
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