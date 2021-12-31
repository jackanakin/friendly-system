import { FetchStatus } from "../../../../@enum/api/FetchStatus";
import AxiosFetch from "../../../../@types/api/AxiosFetch";
import GponGraphDTO from "../../../../@types/models/gpon/GponGraphDTO";
import api from "../../../../api/api";
import { axiosErrorHandler } from "../../../../utils/ErrorHandler/axiosErrorHandler";

export interface FetchGponParams {
    ap_id: number;
}

export async function fetchGponTxAverage(params: FetchGponParams, promise: (p: Promise<any>) => Promise<any>, resolve: (data: GponGraphDTO) => void, reject: (error: AxiosFetch) => void): Promise<void> {
    promise(gponTxAverage(params))
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

export async function fetchGponRxAverage(params: FetchGponParams, promise: (p: Promise<any>) => Promise<any>, resolve: (data: GponGraphDTO) => void, reject: (error: AxiosFetch) => void): Promise<void> {
    promise(gponRxAverage(params))
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

export async function fetchGponCount(params: FetchGponParams, promise: (p: Promise<any>) => Promise<any>, resolve: (data: GponGraphDTO) => void, reject: (error: AxiosFetch) => void): Promise<void> {
    promise(gponCount(params))
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

async function gponTxAverage(params: FetchGponParams): Promise<GponGraphDTO> {
    const { data }: { data: GponGraphDTO } = await api.get(`gpon/txaverage/${params.ap_id}`);
    return data;
}

async function gponRxAverage(params: FetchGponParams): Promise<GponGraphDTO> {
    const { data }: { data: GponGraphDTO } = await api.get(`gpon/rxaverage/${params.ap_id}`);
    return data;
}

async function gponCount(params: FetchGponParams): Promise<GponGraphDTO> {
    const { data }: { data: GponGraphDTO } = await api.get(`gpon/count/${params.ap_id}`);
    return data;
}