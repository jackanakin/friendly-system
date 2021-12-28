import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import {
    Surface, HorizontalWrapper, FtthTableWrapper, TableRowHeader
} from './styles';
import AppBackground from '../../../components/AppLayout/AppBackground/AppBackground';
import Cpe from '../../../@types/models/cpe/Cpe';
import FtthRow from './components/FtthRow';
import Ap from '../../../@types/models/ap/Ap';
import { FetchStatus } from '../../../@enum/api/FetchStatus';
import { LoadingPage } from '../../../components/LoadingPage/LoadingPage';
import { ErrorPage } from '../../../components/ErrorPage/ErrorPage';
import { LoadingComponent } from '../../../components/LoadingComponent/LoadingComponent';
import { ErrorComponent } from '../../../components/ErrorComponent/ErrorComponent';
import { useFtth } from '../../../providers/ftth/FtthProvider';

export default function FtthPage() {
    const [selectedAp, setSelectedAp] = useState<number>(-1);
    const [selectedCto, setSelectedCto] = useState<string>("");

    const {
        fetchApStatus, fetchCpeStatus,
        fetchApList, apList,
        fetchCpeList, cpeList, cpeListCached, ctoList, filterCpeList
    } = useFtth();

    useEffect(() => {
        fetchApList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    function handleApChange(event: any) {
        if (event) {
            setSelectedAp(event.target.value)
        }
    }

    function handleCtoChange(event: any) {
        setSelectedCto(event.target.value)
        filterCto(event.target.value)
    }

    function filterCto(cto: string) {
        if (!cto || cto === "") { filterCpeList(cpeListCached); return; }

        const cpeListFiltered = [] as Cpe[];

        cpeListCached.forEach(function (obj) {
            if (obj.nap === cto) {
                cpeListFiltered.push(obj)
            }
        });

        filterCpeList(cpeListFiltered)
    }

    function handleSerialFilter(event: any) {
        const value = event.target.value;

        if (cpeList.length === 0) {
            return;
        }
        if (value.length === 0) {
            filterCpeList(cpeListCached);
            return;
        }

        let newResult = [] as Cpe[];

        cpeListCached.forEach(cpe => {
            if (cpe.onu_serial && value && ((cpe.onu_serial).toUpperCase()).includes(value.toUpperCase())) {
                newResult.push(cpe);
            }
        });

        filterCpeList(newResult);
    };

    function handleNameFilter(event: any) {
        const value = event.target.value;

        if (cpeList.length === 0) return;
        if (value.length === 0) { filterCpeList(cpeListCached); return; }

        let newResult = [] as Cpe[];
        cpeListCached.forEach(cpe => {
            if (cpe.name && value && ((cpe.name).toUpperCase()).includes(value.toUpperCase())) {
                newResult.push(cpe);
            }
        });

        filterCpeList(newResult);
    };

    function handleUsernameFilter(event: any) {
        const value = event.target.value;

        if (cpeList.length <= 0) return;
        if (value.length <= 0) { filterCpeList(cpeListCached); return; }

        let newResult = [] as Cpe[];

        cpeListCached.forEach(cpe => {
            if (cpe.username && value && ((cpe.username).toUpperCase()).includes(value.toUpperCase())) {
                newResult.push(cpe);
            }
        });

        filterCpeList(newResult);
    };

    function handleFetchCpeList() {
        fetchCpeList(selectedAp);
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
                                <Button type="submit" onClick={handleFetchCpeList} >PESQUISAR</Button>
                            </div>
                        </HorizontalWrapper>
                        <HorizontalWrapper>
                            <div style={{ width: 50 + '%', padding: 10 + 'px' }}>
                                <FormControl fullWidth>
                                    {selectedCto ? null : <InputLabel htmlFor="selectedCto">CTO</InputLabel>}
                                    <Select MenuProps={{ PaperProps: { sx: { maxHeight: '25vh' } } }} name="selectedCto" value={selectedCto} onChange={handleCtoChange}>
                                        <MenuItem value={""} selected>TODAS ...</MenuItem>
                                        {
                                            ctoList.length > 0 ?
                                                ctoList.map((obj: string) =>
                                                    <MenuItem key={obj} value={obj}>{obj}</MenuItem>
                                                )
                                                :
                                                null
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                        </HorizontalWrapper>
                        <HorizontalWrapper>
                            <div style={{ padding: 20 + 'px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ width: 90 + '%', padding: 10 + 'px' }}>
                                    <TextField fullWidth
                                        name="name"
                                        label="Nome"
                                        id="name"
                                        margin="normal"
                                        variant="outlined"
                                        onChange={handleNameFilter}
                                    />
                                </div>
                                <div style={{ width: 90 + '%', padding: 10 + 'px' }}>
                                    <TextField fullWidth
                                        name="username"
                                        label="Username"
                                        id="username"
                                        margin="normal"
                                        variant="outlined"
                                        onChange={handleUsernameFilter}
                                    />
                                </div>
                                <div style={{ width: 90 + '%', padding: 10 + 'px' }}>
                                    <TextField fullWidth
                                        name="onu_serial"
                                        label="Serial"
                                        id="onu_serial"
                                        margin="normal"
                                        variant="outlined"
                                        onChange={handleSerialFilter}
                                    />
                                </div>
                            </div>
                        </HorizontalWrapper>
                        <FtthTableWrapper>
                            {
                                fetchCpeStatus.status === FetchStatus.IDLE ?
                                    <Typography variant="subtitle2">
                                        Selecione um Ponto de Presença e pressione PESQUISAR
                                    </Typography>
                                    : fetchCpeStatus.status === FetchStatus.LOADING ?
                                        <LoadingComponent />
                                        :
                                        fetchCpeStatus.status === FetchStatus.FAILED ?
                                            <ErrorComponent text={fetchCpeStatus.message} />
                                            :
                                            cpeList.length > 0 ?
                                                <TableContainer component={Paper}>
                                                    <Table aria-label="collapsible table">
                                                        <TableHead>
                                                            <TableRowHeader>
                                                                <TableCell align="left" />
                                                                <TableCell id="name" align="left">Nome</TableCell>
                                                                <TableCell id="username" align="left">Username</TableCell>
                                                                <TableCell id="onu_serial" align="left">Serial</TableCell>
                                                                <TableCell id="nap" align="left" >CTO/Porta</TableCell>
                                                                <TableCell id="last_rx" align="left" >RX/TX</TableCell>
                                                                <TableCell id="last_software_version" align="left" >Fw. Version</TableCell>
                                                                <TableCell id="last_pon_index" align="left" >PON Index</TableCell>
                                                                <TableCell id="last_online" align="left" >Última vista</TableCell>
                                                            </TableRowHeader>
                                                        </TableHead>
                                                        <TableBody>
                                                            {cpeList.map((obj, index) => (
                                                                <FtthRow key={index} obj={obj} />
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                :
                                                <Typography variant="subtitle2">
                                                    Nenhum resultado retornado
                                                </Typography>
                            }
                        </FtthTableWrapper>
                    </Surface>
            }
        </AppBackground>
    );
}
