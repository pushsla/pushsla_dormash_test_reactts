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
    },
    Dialogs: {
        addDialog: {
            title: string,
            body: string,
            apply: string,
            decline: string,
        }
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
              info: (props) => `с ${props.from} по ${props.to} (всего ${props.count})`,
            },
        },
        Common: {
            addMessage: "Добавить"
        },
        Dialogs: {
            addDialog: {
                title: "Новая запись",
                body: "Добавить новую запись:",
                apply: "Ок",
                decline: "Отмена"
            }
        }
    }
}


const LocaleSlice = createSlice({
    name: 'locale',
    initialState,
    reducers: {}
})

export const localeSlice = (state: RootState) => state.locale.pieces;
export default LocaleSlice.reducer;