import GponGraphDTO from "../../../../@types/models/gpon/GponGraphDTO";
import api from "../../../../api/api";

export async function fetchGponRxAverage(ap_id: number): Promise<GponGraphDTO> {
    const { data }: { data: GponGraphDTO } = await api.get(`gpon/rxaverage/${ap_id}`);
    return data;
}