import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@data/storage";
import {hashRowPassword, promiseAuthRowAdd} from "@data/DataSlice/DataSlice.impl";


export interface DataTableAuthRow{
    email: string,
    password: string,
    gender: 'M' | 'F' | '?',
    hashed?: string,
    timestamp?: string,
}

export interface DataSliceState{
    rows: Array<DataTableAuthRow>,
    selected_row_indxs: Array<Number>,
    status: 'ready' | 'loading' | 'failed'
}

export const DataTableAuthColumns = [
    {name: 'email', title: 'E-mail'},
    {name: 'gender', title: 'I am...'},
    {name: 'password', title: 'Secret pass!'},
    {name: 'hashed', title: 'Stored pass'},
    {name: 'timestamp', title: 'Created at (Unix)'},
];

export const authRowAddAsync = createAsyncThunk(
    'DataSlice/authRowAdd',
    async (row: DataTableAuthRow) => {
        const response = await promiseAuthRowAdd(row);
        return response.data;
    }
)

const initialState: DataSliceState = {
    rows: [
        {email:'fake@mymail.xyz', gender: 'M', password: 'mamba12', hashed:hashRowPassword('mamba12'), timestamp:Date.now().toString()},
        {email:'fox@furry.yiff', gender: 'F', password: 'sandbox', hashed:hashRowPassword('sandbox'), timestamp:Date.now().toString()},
        {email:'foxy1@furry.yiff', gender: '?', password: 'sandbox1', hashed:hashRowPassword('sandbox1'), timestamp:Date.now().toString()},
        {email:'foxy2@furry.yiff', gender: '?', password: 'sandbox2', hashed:hashRowPassword('sandbox2'), timestamp:Date.now().toString()},
        {email:'foxy3@furry.yiff', gender: 'F', password: 'sandbox3', hashed:hashRowPassword('sandbox3'), timestamp:Date.now().toString()},
        {email:'foxy4@furry.yiff', gender: 'M', password: 'sandbox4', hashed:hashRowPassword('sandbox4'), timestamp:Date.now().toString()},
    ],
    selected_row_indxs: [],
    status: 'ready'
}

const DataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        authRowAdd: (state, action: PayloadAction<DataTableAuthRow>) => {
            let payload = action.payload;
            payload.hashed = (payload.hashed) ? payload.hashed : hashRowPassword(payload.password);
            payload.timestamp = (payload.timestamp) ? payload.timestamp: Date.now().toString();
            state.rows.push(payload);
        },
        selectRow: (state, action: PayloadAction<Number>) => {
            if (action.payload < state.rows.length){
                state.selected_row_indxs.push(action.payload);
            }
        },
        deselectRow: (state, action: PayloadAction<Number>) => {
            state.selected_row_indxs = state.selected_row_indxs.filter(v => v !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authRowAddAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(authRowAddAsync.fulfilled, (state) => {
                state.status = 'ready';
            })
            .addCase(authRowAddAsync.rejected, (state) => {
                state.status = 'failed';
            })
    }
});

export const {authRowAdd, selectRow, deselectRow} = DataSlice.actions;
export const authRows = (state: RootState) => state.datarows.rows;
export default DataSlice.reducer;