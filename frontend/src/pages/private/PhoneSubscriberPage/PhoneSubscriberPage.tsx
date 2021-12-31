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
import { axiosErrorHandler } from '../../../utils/ErrorHandler/axiosErrorHandler';
import { FetchStatus } from '../../../@enum/api/FetchStatus';
import { ErrorPage } from '../../../components/ErrorPage/ErrorPage';
import { LoadingPage } from '../../../components/LoadingPage/LoadingPage';
import { usePromise } from '../../../hooks/@promises/usePromise';
import { fetchPhoneSubscriber } from './fun/fetchPhoneSubscriber';
import { fetchInconsistentPhoneSubscriber } from './fun/fetchInconsistentPhoneSubscriber';

export default function PhoneSubscriberPage() {
    const { promise } = usePromise();

    const [phoneSubscribers, setPhoneSubscribers] = useState<CpeWithLatestCpeRecordDTO[]>([]);
    const [fetchPhoneSubscriberStatus, setFetchPhoneSubscriberStatus] = useState<AxiosFetch>(FetchRunning);

    const [inconsistentPhoneSubscribers, setInconsistentPhoneSubscribers] = useState<PhoneSubscriberInconsistenceDTO[]>([]);

    const loadPhoneSubscriber = useCallback(() => {
        setFetchPhoneSubscriberStatus(FetchRunning);
        setPhoneSubscribers([]);
        setInconsistentPhoneSubscribers([]);

        promise(fetchPhoneSubscriber())
            .then((data: CpeWithLatestCpeRecordDTO[]) => {
                setPhoneSubscribers(data);

                promise(fetchInconsistentPhoneSubscriber())
                    .then((data: PhoneSubscriberInconsistenceDTO[]) => {
                        setInconsistentPhoneSubscribers(data);
                        setFetchPhoneSubscriberStatus(FetchSuccessful);
                        
                    }).catch((error: any) => {
                        if (!error.isCanceled) {
                            const handledError = axiosErrorHandler(error);
                            setFetchPhoneSubscriberStatus({
                                status: FetchStatus.FAILED,
                                message: handledError
                            });
                        }
                    });
            }).catch((error: any) => {
                if (!error.isCanceled) {
                    const handledError = axiosErrorHandler(error);
                    setFetchPhoneSubscriberStatus({
                        status: FetchStatus.FAILED,
                        message: handledError
                    });
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        loadPhoneSubscriber();
    }, [loadPhoneSubscriber]);

    return (
        <AppBackground>
            {fetchPhoneSubscriberStatus.status === FetchStatus.LOADING ?
                <LoadingPage /> : fetchPhoneSubscriberStatus.status === FetchStatus.FAILED ? <ErrorPage callback={loadPhoneSubscriber} /> :
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