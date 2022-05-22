import { createSlice } from "@reduxjs/toolkit";
export const SIZE_PAGE = 15;
const paginationSlice = createSlice({
    name: 'pages',
    initialState: {
        beginPoint: 0,
        endPoint: SIZE_PAGE,
        page: 1,
        first: true,
        last: false,
    },
    reducers: {
        nextPage: (state, action) => {
            if (state.page === action.payload) {
                state.last = true;
                return;
            }
            state.first = false;
            state.beginPoint = state.endPoint;
            state.endPoint = state.endPoint + SIZE_PAGE;
            state.page = state.endPoint / SIZE_PAGE;
            state.page === action.payload && (state.last = true)
        },
        prevPage: (state) => {
            if (state.page === 1) {
                state.first = true;
                return;
            }
            state.last = false;
            state.beginPoint = state.beginPoint - SIZE_PAGE;
            state.endPoint = state.endPoint - SIZE_PAGE;
            state.page = state.endPoint / SIZE_PAGE;
            state.page === 1 && (state.first = true);
        },
        resetState: (state, action) => {
            state.beginPoint = 0;
            state.endPoint = SIZE_PAGE;
            state.page = 1;
            state.first = true;
            state.last = (action.payload === 1 || action.payload === 0) ? true : false;
        }
    }
});

export default paginationSlice;