/**
 * Storage Slice used to manage row-data for Bodygrid Table
 */

//*module
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
//*local
import {RootState} from "@data/storage";
import {hashRowPassword, asyncAuthRowAdd} from "@data/DataSlice/DataSlice.impl";


// An interface any object stored in DataSlice must implement
export interface IDataTableAuthRow {
    email: string,
    password: string,
    gender: 'M' | 'F' | '?',
    hashed?: string,
    timestamp: string,
}

// An interface DataSlice's state promises to implement
export interface IDataSliceState {
    rows: Array<IDataTableAuthRow>,
    columns: Array<IDataTableColumn>,
    metacolumns: Array<IDataTableMetacolumn>
    status: 'ready' | 'loading' | 'failed',
    error: string | null,
}

// An interface any metadata about stored objects' properties (columns for table) will implement
export interface IDataTableMetacolumn{
    column_name: string,
    input_type: "text" | "email" | "password" | "select" | "date"
    required?: boolean,
    allowed?: Array<string>,
    auto_assigned?: boolean,
}

// An interface any info-data of stored object's properties (columns for table) will implement
export interface IDataTableColumn{
    name: string,
    title: string
}

// Reducer for dispatch that will add new row asynchronically
export const authRowAddAsync = createAsyncThunk(
    'DataSlice/authRowAdd',
    async (row: IDataTableAuthRow) => {
        const response = await asyncAuthRowAdd(row);
        return response.data;
    }
)

// Initial state of DataSlice
const initialState: IDataSliceState = {
    rows: [],
    columns: [
        {name: 'email', title: 'E-mail'},
        {name: 'gender', title: 'I am...'},
        {name: 'password', title: 'Secret pass!'},
        {name: 'hashed', title: 'Stored pass'},
        {name: 'timestamp', title: 'Created at (Unix)'},
    ],
    metacolumns: [
        {column_name: 'email', required: true, input_type: 'email'},
        {column_name: 'gender', required: true, input_type: 'select' ,allowed: ["M", "F", "?"]},
        {column_name: 'password', required: true, input_type: 'password'},
        {column_name: 'hashed', auto_assigned: true, input_type: 'text'},
        {column_name: 'timestamp', input_type: "date"}
    ],
    status: 'ready',
    error: null
}

//DataSlice
const DataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        authRowAdded: (state, action: PayloadAction<IDataTableAuthRow>) => {
            let payload = action.payload;
            payload.hashed = (payload.hashed) ? payload.hashed : hashRowPassword(payload.password);
            payload.timestamp = (payload.timestamp) ? payload.timestamp: Date.now().toString();
            state.rows.push(payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authRowAddAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(authRowAddAsync.fulfilled, (state, action) => {
                state.status = 'ready';
                state.rows.push(action.payload);
            })
            .addCase(authRowAddAsync.rejected, (state) => {
                state.status = 'failed';
            })
    }
});

// Add row to DataSlice directly without fakey async
export const {authRowAdded} = DataSlice.actions;
// DataSlice state of stored objects
export const authRows = (state: RootState) => state.datarows.rows;
// DataSlice state of objects' field definitions (columns for table)
export const authColumns = (state: RootState) => state.datarows.columns;
// DataSlice state of metadata about columns
export const authMetacolumns = (state: RootState) => state.datarows.metacolumns;
// DataSlice state of async row append process
export const authDataStatus = (state: RootState) => state.datarows.status;
// DataSlice main accessor
export default DataSlice.reducer;