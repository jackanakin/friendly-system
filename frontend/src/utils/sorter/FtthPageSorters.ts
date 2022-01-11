import Cpe from "../../@types/models/cpe/Cpe";

export function sortNap(aobj: Cpe, bobj: Cpe): number {
    let a: string | null = `${aobj.nap} p.${aobj.nap_port}`;
    let b: string | null = `${bobj.nap} p.${bobj.nap_port}`;
    if (!a) a = "";
    if (!b) b = "";

    return a > b ? 1 : a < b ? -1 : 0;
}

export function sortLastSoftwareVersion(aobj: Cpe, bobj: Cpe): number {
    let a: string | null = aobj.last_software_version;
    let b: string | null = bobj.last_software_version;
    if (!a) a = "";
    if (!b) b = "";

    return a > b ? 1 : a < b ? -1 : 0;
}

export function sortName(aobj: Cpe, bobj: Cpe): number {
    let a: string | null = aobj.name;
    let b: string | null = bobj.name;
    if (!a) a = "";
    if (!b) b = "";

    return a > b ? 1 : a < b ? -1 : 0;
}