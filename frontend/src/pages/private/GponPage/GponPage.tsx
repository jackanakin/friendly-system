import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@mui/material/CircularProgress';
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
import { useGpon } from '../../../providers/gpon/GponProvider';
import { Typography } from '@material-ui/core';

export default function GponPage() {
    const [selectedAp, setSelectedAp] = useState<number>(-1);
    const [selectedCto, setSelectedCto] = useState<string>("");

    const {
        fetchApStatus, fetchApList, apList,
        fetchGponDataStatus, fetchGponData, gponCountData,
        fetchGponTxAverageStatus, fetchGponTxAvgData, gponTxAverageData,
        fetchGponRxAverageStatus, fetchGponRxAvgData, gponRxAverageData
    } = useGpon();

    useEffect(() => {
        fetchApList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleSearch() {
        fetchGponData(selectedAp);
        fetchGponTxAvgData(selectedAp);
        fetchGponRxAvgData(selectedAp);
    }

    function handleApChange(event: any) {
        if (event) {
            setSelectedAp(event.target.value)
        }
    }

    return (
        <AppBackground>
            {fetchApStatus.status === FetchStatus.LOADING ?
                <LoadingPage /> : fetchApStatus.status === FetchStatus.FAILED ? <ErrorPage callback={fetchApList} /> :
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
                                <Button type="submit" onClick={handleSearch} >PESQUISAR</Button>
                            </div>
                        </HorizontalWrapper>

                        <HorizontalWrapper>
                            <Typography>PON</Typography>
                            <VerticalWrapper>
                                <Typography>Online</Typography>
                                {fetchGponDataStatus.status === FetchStatus.FAILED ? <ErrorComponent text={fetchGponDataStatus.message} /> :
                                    fetchGponDataStatus.status === FetchStatus.LOADING ? <LoadingComponent /> :
                                        (fetchGponDataStatus.status === FetchStatus.SUCESS && gponCountData) &&
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
                                        (fetchGponRxAverageStatus.status === FetchStatus.SUCESS && gponRxAverageData) &&
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
                                        (fetchGponTxAverageStatus.status === FetchStatus.SUCESS && gponTxAverageData) &&
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
