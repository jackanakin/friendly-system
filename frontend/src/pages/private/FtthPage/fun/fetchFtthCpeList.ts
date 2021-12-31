import Cpe from "../../../../@types/models/cpe/Cpe";
import api from "../../../../api/api";

export interface FetchCpeListResponse {
    cpeList: Cpe[];
    ctoList: string[];
}

export async function fetchCpeList(apId: number): Promise<FetchCpeListResponse> {
    const { data }: { data: Cpe[] } = await api.get('cpe/' + apId);
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