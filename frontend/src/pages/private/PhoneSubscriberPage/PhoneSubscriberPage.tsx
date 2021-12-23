import { useState, useEffect } from 'react';

import api from '../../../api/api';
import {
    Surface, HorizontalWrapper, FtthTableWrapper, TableTr, TableTh
} from './styles';
import AppBackground from '../../../components/AppLayout/AppBackground/AppBackground';
import PhoneSubscriberRow from './components/PhoneSubscriberRow';
import CpeWithLatestCpeRecordDTO from '../../../@types/services/phone_subscriber/CpeWithLatestCpeRecordDTO';
import PhoneSubscriberInconsistenceDTO from '../../../@types/services/phone_subscriber/PhoneSubscriberInconsistenceDTO';

export default function PhoneSubscriberPage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [phoneSubscribers, setPhoneSubscribers] = useState<CpeWithLatestCpeRecordDTO[]>([]);
    const [inconsistentPhoneSubscribers, setInconsistentPhoneSubscribers] = useState<PhoneSubscriberInconsistenceDTO[]>([]);

    useEffect(() => {
        fetchAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function fetchInconsistentPhoneSubscriber() {
        setInconsistentPhoneSubscribers([]);

        try {
            const { data }: { data: PhoneSubscriberInconsistenceDTO[] } = await api.get('phone_subscriber/inconsistences');
            setInconsistentPhoneSubscribers(data);
        } catch (err) {
            console.log(err);
        }
    }

    async function fetchPhoneSubscriber() {
        setPhoneSubscribers([]);

        try {
            const { data }: { data: CpeWithLatestCpeRecordDTO[] } = await api.get('phone_subscriber');
            setPhoneSubscribers(data);
        } catch (err) {
            console.log(err);
        }
    }

    async function fetchAll() {
        setLoading(true);

        await fetchPhoneSubscriber();
        await fetchInconsistentPhoneSubscriber();

        setLoading(false);
    }

    return (
        <AppBackground>
            <Surface>
                {loading ?
                    <p>Carregando</p>
                    :
                    <>
                        {inconsistentPhoneSubscribers.length > 0 &&
                            <HorizontalWrapper>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <h4>Inconsistências</h4>
                                    {
                                        inconsistentPhoneSubscribers.map(ips =>
                                            <p style={{ margin: 0 }}>{ips.inconsistence_message}</p>
                                        )
                                    }
                                </div>
                            </HorizontalWrapper>}
                        <HorizontalWrapper>
                            <FtthTableWrapper>
                                <TableTr>
                                    <TableTh id="name" scope="col">Assinante</TableTh>
                                    <TableTh id="phone_number" scope="col">Número</TableTh>
                                    <TableTh id="sip_device" scope="col">Disp. SIP</TableTh>
                                    <TableTh id="ap_name" scope="col">POP</TableTh>
                                    <TableTh id="last_online" scope="col" >Última vista (ONU)</TableTh>
                                    <TableTh id="obs" scope="col" >Obs.</TableTh>
                                </TableTr>
                                {
                                    phoneSubscribers.map(ps =>
                                        <PhoneSubscriberRow key={ps.phone_number} obj={ps} />
                                    )
                                }
                            </FtthTableWrapper>
                        </HorizontalWrapper>
                    </>}
            </Surface>
        </AppBackground>
    );
}
