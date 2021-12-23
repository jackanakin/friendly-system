import * as express from "express"

interface Address {
    address: string;
    port: number;
}

declare global {
    namespace Express {
        interface Request {
            sourceSocket: Address;
            userId: number;
            streamId: string;
        }
    }
}