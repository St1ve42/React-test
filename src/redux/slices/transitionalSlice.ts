import {createSlice} from "@reduxjs/toolkit";

const initialState: {opacity: string} = {opacity: ''}

export const transitionalSlice = createSlice({
    name: "opacity",
    initialState: initialState,
    reducers: {
        setOpacity: (state, action) => {
            state.opacity = action.payload
        },
    }
})