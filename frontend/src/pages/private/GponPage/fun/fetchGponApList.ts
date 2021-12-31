import Ap from "../../../../@types/models/ap/Ap";
import api from "../../../../api/api";

export async function fetchGponApList(): Promise<Ap[]> {
    const { data }: { data: Ap[] } = await api.get('ap');
    return data;
}