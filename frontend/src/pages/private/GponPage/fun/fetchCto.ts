import { FetchStatus } from "../../../../@enum/api/FetchStatus";
import AxiosFetch from "../../../../@types/api/AxiosFetch";
import CtoGraphDTO from "../../../../@types/models/gpon/CtoGraphDTO";
import api from "../../../../api/api";
import { axiosErrorHandler } from "../../../../utils/ErrorHandler/axiosErrorHandler";

export interface FetchGponParams {
    ap_id: number;
}

export async function fetchCtoTxAverage(params: FetchGponParams, promise: (p: Promise<any>) => Promise<any>, resolve: (data: CtoGraphDTO[]) => void, reject: (error: AxiosFetch) => void): Promise<void> {
    promise(ctoTxAverage(params))
        .then(resolve)
        .catch((error: any) => {
            if (!error.isCanceled) {
                const handledError = axiosErrorHandler(error);
                reject({
                    status: FetchStatus.FAILED,
                    message: handledError
                });
            }
        });
}

export async function fetchCtoRxAverage(params: FetchGponParams, promise: (p: Promise<any>) => Promise<any>, resolve: (data: CtoGraphDTO[]) => void, reject: (error: AxiosFetch) => void): Promise<void> {
    promise(ctoRxAverage(params))
        .then(resolve)
        .catch((error: any) => {
            if (!error.isCanceled) {
                const handledError = axiosErrorHandler(error);
                reject({
                    status: FetchStatus.FAILED,
                    message: handledError
                });
            }
        });
}

export async function fetchCtoCount(params: FetchGponParams, promise: (p: Promise<any>) => Promise<any>, resolve: (data: CtoGraphDTO[]) => void, reject: (error: AxiosFetch) => void): Promise<void> {
    promise(ctoCount(params))
        .then(resolve)
        .catch((error: any) => {
            if (!error.isCanceled) {
                const handledError = axiosErrorHandler(error);
                reject({
                    status: FetchStatus.FAILED,
                    message: handledError
                });
            }
        });
}

async function ctoTxAverage(params: FetchGponParams): Promise<CtoGraphDTO[]> {
    const { data }: { data: CtoGraphDTO[] } = await api.get(`cto/txaverage/${params.ap_id}`);
    return data;
}

async function ctoRxAverage(params: FetchGponParams): Promise<CtoGraphDTO[]> {
    const { data }: { data: CtoGraphDTO[] } = await api.get(`cto/rxaverage/${params.ap_id}`);
    return data;
}

async function ctoCount(params: FetchGponParams): Promise<CtoGraphDTO[]> {
    const { data }: { data: CtoGraphDTO[] } = await api.get(`cto/count/${params.ap_id}`);
    return data;
}