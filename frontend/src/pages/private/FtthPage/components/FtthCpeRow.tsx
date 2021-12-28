import React, { useState } from 'react';
import { format, parseISO } from "date-fns";
import { GraphicEqOutlined, EmojiObjects, ArrowDropDownCircle, Details } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import CircularProgress from '@mui/material/CircularProgress';

import Cpe from '../../../../@types/models/cpe/Cpe';
import api from '../../../../api/api';
import CpeRecord from '../../../../@types/models/cpe/CpeRecord';
import { TableTd, TableTdExtra, TableTr } from '../styles';
import { ExtraTdContainer, ExtraTdContainerSeparator, ExtraContainer, OnuDetails, TableRowButtonContent } from './styles';
import { axiosErrorHandler } from '../../../../utils/ErrorHandler/axiosErrorHandler';
import AxiosFetch from '../../../../@types/api/AxiosFetch';
import { FetchIdle, FetchRunning, FetchSuccessful } from '../../../../@dto/api/FetchStatus';
import { FetchStatus } from '../../../../@enum/api/FetchStatus';

interface FtthCpeRowProps {
    obj: Cpe;
}

interface SignalNow {
    tx: number;
    rx: number;
    date: Date;
}

const FtthCpeRow: React.FC<FtthCpeRowProps> = ({ obj }) => {
    const [fetchOnuDetailStatus, setFetchOnuDetailStatus] = useState<AxiosFetch>(FetchIdle);
    const [fetchOnuSignalHistoryStatus, setFetchOnuSignalHistoryStatus] = useState<AxiosFetch>(FetchIdle);
    const [fetchOnuSignalStatus, setFetchOnuSignalStatus] = useState<AxiosFetch>(FetchIdle);

    const [signalNow, setSignalNow] = useState<SignalNow | null>(null);
    const [cpeRecordSignal, setCpeRecordSignal] = useState<CpeRecord[]>([]);
    const [cpeDetails, setCpeDetails] = useState<CpeRecord | null>(null);

    const [expandRow, setExpandRow] = useState<boolean>(false);

    async function fetchCpeSignalHistory() {
        if (fetchOnuSignalHistoryStatus.status === FetchStatus.LOADING) return;
        setFetchOnuSignalHistoryStatus(FetchRunning);

        try {
            const { data }: { data: CpeRecord[] } = await api.get('cpe/txrx/history/' + obj.erp_cpe_id);
            if (!data || data.length === 0) {
                setFetchOnuSignalHistoryStatus({
                    status: FetchStatus.FAILED,
                    message: "Nenhum resultado"
                });
            }

            data.forEach(obj => {
                obj.date = format(parseISO(obj.datetime), "dd/MM HH:mm")
            });

            setCpeRecordSignal(data.reverse());
            setFetchOnuSignalHistoryStatus(FetchSuccessful);
        } catch (error: any) {
            const handledError = axiosErrorHandler(error);
            setFetchOnuSignalHistoryStatus({
                status: FetchStatus.FAILED,
                message: handledError
            });
        }
    }

    async function fetchCpeSignal() {
        setFetchOnuSignalStatus(FetchRunning);

        try {
            const { data }: { data: SignalNow | any } = await api.get('cpe/txrx/actual/' + obj.erp_cpe_id);
            if (data.error) {
                setFetchOnuSignalStatus({
                    status: FetchStatus.FAILED,
                    message: data.error
                });
            } else {
                setSignalNow(data);
                setFetchOnuSignalStatus(FetchRunning);
            }
        } catch (error: any) {
            const handledError = axiosErrorHandler(error);
            setFetchOnuSignalStatus({
                status: FetchStatus.FAILED,
                message: handledError
            });
        }

        setExpandRow(true);
    }

    function triggerExpandRow() {
        setExpandRow(!expandRow);
    }

    async function triggerExpandExtra() {
        if (fetchOnuDetailStatus.status === FetchStatus.LOADING) return;
        setFetchOnuDetailStatus(FetchRunning);

        try {
            const { data }: { data: CpeRecord | null } = await api.get('cpe/details/' + obj.erp_cpe_id);
            setCpeDetails(data);

            if (!data) {
                setFetchOnuDetailStatus({
                    status: FetchStatus.FAILED,
                    message: "Nenhum resultado"
                });
            } else {
                setFetchOnuDetailStatus(FetchSuccessful);
            }
        } catch (error: any) {
            const handledError = axiosErrorHandler(error);
            setFetchOnuDetailStatus({
                status: FetchStatus.FAILED,
                message: handledError
            });
        }
    }

    return (
        <TableTr style={{ backgroundColor: !obj.online ? '#d67d78' : '#6bd17c' }}>
            <TableTd onClick={triggerExpandRow}><ArrowDropDownCircle />{"  "}{obj.name}</TableTd>
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
                <ExtraTdContainer>
                    <Button onClick={fetchCpeSignal} variant="contained">
                        <TableRowButtonContent>
                            Ler sinal agora
                            <EmojiObjects />
                        </TableRowButtonContent>
                    </Button>
                    <ExtraContainer>
                        {
                            fetchOnuSignalStatus.status === FetchStatus.FAILED ? <p>{fetchOnuSignalStatus.message}</p> :
                                fetchOnuSignalStatus.status === FetchStatus.LOADING ? <CircularProgress /> :
                                    (fetchOnuSignalHistoryStatus.status === FetchStatus.SUCESS && signalNow) &&
                                    <div>
                                        <p>{format(signalNow.date, "dd/MM HH:mm")}</p>
                                        <p>Rx: {signalNow.rx}db</p>
                                        <p>Tx: {signalNow.tx}db</p>
                                    </div>
                        }
                    </ExtraContainer>
                </ExtraTdContainer>
                <ExtraTdContainerSeparator />

                <ExtraTdContainer>
                    <Button onClick={fetchCpeSignalHistory} variant="contained">
                        <TableRowButtonContent>
                            Histórico de sinal
                            <GraphicEqOutlined />
                        </TableRowButtonContent>
                    </Button>
                    <ExtraContainer>
                        {fetchOnuSignalHistoryStatus.status === FetchStatus.FAILED ? <p>{fetchOnuSignalHistoryStatus.message}</p> :
                            fetchOnuSignalHistoryStatus.status === FetchStatus.LOADING ? <CircularProgress /> :
                                fetchOnuSignalHistoryStatus.status === FetchStatus.SUCESS &&
                                <LineChart width={800} height={200} data={cpeRecordSignal}>
                                    <Tooltip />
                                    <XAxis dataKey="date" />
                                    <YAxis type="number" />
                                    <Line type="monotone" dataKey="rx" stroke="#FF0000" textAnchor="Rx" />
                                    <Line type="monotone" dataKey="tx" stroke="#0000ff" textAnchor="Tx" />
                                    <Legend />
                                    <CartesianGrid stroke="#ccc" />
                                </LineChart>
                        }
                    </ExtraContainer>
                </ExtraTdContainer>
                <ExtraTdContainerSeparator />

                <ExtraTdContainer>
                    <Button onClick={triggerExpandExtra} variant="contained">
                        <TableRowButtonContent>
                            Detalhes da ONU
                            <Details />
                        </TableRowButtonContent>
                    </Button>
                    {
                        fetchOnuDetailStatus.status === FetchStatus.FAILED ? <ExtraContainer><p>{fetchOnuDetailStatus.message}</p></ExtraContainer> :
                            fetchOnuDetailStatus.status === FetchStatus.LOADING ? <ExtraContainer><CircularProgress /></ExtraContainer> :
                                (fetchOnuDetailStatus.status === FetchStatus.SUCESS && cpeDetails) &&
                                <ExtraContainer>
                                    <div>
                                        <p>Cadastrado: {obj.cadastrado}</p>
                                        <p>MAC no MK: {obj.mac_address}</p>
                                        <p>Pos. na PON: {obj.last_pon_index}</p>
                                        <p>Hw.: {obj.last_hardware_version}</p>
                                        <p>Sw.: {obj.last_software_version}</p>
                                    </div>
                                    <OnuDetails>
                                        <p>Obtidos em: {format(parseISO(cpeDetails.datetime), "dd/MM HH:mm")}</p>
                                        <p>ONU em NAT?: {cpeDetails.wan_pppoe_username ? " sim" : " não"}</p>
                                        <p>Porta: {cpeDetails.port_name}</p>
                                        <p>Speed: {cpeDetails.port_speed}</p>
                                        <p>VLAN: {cpeDetails.port_vlan}</p>
                                        <p>ARP ONU: {cpeDetails.port_mac}</p>
                                        <p>Telefone na ONU: {cpeDetails.tel_num}</p>
                                    </OnuDetails>
                                </ExtraContainer>
                    }
                </ExtraTdContainer>
            </TableTdExtra>
        </TableTr>
    );
}

export default FtthCpeRow;