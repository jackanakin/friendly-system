export default interface GponGraphDTO {
    keys: string[];
    data: GponGraphValues[];
}

export interface GponGraphValues {
    date: string,
    [key: string]: any,
}