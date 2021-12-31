import React, { useState, useEffect, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Typography } from '@material-ui/core';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

import {
    Surface, HorizontalWrapper, VerticalWrapper
} from './styles';
import AppBackground from '../../../components/AppLayout/AppBackground/AppBackground';
import Ap from '../../../@types/models/ap/Ap';
import { FetchStatus } from '../../../@enum/api/FetchStatus';
import { LoadingPage } from '../../../components/LoadingPage/LoadingPage';
import { ErrorPage } from '../../../components/ErrorPage/ErrorPage';
import { LoadingComponent } from '../../../components/LoadingComponent/LoadingComponent';
import { ErrorComponent } from '../../../components/ErrorComponent/ErrorComponent';
import GponGraphDTO from '../../../@types/models/gpon/GponGraphDTO';
import { FetchIdle, FetchRunning, FetchSuccessful } from '../../../@dto/api/FetchStatus';
import AxiosFetch from '../../../@types/api/AxiosFetch';
import { fetchGponCount } from './fun/fetchGponCount';
import { fetchGponTxAverage } from './fun/fetchGponTxAverage';
import { fetchGponRxAverage } from './fun/fetchGponRxAverage';
import { fetchGponApList } from './fun/fetchGponApList';
import { axiosErrorHandler } from '../../../utils/ErrorHandler/axiosErrorHandler';
import { usePromise } from '../../../hooks/@promises/usePromise';

export default function GponPage() {
    const { promise } = usePromise();

    const [apList, setApList] = useState<Ap[]>([]);
    const [fetchApStatus, setFetchApStatus] = useState<AxiosFetch>(FetchRunning);

    const [gponCountData, setGponCountData] = useState<GponGraphDTO | null>(null);
    const [fetchGponCountDataStatus, setFetchGponCountDataStatus] = useState<AxiosFetch>(FetchIdle);
    const [gponTxAverageData, setGponTxAverageData] = useState<GponGraphDTO | null>(null);
    const [fetchGponTxAverageStatus, setFetchGponTxAverageStatus] = useState<AxiosFetch>(FetchIdle);
    const [gponRxAverageData, setGponRxAverageData] = useState<GponGraphDTO | null>(null);
    const [fetchGponRxAverageStatus, setFetchGponRxAverageStatus] = useState<AxiosFetch>(FetchIdle);

    const [selectedAp, setSelectedAp] = useState<number>(-1);
    //const [selectedCto, setSelectedCto] = useState<string>("");

    function loadGpon() {
        loadGponCount();
        loadGponRxAverage();
        loadGponTxAverage();
    }

    async function loadGponRxAverage() {
        setFetchGponRxAverageStatus(FetchRunning);

        promise(fetchGponRxAverage(selectedAp))
            .then((data: GponGraphDTO) => {
                setGponRxAverageData(data);
                setFetchGponRxAverageStatus(FetchSuccessful);
            }).catch((error: any) => {
                if (!error.isCanceled) {
                    const handledError = axiosErrorHandler(error);
                    setFetchGponRxAverageStatus({
                        status: FetchStatus.FAILED,
                        message: handledError
                    });
                }
            });
    };

    async function loadGponTxAverage() {
        setFetchGponTxAverageStatus(FetchRunning);

        promise(fetchGponTxAverage(selectedAp))
            .then((data: GponGraphDTO) => {
                setGponTxAverageData(data);
                setFetchGponTxAverageStatus(FetchSuccessful);
            }).catch((error: any) => {
                if (!error.isCanceled) {
                    const handledError = axiosErrorHandler(error);
                    setFetchGponTxAverageStatus({
                        status: FetchStatus.FAILED,
                        message: handledError
                    });
                }
            });
    };

    async function loadGponCount() {
        setFetchGponCountDataStatus(FetchRunning);

        promise(fetchGponCount(selectedAp))
            .then((data: GponGraphDTO) => {
                setGponCountData(data);
                setFetchGponCountDataStatus(FetchSuccessful);
            }).catch((error: any) => {
                if (!error.isCanceled) {
                    const handledError = axiosErrorHandler(error);
                    setFetchGponCountDataStatus({
                        status: FetchStatus.FAILED,
                        message: handledError
                    });
                }
            });
    };

    const loadApList = useCallback(() => {
        setFetchApStatus(FetchRunning);
        promise(fetchGponApList())
            .then((data: Ap[]) => {
                setApList(data);
                setFetchApStatus(FetchSuccessful);
            }).catch((error: any) => {
                if (!error.isCanceled) {
                    const handledError = axiosErrorHandler(error);
                    setFetchApStatus({
                        status: FetchStatus.FAILED,
                        message: handledError
                    });
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        loadApList();
    }, [loadApList]);

    function handleApChange(event: any) {
        if (event) {
            setSelectedAp(event.target.value)
        }
    }

    return (
        <AppBackground>
            {fetchApStatus.status === FetchStatus.LOADING ?
                <LoadingPage /> : fetchApStatus.status === FetchStatus.FAILED ? <ErrorPage callback={loadApList} /> :
                    <Surface>
                        <HorizontalWrapper>
                            <div style={{ width: 50 + '%', padding: 10 + 'px' }}>
                                <FormControl fullWidth>
                                    {selectedAp ? null : <InputLabel htmlFor="selectedPop">Ponto de Presença</InputLabel>}
                                    <Select MenuProps={{ PaperProps: { sx: { maxHeight: '25vh' } } }} name="selectedPop" value={selectedAp} onChange={handleApChange}>
                                        <MenuItem value={-1} selected>SELECIONE ...</MenuItem>
                                        {
                                            apList.length > 0 ?
                                                apList.map((obj: Ap, index: number) =>
                                                    <MenuItem key={index} value={obj.id}>{obj.description}</MenuItem>
                                                )
                                                :
                                                null
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <Button type="submit" onClick={loadGpon} >PESQUISAR</Button>
                            </div>
                        </HorizontalWrapper>

                        <HorizontalWrapper>
                            <Typography>PON</Typography>
                            <VerticalWrapper>
                                <Typography>Online</Typography>
                                {fetchGponCountDataStatus.status === FetchStatus.FAILED ? <ErrorComponent text={fetchGponCountDataStatus.message} /> :
                                    fetchGponCountDataStatus.status === FetchStatus.LOADING ? <LoadingComponent /> :
                                        (fetchGponCountDataStatus.status === FetchStatus.SUCCESS && gponCountData) &&
                                        <LineChart width={800} height={200} data={gponCountData.data}>
                                            <Tooltip />
                                            <XAxis dataKey="date" />
                                            <YAxis type="number" />

                                            {
                                                gponCountData.keys.map((datakey, index) =>
                                                    <Line key={index} type="monotone" strokeWidth={2} dataKey={datakey} stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} textAnchor={datakey} />)
                                            }

                                            <Legend />
                                            <CartesianGrid stroke="#ccc" />
                                        </LineChart>
                                }
                            </VerticalWrapper>

                            <VerticalWrapper>
                                <Typography>Rx avg.</Typography>
                                {fetchGponRxAverageStatus.status === FetchStatus.FAILED ? <ErrorComponent text={fetchGponRxAverageStatus.message} /> :
                                    fetchGponRxAverageStatus.status === FetchStatus.LOADING ? <LoadingComponent /> :
                                        (fetchGponRxAverageStatus.status === FetchStatus.SUCCESS && gponRxAverageData) &&
                                        <LineChart width={800} height={200} data={gponRxAverageData.data}>
                                            <Tooltip />
                                            <XAxis dataKey="date" />
                                            <YAxis type="number" />

                                            {
                                                gponRxAverageData.keys.map((datakey, index) =>
                                                    <Line key={index} type="monotone" dataKey={datakey} strokeWidth={2} stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} textAnchor={datakey} />)
                                            }

                                            <Legend />
                                            <CartesianGrid stroke="#ccc" />
                                        </LineChart>
                                }
                            </VerticalWrapper>

                            <VerticalWrapper>
                                <Typography>Tx avg.</Typography>
                                {fetchGponTxAverageStatus.status === FetchStatus.FAILED ? <ErrorComponent text={fetchGponTxAverageStatus.message} /> :
                                    fetchGponTxAverageStatus.status === FetchStatus.LOADING ? <LoadingComponent /> :
                                        (fetchGponTxAverageStatus.status === FetchStatus.SUCCESS && gponTxAverageData) &&
                                        <LineChart width={800} height={200} data={gponTxAverageData.data}>
                                            <Tooltip />
                                            <XAxis dataKey="date" />
                                            <YAxis type="number" />

                                            {
                                                gponTxAverageData.keys.map((datakey, index) =>
                                                    <Line key={index} type="monotone" dataKey={datakey} strokeWidth={2} stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} textAnchor={datakey} />)
                                            }

                                            <Legend />
                                            <CartesianGrid stroke="#ccc" />
                                        </LineChart>
                                }
                            </VerticalWrapper>
                        </HorizontalWrapper>
                    </Surface>
            }
        </AppBackground>
    );
}
