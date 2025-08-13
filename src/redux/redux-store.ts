import {configureStore} from "@reduxjs/toolkit";
import {opacitySlice} from "./slices/opacity.slice.ts";

export const store = configureStore({
    reducer: {
       opacitySlice: opacitySlice.reducer
    }
});