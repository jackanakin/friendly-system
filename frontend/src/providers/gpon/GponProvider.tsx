import React, { useState } from "react";

import { FetchIdle, FetchRunning, FetchSuccessful } from "../../@dto/api/FetchStatus";
import { FetchStatus } from "../../@enum/api/FetchStatus";
import AxiosFetch from "../../@types/api/AxiosFetch";
import Ap from "../../@types/models/ap/Ap";
import GponGraphDTO from "../../@types/models/gpon/GponGraphDTO";
import api from "../../api/api";
import { axiosErrorHandler } from "../../utils/ErrorHandler/axiosErrorHandler";

interface GponContextType {
    fetchApList(): Promise<void>;
    fetchGponData(ap_id: number): Promise<void>;
    fetchGponTxAvgData(ap_id: number): Promise<void>;
    fetchGponRxAvgData(ap_id: number): Promise<void>;

    fetchApStatus: AxiosFetch;
    fetchGponDataStatus: AxiosFetch;
    fetchGponTxAverageStatus: AxiosFetch;
    fetchGponRxAverageStatus: AxiosFetch;

    apList: Ap[];
    gponCountData: GponGraphDTO | null;
    gponTxAverageData: GponGraphDTO | null;
    gponRxAverageData: GponGraphDTO | null;
    ctoList: string[];
}

let GponProviderContext = React.createContext<GponContextType>(null!);

export function GponProvider({ children }: { children: React.ReactNode }) {
    const [fetchApStatus, setFetchApStatus] = useState<AxiosFetch>(FetchRunning);
    const [apList, setApList] = useState<Ap[]>([]);

    const [gponCountData, setGponCountData] = useState<GponGraphDTO | null>(null);
    const [gponTxAverageData, setGponTxAverageData] = useState<GponGraphDTO | null>(null);
    const [gponRxAverageData, setGponRxAverageData] = useState<GponGraphDTO | null>(null);

    const [fetchGponDataStatus, setFetchGponDataStatus] = useState<AxiosFetch>(FetchIdle);
    const [fetchGponTxAverageStatus, setFetchGponTxAverageStatus] = useState<AxiosFetch>(FetchIdle);
    const [fetchGponRxAverageStatus, setFetchGponRxAverageStatus] = useState<AxiosFetch>(FetchIdle);

    const [ctoList, setCtoList] = useState<string[]>([]);

    async function fetchGponRxAvgData(ap_id: number) {
        setFetchGponRxAverageStatus(FetchRunning);
        try {
            const { data }: { data: GponGraphDTO } = await api.get(`gpon/rxaverage/${ap_id}`);

            setGponRxAverageData(data);
            setFetchGponRxAverageStatus(FetchSuccessful);
        } catch (error: any) {
            const handledError = axiosErrorHandler(error);
            setFetchGponRxAverageStatus({
                message: handledError,
                status: FetchStatus.FAILED
            });
        }
    }

    async function fetchGponTxAvgData(ap_id: number) {
        setFetchGponTxAverageStatus(FetchRunning);
        try {
            const { data }: { data: GponGraphDTO } = await api.get(`gpon/txaverage/${ap_id}`);

            setGponTxAverageData(data);
            setFetchGponTxAverageStatus(FetchSuccessful);
        } catch (error: any) {
            const handledError = axiosErrorHandler(error);
            setFetchGponTxAverageStatus({
                message: handledError,
                status: FetchStatus.FAILED
            });
        }
    }

    async function fetchGponData(ap_id: number) {
        setFetchGponDataStatus(FetchRunning);
        try {
            const { data }: { data: GponGraphDTO } = await api.get(`gpon/count/${ap_id}`);

            setGponCountData(data);
            setFetchGponDataStatus(FetchSuccessful);
        } catch (error: any) {
            const handledError = axiosErrorHandler(error);
            setFetchGponDataStatus({
                message: handledError,
                status: FetchStatus.FAILED
            });
        }
    }

    async function fetchApList() {
        setFetchApStatus(FetchRunning);
        try {
            const { data }: { data: Ap[] } = await api.get('ap');

            setApList(data);
            setFetchApStatus(FetchSuccessful);
        } catch (error: any) {
            const handledError = axiosErrorHandler(error);
            setFetchApStatus({
                message: handledError,
                status: FetchStatus.FAILED
            });
        }
    }

    return <GponProviderContext.Provider
        value={{
            fetchApStatus, fetchApList, apList,
            fetchGponDataStatus, fetchGponData, gponCountData,
            fetchGponTxAverageStatus, fetchGponTxAvgData, gponTxAverageData,
            fetchGponRxAverageStatus, fetchGponRxAvgData, gponRxAverageData,
            ctoList,
        }}>{children}</GponProviderContext.Provider>;
}

export function useGpon() {
    return React.useContext(GponProviderContext);
}
