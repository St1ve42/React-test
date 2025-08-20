import {configureStore} from "@reduxjs/toolkit";
import {transitionalSlice} from "./slices/transitionalSlice.ts";

export const store = configureStore({
    reducer: {
       transitionalSlice: transitionalSlice.reducer
    }
});