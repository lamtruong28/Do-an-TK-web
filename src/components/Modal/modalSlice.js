import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isShow: false
    },
    reducers: {
        openModal: (state) => {
            state.isShow = true;
        },
        closeModal: (state) => {
            state.isShow = false;
        },
    }
});