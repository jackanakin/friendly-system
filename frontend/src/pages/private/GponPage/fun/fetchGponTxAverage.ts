import GponGraphDTO from "../../../../@types/models/gpon/GponGraphDTO";
import api from "../../../../api/api";

export async function fetchGponTxAverage(ap_id: number): Promise<GponGraphDTO> {
    const { data }: { data: GponGraphDTO } = await api.get(`gpon/txaverage/${ap_id}`);
    return data;
}