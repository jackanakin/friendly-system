import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

import api from '../../../api/api';
import {
    Surface, HorizontalWrapper, FtthTableWrapper, TableTr, TableTh
} from './styles';
import AppBackground from '../../../components/AppLayout/AppBackground/AppBackground';
import Cpe from '../../../@types/models/cpe/Cpe';
import FtthCpeRow from './components/FtthCpeRow';
import Ap from '../../../@types/models/ap/Ap';

export default function FtthPage() {
    const [selectedAp, setSelectedAp] = useState<Ap | string>("");
    const [selectedCto, setSelectedCto] = useState<string>("");
    const [apList, setApList] = useState<Ap[]>([]);
    const [cpeList, setCpeList] = useState<Cpe[]>([]);
    const [cpeListCached, setCpeListCached] = useState<Cpe[]>([]);
    const [ctoList, setCtoList] = useState<string[]>([]);

    useEffect(() => {
        fetchApList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function fetchApList() {
        loadAp();
    }

    async function loadAp() {
        const { data }: { data: Ap[] } = await api.get('ap');
        setApList(data);
    }

    function handleApChange(event: any) {
        if (event) {
            setSelectedAp(event.target.value)
        }
    }

    function handleCtoChange(event: any) {
        setSelectedCto(event.target.value)
        filterCto(event.target.value)
    }

    async function loadCpes() {
        if (!selectedAp || typeof (selectedAp) === "string") return;

        const { data }: { data: Cpe[] } = await api.get('cpe/' + selectedAp.id);
        const ctoList = [] as string[];

        data.forEach(function (obj) {
            if (obj.nap && !ctoList.includes(obj.nap)) {
                ctoList.push(obj.nap)
            }
        });
        const sorterAlphanumerical = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
        const sortedCtoList = ctoList.sort(sorterAlphanumerical.compare);

        //console.log(format(parseISO(String(data[0].last_online)), "dd/MM HH:mm"))
        setCpeList(data);
        setCpeListCached(data);
        setCtoList(sortedCtoList);
    }

    function filterCto(cto: string) {
        if (!cto || cto === "") { setCpeList(cpeListCached); return; }

        const cpeListFiltered = [] as Cpe[];

        cpeListCached.forEach(function (obj) {
            if (obj.nap === cto) {
                cpeListFiltered.push(obj)
            }
        });

        setCpeList(cpeListFiltered)
    }

    function handleUsernameFilter(event: any) {
        const value = event.target.value;

        if (cpeList.length <= 0) return;
        if (value.length <= 0) { setCpeList(cpeListCached); return; }

        let newResult = [] as Cpe[];

        cpeListCached.forEach(cpe => {
            if (cpe.username && value && ((cpe.username).toUpperCase()).includes(value.toUpperCase())) {
                newResult.push(cpe);
            }
        });

        setCpeList(newResult);
    };

    function handleSerialFilter(event: any) {
        const value = event.target.value;

        if (cpeList.length === 0) {
            return;
        }
        if (value.length === 0) {
            setCpeList(cpeListCached);
            return;
        }

        let newResult = [] as Cpe[];

        cpeListCached.forEach(cpe => {
            if (cpe.onu_serial && value && ((cpe.onu_serial).toUpperCase()).includes(value.toUpperCase())) {
                newResult.push(cpe);
            }
        });

        setCpeList(newResult);
    };

    function handleNameFilter(event: any) {
        const value = event.target.value;

        if (cpeList.length === 0) return;
        if (value.length === 0) { setCpeList(cpeListCached); return; }

        let newResult = [] as Cpe[];
        cpeListCached.forEach(cpe => {
            if (cpe.name && value && ((cpe.name).toUpperCase()).includes(value.toUpperCase())) {
                newResult.push(cpe);
            }
        });

        setCpeList(newResult);
    };

    return (
        <AppBackground>
            <Surface>
                <HorizontalWrapper>
                    <div style={{ width: 50 + '%', padding: 10 + 'px' }}>
                        <FormControl fullWidth>
                            {selectedAp ? null : <InputLabel htmlFor="selectedPop">Ponto de Presença</InputLabel>}
                            <Select name="selectedPop" value={selectedAp} onChange={handleApChange}>
                                <MenuItem value="" selected>SELECIONE ...</MenuItem>
                                {
                                    apList.length > 0 ?
                                        apList.map((obj: any, index: number) =>
                                            <MenuItem key={index} value={obj}>{obj.description}</MenuItem>
                                        )
                                        :
                                        null
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <Button type="submit" onClick={loadCpes} >PESQUISAR</Button>
                    </div>
                </HorizontalWrapper>
                <HorizontalWrapper>
                    <div style={{ width: 50 + '%', padding: 10 + 'px' }}>
                        <FormControl fullWidth>
                            {selectedCto ? null : <InputLabel htmlFor="selectedCto">CTO</InputLabel>}
                            <Select name="selectedCto" value={selectedCto} onChange={handleCtoChange}>
                                <MenuItem value={""} selected>TODAS ...</MenuItem>
                                {
                                    ctoList.length > 0 ?
                                        ctoList.map((obj: any) =>
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
                                label="Filtrar por nome"
                                id="name"
                                margin="normal"
                                variant="outlined"
                                onChange={handleNameFilter}
                            />
                        </div>
                        <div style={{ width: 90 + '%', padding: 10 + 'px' }}>
                            <TextField fullWidth
                                name="username"
                                label="Filtrar por username"
                                id="username"
                                margin="normal"
                                variant="outlined"
                                onChange={handleUsernameFilter}
                            />
                        </div>
                        <div style={{ width: 90 + '%', padding: 10 + 'px' }}>
                            <TextField fullWidth
                                name="onu_serial"
                                label="Filtrar por serial"
                                id="onu_serial"
                                margin="normal"
                                variant="outlined"
                                onChange={handleSerialFilter}
                            />
                        </div>
                    </div>
                </HorizontalWrapper>
                <HorizontalWrapper>
                    <FtthTableWrapper>
                        <tbody>
                            <TableTr>
                                <TableTh id="name" scope="col">Nome</TableTh>
                                <TableTh id="username" scope="col">Username</TableTh>
                                <TableTh id="onu_serial" scope="col">Serial</TableTh>
                                <TableTh id="nap" scope="col" >CTO</TableTh>
                                <TableTh id="nap_port" scope="col" >Porta</TableTh>
                                <TableTh id="last_rx" scope="col" >RX</TableTh>
                                <TableTh id="last_tx" scope="col" >TX</TableTh>
                                <TableTh id="last_software_version" scope="col" >Fw. Version</TableTh>
                                <TableTh id="last_pon_index" scope="col" >PON Index</TableTh>
                                <TableTh id="last_online" scope="col" >Última vista</TableTh>
                            </TableTr>
                        </tbody>
                        <tbody>
                            {
                                cpeList.length > 0 ?
                                    cpeList.map((obj, index: number) =>
                                        <FtthCpeRow key={obj.erp_cpe_id} obj={obj} />
                                    )
                                    :
                                    null
                            }
                        </tbody>
                    </FtthTableWrapper>
                </HorizontalWrapper>
            </Surface>
        </AppBackground>
    );
}
