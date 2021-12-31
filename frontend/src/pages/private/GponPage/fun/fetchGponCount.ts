import GponGraphDTO from "../../../../@types/models/gpon/GponGraphDTO";
import api from "../../../../api/api";

export async function fetchGponCount(ap_id: number): Promise<GponGraphDTO> {
    const { data }: { data: GponGraphDTO } = await api.get(`gpon/count/${ap_id}`);
    return data;
}