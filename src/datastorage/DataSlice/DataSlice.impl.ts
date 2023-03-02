//*module
import {createAsyncThunk} from "@reduxjs/toolkit";
//*local
import {IDataTableAuthRow} from "@data/DataSlice/DataSlice";

/**
 * Fake function that simulates async API request sending new object for DataSlice to server
 * @param row - row to 'send'
 */
export function asyncAuthRowAdd(row: IDataTableAuthRow){
    return new Promise<{data: IDataTableAuthRow}>((resolve) => {
        setTimeout(() => resolve({data: row}), 500);
    })
}

/**
 * Fake function that simulates async API request fetching rows for DataSlice from server
 */
export const fetchAuthRows = createAsyncThunk('data/fetchAuthRows', async () => {
   const response = fetch("/authWors");
});

/**
 * Service function used to generate password hash in client space
 * @param str   - string to hash
 * @param seed  - hashing seed
 * @return hash as string
 */
export function hashRowPassword(str: string, seed: number = 0x811c9dc5): string{
    let h = seed;

    for (let i = 0; i < str.length; i++){
        h ^= str.charCodeAt(i);
        h += (h<<1) + (h<<4) + (h<<7) + (h<<8)
    }

    return (Math.abs(h>>0).toString(16));
}