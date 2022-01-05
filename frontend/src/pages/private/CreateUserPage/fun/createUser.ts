import CreateUserDTO from "../../../../@dto/user/CreateUserDTO";
import { FetchStatus } from "../../../../@enum/api/FetchStatus";
import AxiosFetch from "../../../../@types/api/AxiosFetch";
import Ap from "../../../../@types/models/ap/Ap";
import api from "../../../../api/api";
import { axiosErrorHandler } from "../../../../utils/ErrorHandler/axiosErrorHandler";

export async function createUser(newUser: CreateUserDTO, promise: (p: Promise<any>) => Promise<any>, resolve: (data: string) => void, reject: (error: AxiosFetch) => void): Promise<void> {
    promise(create(newUser))
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

async function create(newUser: CreateUserDTO): Promise<Ap[]> {
    const { data }: { data: any } = await api.post('user', newUser);

    return data;
}