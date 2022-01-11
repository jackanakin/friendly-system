export default interface GponGraphDTO {
    keys: string[];
    data: GponGraphValues[];
}

export interface GponGraphValues {
    date: string,
    [key: string]: any,
}

export interface CardKeys {
    name: string;
    ponList: CardKeyPon[];
}

interface CardKeyPon {
    color: string;
    name: string;
}