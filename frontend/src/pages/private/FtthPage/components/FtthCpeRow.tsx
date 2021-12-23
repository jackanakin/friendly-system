import React, { useState } from 'react';
import { format, parseISO } from "date-fns";
import { GraphicEqOutlined, EmojiObjects, ArrowDropDownCircle, Details } from '@material-ui/icons';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

import Cpe from '../../../../@types/models/cpe/Cpe';
import api from '../../../../api/api';
import CpeRecord from '../../../../@types/models/cpe/CpeRecord';
import { TableTd, TableTdExtra, TableTr } from '../styles';

interface FtthCpeRowProps {
    obj: Cpe;
}

interface SignalNow {
    tx: number;
    rx: number;
    date: Date;
}

const FtthCpeRow: React.FC<FtthCpeRowProps> = ({ obj }) => {
    const [fetchSignalNowStatus, setFetchSignalNowStatus] = useState<string | null>(null);
    const [fetchSignalHistoryStatus, setFetchSignalHistoryStatus] = useState<string | null>(null);
    //const [fetchExtraStatus, setFetchExtraStatus] = useState<string | null>(null);

    const [signalNow, setSignalNow] = useState<SignalNow | null>(null);
    const [cpeRecordSignal, setCpeRecordSignal] = useState<CpeRecord[]>([]);
    const [latestCpeRecord, setLatestCpeRecord] = useState<CpeRecord | null>(null);

    const [expandRow, setExpandRow] = useState<boolean>(false);
    const [showExtra, setShowExtra] = useState<boolean>(false);

    async function fetchCpeSignalRecords() {
        setFetchSignalHistoryStatus('Carregando');

        try {
            const { data }: { data: CpeRecord[] } = await api.get('cpe/txrx/history/' + obj.erp_cpe_id);

            data.forEach(obj => {
                obj.date = format(parseISO(obj.datetime), "dd/MM HH:mm")
            });

            setCpeRecordSignal(data.reverse());

            if (data.length > 0) {
                setFetchSignalHistoryStatus(null);
            } else {
                setFetchSignalHistoryStatus("Sem dados");
            }
        } catch (err: any) {
            console.log(err);
            setFetchSignalHistoryStatus(String(err));
        }
    }

    async function fetchSignal() {
        setFetchSignalNowStatus("Carregando");
        setSignalNow(null);

        try {
            const { data }: { data: SignalNow | any } = await api.get('cpe/txrx/actual/' + obj.erp_cpe_id);
            if (data.error) {
                setFetchSignalNowStatus(data.error);
            } else {
                setSignalNow(data);
                setFetchSignalNowStatus(null);
            }
        } catch (err: any) {
            console.log(String(err));
            setFetchSignalNowStatus(String(err));
        }

        setExpandRow(true);
    }

    function triggerExpandRow() {
        setExpandRow(!expandRow);
    }

    async function triggerExpandExtra() {
        setShowExtra(true);
        //setFetchExtraStatus("Carregando");

        try {
            const { data }: { data: CpeRecord | null } = await api.get('cpe/details/' + obj.erp_cpe_id);
            setLatestCpeRecord(data);
        } catch (err: any) {
            console.log(err);
            //setFetchExtraStatus(String(err));
        }

    }

    return (
        <TableTr style={{ backgroundColor: !obj.online ? '#d67d78' : '#6bd17c' }}>
            <TableTd onClick={() => triggerExpandRow()}><ArrowDropDownCircle />{"  "}{obj.name}</TableTd>
            <TableTd>{obj.username}</TableTd>
            <TableTd>{obj.onu_serial}</TableTd>
            <TableTd>{obj.nap}</TableTd>
            <TableTd>{obj.nap_port}</TableTd>
            <TableTd>{obj.last_rx}</TableTd>
            <TableTd>{obj.last_tx}</TableTd>
            <TableTd>{obj.last_software_version}</TableTd>
            <TableTd>{obj.last_pon_index}</TableTd>
            <TableTd>{obj.last_online ? format(parseISO(obj.last_online), "dd/MM HH:mm") : 'Nunca'}</TableTd>
            <TableTdExtra style={{ display: expandRow ? '' : 'none' }}>
                <div style={{ flexDirection: 'row' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <button onClick={() => fetchSignal()}>
                            <EmojiObjects />
                            <p>Ler sinal agora</p>
                        </button>
                        <div style={{ margin: '5px' }}>
                            {
                                (fetchSignalNowStatus) ? <p>{fetchSignalNowStatus}</p> :
                                    (signalNow &&
                                        <div>
                                            <p>{format(signalNow.date, "dd/MM HH:mm")}</p>
                                            <p>Rx: {signalNow.rx}db</p>
                                            <p>Tx: {signalNow.tx}db</p>
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <button onClick={() => fetchCpeSignalRecords()}>
                            <GraphicEqOutlined />
                            <p>Histórico de sinal</p>
                        </button>
                        {fetchSignalHistoryStatus ? fetchSignalHistoryStatus :
                            <div>
                                <LineChart width={800} height={200} data={cpeRecordSignal}>
                                    <Tooltip />
                                    <XAxis dataKey="date" />
                                    <YAxis type="number" />
                                    <Line type="monotone" dataKey="rx" stroke="#FF0000" textAnchor="Rx" />
                                    <Line type="monotone" dataKey="tx" stroke="#0000ff" textAnchor="Tx" />
                                    <Legend />
                                    <CartesianGrid stroke="#ccc" />
                                </LineChart>
                            </div>
                        }
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <button onClick={() => triggerExpandExtra()}>
                            <Details />
                            <p>Detalhes da ONU</p>
                        </button>
                        {
                            showExtra &&
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div>
                                    <p>Cadastrado: {obj.cadastrado}</p>
                                    <p>MAC no MK: {obj.mac_address}</p>
                                    <p>Pos. na PON: {obj.last_pon_index}</p>
                                    <p>Hw.: {obj.last_hardware_version}</p>
                                    <p>Sw.: {obj.last_software_version}</p>
                                </div>
                                {latestCpeRecord &&
                                    <div style={{ marginLeft: 11 }}>
                                        <h5>Config. da ONU: {format(parseISO(latestCpeRecord.datetime), "dd/MM HH:mm")}</h5>
                                        <p>ONU em NAT?: {latestCpeRecord.wan_pppoe_username ? "sim" : "não"}</p>
                                        <p>Porta: {latestCpeRecord.port_name}</p>
                                        <p>Speed: {latestCpeRecord.port_speed}</p>
                                        <p>VLAN: {latestCpeRecord.port_vlan}</p>
                                        <p>ARP ONU: {latestCpeRecord.port_mac}</p>
                                        <p>Telefone na ONU: {latestCpeRecord.tel_num}</p>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </TableTdExtra>
        </TableTr>
    );
}

export default FtthCpeRow;