import CtoGraphDTO from "../../@dto/cto/CtoGraphDTO";

export function ctoGraphDTOSorter(aobj: CtoGraphDTO, bobj: CtoGraphDTO): number {
    const a = aobj.ponName.split("/").reverse().join("");
    const b = bobj.ponName.split("/").reverse().join("");
    return a > b ? 1 : a < b ? -1 : 0;
}