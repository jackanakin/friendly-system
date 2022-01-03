export default interface CtoGraphDTO {
    ponName: string;
    keys: string[];
    data: CtoGraphValues[];
}

export interface CtoGraphValues {
    date: string,
    [key: string]: any,
}