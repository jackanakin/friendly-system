import { FetchStatus } from "../../../../@enum/api/FetchStatus";
import AxiosFetch from "../../../../@types/api/AxiosFetch";
import Cpe from "../../../../@types/models/cpe/Cpe";
import api from "../../../../api/api";
import { axiosErrorHandler } from "../../../../utils/ErrorHandler/axiosErrorHandler";

export interface FetchCpeListResponse {
    cpeList: Cpe[];
    ctoList: string[];
}

interface FetchCpeListParams {
    ap_id: number;
}

export async function fetchCpeList(params: FetchCpeListParams, promise: (p: Promise<any>) => Promise<any>, resolve: (data: FetchCpeListResponse) => void, reject: (error: AxiosFetch) => void): Promise<void> {
    promise(fetch(params))
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

async function fetch(params: FetchCpeListParams): Promise<FetchCpeListResponse> {
    const { data }: { data: Cpe[] } = await api.get('cpe/' + params.ap_id);
    const ctoList = [] as string[];

    data.forEach(function (obj) {
        if (obj.nap && !ctoList.includes(obj.nap)) {
            ctoList.push(obj.nap)
        }
    });
    const sorterAlphanumerical = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
    const sortedCtoList = ctoList.sort(sorterAlphanumerical.compare);

    return {
        cpeList: data,
        ctoList: sortedCtoList
    }
}