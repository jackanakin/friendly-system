import { FetchStatus } from "../../@enum/api/FetchStatus";
import AxiosFetch from "../../@types/api/AxiosFetch";

export const FetchEmpty = {
    status: FetchStatus.EMPTY,
    message: "Nenhum resultado"
} as AxiosFetch;

export const FetchIdle = {
    status: FetchStatus.IDLE
} as AxiosFetch;

export const FetchRunning = {
    status: FetchStatus.LOADING
} as AxiosFetch;

export const FetchSuccessful = {
    status: FetchStatus.SUCCESS
} as AxiosFetch;

export const FetchFailed = {
    status: FetchStatus.FAILED,
    message: "Erro desconhecido"
} as AxiosFetch;