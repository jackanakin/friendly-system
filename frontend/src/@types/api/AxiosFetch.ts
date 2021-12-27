import { FetchStatus } from "../../@enum/api/FetchStatus";

export default interface AxiosFetch {
    status: FetchStatus;
    message?: string;
}