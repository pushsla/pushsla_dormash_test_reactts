import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@data/storage";
import {Table, PagingPanel, GroupingPanel} from "@devexpress/dx-react-grid";

export interface LocaleSlicePieces{
    Bodygrid: {
        tableMessages: Table.LocalizationMessages,
        groupingPanelMessages: GroupingPanel.LocalizationMessages,
        pagingPanelMessages: PagingPanel.LocalizationMessages
    },
    Common: {
        addMessage: string,
    }
}

export interface LocaleSliceState {
    pieces: LocaleSlicePieces
}

const initialState: LocaleSliceState = {
    pieces: {
        Bodygrid: {
            tableMessages: {
              noData: 'Пусто :)',
            },
            groupingPanelMessages: {
              groupByColumn: 'Перетащите столбец, чтобы выполнить группировку',
            },
            pagingPanelMessages: {
              showAll: 'Все',
              rowsPerPage: 'Строк на странице',
              info: () => '',
            },
        },
        Common: {
            addMessage: "Добавить"
        }
    }
}


const LocaleSlice = createSlice({
    name: 'locale',
    initialState,
    reducers: {}
})

export const localeStruct = (state: RootState) => state.locale.pieces;
export default LocaleSlice.reducer;