import React, { useState } from "react";

import { FetchIdle, FetchRunning, FetchSuccessful } from "../../@dto/api/FetchStatus";
import { FetchStatus } from "../../@enum/api/FetchStatus";
import AxiosFetch from "../../@types/api/AxiosFetch";
import Ap from "../../@types/models/ap/Ap";
import Cpe from "../../@types/models/cpe/Cpe";
import api from "../../api/api";
import { axiosErrorHandler } from "../../utils/ErrorHandler/axiosErrorHandler";

interface FtthContextType {
    fetchApList(): Promise<void>;
    fetchCpeList(apId: number): Promise<void>;
    filterCpeList(newState: Cpe[]): void;

    fetchApStatus: AxiosFetch;
    fetchCpeStatus: AxiosFetch;

    apList: Ap[];
    ctoList: string[];
    cpeList: Cpe[];
    cpeListCached: Cpe[];
}

let FtthProviderContext = React.createContext<FtthContextType>(null!);

export function FtthProvider({ children }: { children: React.ReactNode }) {
    const [fetchApStatus, setFetchApStatus] = useState<AxiosFetch>(FetchRunning);
    const [apList, setApList] = useState<Ap[]>([]);
    const [ctoList, setCtoList] = useState<string[]>([]);

    const [fetchCpeStatus, setFetchCpeStatus] = useState<AxiosFetch>(FetchIdle);
    const [cpeList, setCpeList] = useState<Cpe[]>([]);
    const [cpeListCached, setCpeListCached] = useState<Cpe[]>([]);

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

    async function fetchCpeList(apId: number) {
        if (apId <= 0) return;
        setFetchCpeStatus(FetchRunning);

        try {
            const { data }: { data: Cpe[] } = await api.get('cpe/' + apId);
            const ctoList = [] as string[];

            data.forEach(function (obj) {
                if (obj.nap && !ctoList.includes(obj.nap)) {
                    ctoList.push(obj.nap)
                }
            });
            const sorterAlphanumerical = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
            const sortedCtoList = ctoList.sort(sorterAlphanumerical.compare);

            setCpeList(data);
            setCpeListCached(data);
            setCtoList(sortedCtoList);

            setFetchCpeStatus(FetchSuccessful);
        } catch (error: any) {
            const handledError = axiosErrorHandler(error);
            setFetchCpeStatus({
                message: handledError,
                status: FetchStatus.FAILED
            });
        }
    }

    function filterCpeList(newState: Cpe[]) {
        setCpeList(newState);
    }

    return <FtthProviderContext.Provider
        value={{
            fetchApStatus, fetchCpeStatus,
            fetchApList, apList,
            fetchCpeList, cpeList, ctoList, cpeListCached, filterCpeList
        }}>{children}</FtthProviderContext.Provider>;
}

export function useFtth() {
    return React.useContext(FtthProviderContext);
}
