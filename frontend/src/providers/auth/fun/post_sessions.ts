import { FetchStatus } from "../../../@enum/api/FetchStatus";
import AxiosFetch from "../../../@types/api/AxiosFetch";
import SignInDTO from "../../../@types/models/user/SignInDTO";
import api from "../../../api/api";
import { axiosErrorHandler } from "../../../utils/ErrorHandler/axiosErrorHandler";

interface SignInParams {
    user: SignInDTO;
}

export async function post_sessions(params: SignInParams, promise: (p: Promise<any>) => Promise<any>, resolve: () => void, reject: (error: AxiosFetch) => void): Promise<void> {
    promise(post(params))
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

async function post(params: SignInParams): Promise<void> {
    await api.post(`sessions`, params.user);
}