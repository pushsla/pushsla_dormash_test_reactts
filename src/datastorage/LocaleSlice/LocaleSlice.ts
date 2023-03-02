/**
 * Storage Slice used to manage application localization
 */

//*module
import {createSlice} from "@reduxjs/toolkit";
import {Table, PagingPanel, GroupingPanel} from "@devexpress/dx-react-grid";
//*local
import {RootState} from "@data/storage";


// An interface LocalSlice localization data promises to implement
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

// An interface LocaleSlice state will implement
export interface LocaleSliceState {
    pieces: LocaleSlicePieces
}

// Initial state of LocaleSlice
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

// LocaleSlice
const LocaleSlice = createSlice({
    name: 'locale',
    initialState,
    reducers: {}
})

// LocaleSlice state for localization
export const localeSlice = (state: RootState) => state.locale.pieces;
// Main accessor to LocaleSlice
export default LocaleSlice.reducer;