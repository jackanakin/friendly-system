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
import GponGraphDTO, { CardKeys } from '../../../@types/models/gpon/GponGraphDTO';
import { FetchIdle, FetchRunning, FetchSuccessful } from '../../../@dto/api/FetchStatus';
import AxiosFetch from '../../../@types/api/AxiosFetch';
import { fetchApList } from './fun/fetchGponApList';
import { usePromise } from '../../../hooks/@promises/usePromise';
import { fetchGponCount, fetchGponRxAverage, fetchGponTxAverage } from './fun/fetchGpon';
import CtoGraphDTO from '../../../@types/models/gpon/CtoGraphDTO';
import { fetchCtoCount, fetchCtoRxAverage, fetchCtoTxAverage } from './fun/fetchCto';

export default function GponPage() {
    const { promise } = usePromise();

    const [apList, setApList] = useState<Ap[]>([]);
    const [fetchApStatus, setFetchApStatus] = useState<AxiosFetch>(FetchRunning);

    const [gponCountData, setGponCountData] = useState<GponGraphDTO | null>(null);
    const [cardKeys, setCardKeys] = useState<CardKeys[]>([]);
    const [fetchGponCountDataStatus, setFetchGponCountDataStatus] = useState<AxiosFetch>(FetchIdle);
    const [gponTxAverageData, setGponTxAverageData] = useState<GponGraphDTO | null>(null);
    const [fetchGponTxAverageStatus, setFetchGponTxAverageStatus] = useState<AxiosFetch>(FetchIdle);
    const [gponRxAverageData, setGponRxAverageData] = useState<GponGraphDTO | null>(null);
    const [fetchGponRxAverageStatus, setFetchGponRxAverageStatus] = useState<AxiosFetch>(FetchIdle);

    const [ctoCountData, setCtoCountData] = useState<CtoGraphDTO[]>([]);
    const [fetchCtoCountDataStatus, setFetchCtoCountDataStatus] = useState<AxiosFetch>(FetchIdle);
    const [ctoRxAverageData, setCtoRxAverageData] = useState<CtoGraphDTO[]>([]);
    const [fetchCtoRxAverageDataStatus, setFetchCtoRxAverageDataStatus] = useState<AxiosFetch>(FetchIdle);
    const [ctoTxAverageData, setCtoTxAverageData] = useState<CtoGraphDTO[]>([]);
    const [fetchCtoTxAverageDataStatus, setFetchCtoTxAverageDataStatus] = useState<AxiosFetch>(FetchIdle);

    const [selectedAp, setSelectedAp] = useState<number>(-1);
    //const [selectedCto, setSelectedCto] = useState<string>("");

    const resolveCtoTxAverage = useCallback((data: CtoGraphDTO[]) => {
        setCtoTxAverageData(data);
        setFetchCtoTxAverageDataStatus(FetchSuccessful);
    }, []);
    const resolveCtoRxAverage = useCallback((data: CtoGraphDTO[]) => {
        setCtoRxAverageData(data);
        setFetchCtoRxAverageDataStatus(FetchSuccessful);
    }, []);
    const resolveCtoCount = useCallback((data: CtoGraphDTO[]) => {
        setCtoCountData(data);
        setFetchCtoCountDataStatus(FetchSuccessful);
    }, []);
    const resolveGponTxAverage = useCallback((data: GponGraphDTO) => {
        setGponTxAverageData(data);
        if (data && data.data.length > 0) {
            setFetchGponTxAverageStatus(FetchSuccessful);
        } else {
            setFetchGponTxAverageStatus({
                status: FetchStatus.EMPTY,
                message: "Nenhum resultado"
            });
        }
    }, []);
    const resolveGponRxAverage = useCallback((data: GponGraphDTO) => {
        setGponRxAverageData(data);
        if (data && data.data.length > 0) {
            setFetchGponRxAverageStatus(FetchSuccessful);
        } else {
            setFetchGponRxAverageStatus({
                status: FetchStatus.EMPTY,
                message: "Nenhum resultado"
            });
        }
    }, []);
    const resolveGponCount = useCallback((data: GponGraphDTO) => {
        setGponCountData(data);

        if (data && data.data.length > 0) {
            const cardList: CardKeys[] = [];
            data.keys.forEach(key => {
                const cardName = key.split('/')[0].replace('PON', 'CARD');
                const added = cardList.find(x => x.name === cardName);

                if (added) {
                    added.ponList.push({
                        name: key, color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
                    });
                }
                else {
                    const newCard = { name: cardName, ponList: [{ name: key, color: `#${Math.floor(Math.random() * 16777215).toString(16)}` }] } as CardKeys;
                    cardList.push(newCard);
                }
            });

            setCardKeys(cardList);
            setFetchGponCountDataStatus(FetchSuccessful);
        } else {
            setFetchGponCountDataStatus({
                status: FetchStatus.EMPTY,
                message: "Nenhum resultado"
            });
        }
    }, []);
    const resolveApList = useCallback((data: Ap[]) => {
        setApList(data);
        setFetchApStatus(FetchSuccessful);
    }, []);

    function loadGpon() {
        if (selectedAp <= 0) return;
        loadGponCount();
        loadGponRxAverage();
        loadGponTxAverage();
        loadCtoCount();
        loadCtoRxAverage();
        loadCtoTxAverage();
    }

    async function loadCtoTxAverage() {
        setFetchCtoTxAverageDataStatus(FetchRunning);
        fetchCtoTxAverage({ ap_id: selectedAp }, promise, resolveCtoTxAverage, setFetchCtoTxAverageDataStatus);
    };

    async function loadCtoRxAverage() {
        setFetchCtoRxAverageDataStatus(FetchRunning);
        fetchCtoRxAverage({ ap_id: selectedAp }, promise, resolveCtoRxAverage, setFetchCtoRxAverageDataStatus);
    };

    async function loadCtoCount() {
        setFetchCtoCountDataStatus(FetchRunning);
        fetchCtoCount({ ap_id: selectedAp }, promise, resolveCtoCount, setFetchCtoCountDataStatus);
    };

    async function loadGponRxAverage() {
        setFetchGponRxAverageStatus(FetchRunning);
        fetchGponRxAverage({ ap_id: selectedAp }, promise, resolveGponRxAverage, setFetchGponRxAverageStatus);
    };

    async function loadGponTxAverage() {
        setFetchGponTxAverageStatus(FetchRunning);
        fetchGponTxAverage({ ap_id: selectedAp }, promise, resolveGponTxAverage, setFetchGponTxAverageStatus);
    };

    async function loadGponCount() {
        setFetchGponCountDataStatus(FetchRunning);
        fetchGponCount({ ap_id: selectedAp }, promise, resolveGponCount, setFetchGponCountDataStatus);
    };

    const loadPageResources = useCallback(() => {
        setFetchApStatus(FetchRunning);
        fetchApList(promise, resolveApList, setFetchApStatus);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        loadPageResources();
    }, [loadPageResources]);

    function handleApChange(event: any) {
        if (event) {
            setSelectedAp(event.target.value)
        }
    }

    return (
        <AppBackground>
            {fetchApStatus.status === FetchStatus.LOADING ?
                <LoadingPage /> : fetchApStatus.status === FetchStatus.FAILED ? <ErrorPage callback={loadPageResources} /> :
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

                        {
                            cardKeys.map((card, index) =>
                                <HorizontalWrapper key={index}>
                                    <Typography>{card.name}</Typography>
                                    <VerticalWrapper>
                                        <Typography>Online</Typography>
                                        {(fetchGponCountDataStatus.status === FetchStatus.FAILED || fetchGponCountDataStatus.status === FetchStatus.EMPTY) ? <ErrorComponent text={fetchGponCountDataStatus.message} /> :
                                            fetchGponCountDataStatus.status === FetchStatus.LOADING ? <LoadingComponent /> :
                                                (fetchGponCountDataStatus.status === FetchStatus.SUCCESS && gponCountData) &&
                                                <LineChart width={800} height={200} data={gponCountData.data}>
                                                    <Tooltip />
                                                    <XAxis dataKey="date" />
                                                    <YAxis type="number" />

                                                    {
                                                        card.ponList.map((pon, index) =>
                                                            <Line key={index} type="monotone" strokeWidth={2} dataKey={pon.name} stroke={pon.color} textAnchor={pon.name} />)
                                                    }

                                                    <Legend />
                                                    <CartesianGrid stroke="#ccc" />
                                                </LineChart>
                                        }
                                    </VerticalWrapper>

                                    <VerticalWrapper>
                                        <Typography>Rx avg.</Typography>
                                        {(fetchGponRxAverageStatus.status === FetchStatus.FAILED || fetchGponRxAverageStatus.status === FetchStatus.EMPTY) ? <ErrorComponent text={fetchGponRxAverageStatus.message} /> :
                                            fetchGponRxAverageStatus.status === FetchStatus.LOADING ? <LoadingComponent /> :
                                                (fetchGponRxAverageStatus.status === FetchStatus.SUCCESS && gponRxAverageData) &&
                                                <LineChart width={800} height={200} data={gponRxAverageData.data}>
                                                    <Tooltip />
                                                    <XAxis dataKey="date" />
                                                    <YAxis type="number" />

                                                    {
                                                        card.ponList.map((pon, index) =>
                                                            <Line key={index} type="monotone" strokeWidth={2} dataKey={pon.name} stroke={pon.color} textAnchor={pon.name} />)
                                                    }

                                                    <Legend />
                                                    <CartesianGrid stroke="#ccc" />
                                                </LineChart>
                                        }
                                    </VerticalWrapper>

                                    <VerticalWrapper>
                                        <Typography>Tx avg.</Typography>
                                        {(fetchGponTxAverageStatus.status === FetchStatus.FAILED || fetchGponTxAverageStatus.status === FetchStatus.EMPTY) ? <ErrorComponent text={fetchGponTxAverageStatus.message} /> :
                                            fetchGponTxAverageStatus.status === FetchStatus.LOADING ? <LoadingComponent /> :
                                                (fetchGponTxAverageStatus.status === FetchStatus.SUCCESS && gponTxAverageData) &&
                                                <LineChart width={800} height={200} data={gponTxAverageData.data}>
                                                    <Tooltip />
                                                    <XAxis dataKey="date" />
                                                    <YAxis type="number" />

                                                    {
                                                        card.ponList.map((pon, index) =>
                                                            <Line key={index} type="monotone" strokeWidth={2} dataKey={pon.name} stroke={pon.color} textAnchor={pon.name} />)
                                                    }

                                                    <Legend />
                                                    <CartesianGrid stroke="#ccc" />
                                                </LineChart>
                                        }
                                    </VerticalWrapper>
                                </HorizontalWrapper>
                            )}

                        {
                            ctoCountData.map((ctoCount, index) =>
                                <HorizontalWrapper key={index}>
                                    <Typography>CTOs {ctoCount.ponName}</Typography>
                                    <VerticalWrapper>
                                        <Typography>Online</Typography>
                                        {(fetchCtoCountDataStatus.status === FetchStatus.FAILED || fetchCtoCountDataStatus.status === FetchStatus.EMPTY) ? <ErrorComponent text={fetchCtoCountDataStatus.message} /> :
                                            fetchCtoCountDataStatus.status === FetchStatus.LOADING ? <LoadingComponent /> :
                                                (fetchCtoCountDataStatus.status === FetchStatus.SUCCESS && ctoCountData.length > 0) &&
                                                <LineChart width={800} height={200} data={ctoCount.data}>
                                                    <Tooltip />
                                                    <XAxis dataKey="date" />
                                                    <YAxis type="number" />

                                                    {
                                                        ctoCount.keys.map((datakey, index) =>
                                                            <Line key={index} type="monotone" strokeWidth={2} dataKey={datakey} stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} textAnchor={datakey} />)
                                                    }

                                                    <Legend />
                                                    <CartesianGrid stroke="#ccc" />
                                                </LineChart>
                                        }
                                    </VerticalWrapper>

                                    <VerticalWrapper>
                                        <Typography>Rx avg.</Typography>
                                        {
                                            (fetchCtoRxAverageDataStatus.status === FetchStatus.FAILED || fetchCtoRxAverageDataStatus.status === FetchStatus.EMPTY) ? <ErrorComponent text={fetchCtoRxAverageDataStatus.message} /> :
                                                fetchCtoRxAverageDataStatus.status === FetchStatus.LOADING ? <LoadingComponent /> :
                                                    (fetchCtoRxAverageDataStatus.status === FetchStatus.SUCCESS && ctoRxAverageData.length > 0) &&
                                                    <LineChart width={800} height={200} data={ctoRxAverageData.find(x => x.ponName === ctoCount.ponName)?.data}>
                                                        <Tooltip />
                                                        <XAxis dataKey="date" />
                                                        <YAxis type="number" />

                                                        {
                                                            ctoRxAverageData.find(x => x.ponName === ctoCount.ponName)?.keys.map((datakey, index) =>
                                                                <Line key={index} type="monotone" strokeWidth={2} dataKey={datakey} stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} textAnchor={datakey} />)
                                                        }

                                                        <Legend />
                                                        <CartesianGrid stroke="#ccc" />
                                                    </LineChart>
                                        }
                                    </VerticalWrapper>

                                    <VerticalWrapper>
                                        <Typography>Tx avg.</Typography>
                                        {
                                            (fetchCtoTxAverageDataStatus.status === FetchStatus.FAILED || fetchCtoTxAverageDataStatus.status === FetchStatus.EMPTY) ? <ErrorComponent text={fetchCtoTxAverageDataStatus.message} /> :
                                                fetchCtoTxAverageDataStatus.status === FetchStatus.LOADING ? <LoadingComponent /> :
                                                    (fetchCtoTxAverageDataStatus.status === FetchStatus.SUCCESS && ctoTxAverageData.length > 0) &&
                                                    <LineChart width={800} height={200} data={ctoTxAverageData.find(x => x.ponName === ctoCount.ponName)?.data}>
                                                        <Tooltip />
                                                        <XAxis dataKey="date" />
                                                        <YAxis type="number" />

                                                        {
                                                            ctoTxAverageData.find(x => x.ponName === ctoCount.ponName)?.keys.map((datakey, index) =>
                                                                <Line key={index} type="monotone" strokeWidth={2} dataKey={datakey} stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} textAnchor={datakey} />)
                                                        }

                                                        <Legend />
                                                        <CartesianGrid stroke="#ccc" />
                                                    </LineChart>
                                        }
                                    </VerticalWrapper>
                                </HorizontalWrapper>
                            )
                        }
                    </Surface>
            }
        </AppBackground>
    );
}
