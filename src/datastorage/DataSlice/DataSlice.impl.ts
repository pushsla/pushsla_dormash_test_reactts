import {DataTableAuthRow} from "@data/DataSlice/DataSlice";

export function promiseAuthRowAdd(row: DataTableAuthRow){
    return new Promise<{data: DataTableAuthRow}>((resolve) => {
        setTimeout(() => resolve({data: row}), 1000);
    })
}

export function hashRowPassword(str: string, seed: number = 0x811c9dc5): string{
    let h = seed;

    for (let i = 0; i < str.length; i++){
        h ^= str.charCodeAt(i);
        h += (h<<1) + (h<<4) + (h<<7) + (h<<8)
    }

    return (Math.abs(h>>0).toString(16));
}