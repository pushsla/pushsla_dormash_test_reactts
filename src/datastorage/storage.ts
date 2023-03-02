//*module
import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
//*local
import dataSliceReducer from "@data/DataSlice/DataSlice";
import localeSliceReducer from "@data/LocaleSlice/LocaleSlice"


// Main singletone application storage
export const Storage = configureStore({
    reducer:{
        datarows: dataSliceReducer,
        locale: localeSliceReducer,
    }
});

// typescripted type definitions to use Storage with .ts/.tsx
export type RootState = ReturnType<typeof Storage.getState>;
export type AppDispatch = typeof Storage.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;