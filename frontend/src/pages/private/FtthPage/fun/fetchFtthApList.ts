import { FetchStatus } from "../../../../@enum/api/FetchStatus";
import AxiosFetch from "../../../../@types/api/AxiosFetch";
import Ap from "../../../../@types/models/ap/Ap";
import api from "../../../../api/api";
import { axiosErrorHandler } from "../../../../utils/ErrorHandler/axiosErrorHandler";

export async function fetchApList(promise: (p: Promise<any>) => Promise<any>, resolve: (data: Ap[]) => void, reject: (error: AxiosFetch) => void): Promise<void> {
    promise(fetch())
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

async function fetch(): Promise<Ap[]> {
    const { data }: { data: Ap[] } = await api.get('ap');
    return data;
}