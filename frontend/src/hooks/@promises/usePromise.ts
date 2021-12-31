import { useRef, useEffect } from "react";

interface CancelableResponse {
    promise: Promise<any>;
    cancel(): any;
}

export function makeCancelable(promise: Promise<any>): CancelableResponse {
    let isCanceled = false;

    const wrappedPromise: Promise<any> = new Promise((resolve, reject) => {
        promise
            .then((val: any) => (isCanceled ? reject({ isCanceled }) : resolve(val)))
            .catch((error: any) => (isCanceled ? reject({ isCanceled }) : reject(error)));
    });

    return {
        promise: wrappedPromise,
        cancel() {
            isCanceled = true;
        }
    };
}

export function usePromise(cancelable = makeCancelable) {
    const check = Promise.resolve(true);

    if (!cancelable(check).cancel) {
        throw new Error("undefined cancelable");
    }

    const promises = useRef<any>();

    useEffect(() => {
        if (!promises.current){
            promises.current = [];    
        }
        
        return function cancel() {
            promises.current.forEach((promise: any) => promise.cancel());
            promises.current = [];
        };
    }, []);

    function promise(promise: any) {
        const cancel = cancelable(promise);
        promises.current.push(cancel);
        return cancel.promise;
    }

    return { promise };
}