import {IDataTableAuthRow} from "@data/DataSlice/DataSlice";
import {createAsyncThunk} from "@reduxjs/toolkit";

export function asyncAuthRowAdd(row: IDataTableAuthRow){
    return new Promise<{data: IDataTableAuthRow}>((resolve) => {
        setTimeout(() => resolve({data: row}), 500);
    })
}

export const fetchAuthRows = createAsyncThunk('data/fetchAuthRows', async () => {
   const response = fetch("/authWors");
});

export function hashRowPassword(str: string, seed: number = 0x811c9dc5): string{
    let h = seed;

    for (let i = 0; i < str.length; i++){
        h ^= str.charCodeAt(i);
        h += (h<<1) + (h<<4) + (h<<7) + (h<<8)
    }

    return (Math.abs(h>>0).toString(16));
}