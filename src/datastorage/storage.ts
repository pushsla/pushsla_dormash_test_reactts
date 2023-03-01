import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import dataSliceReducer from "@data/DataSlice/DataSlice";


export const Storage = configureStore({
    reducer:{
        datarows: dataSliceReducer,
    }
});

export type RootState = ReturnType<typeof Storage.getState>;
export type AppDispatch = typeof Storage.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;