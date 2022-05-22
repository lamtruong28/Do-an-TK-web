import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL_DB = 'http://localhost:8080/carts';
const cartSlice = createSlice({
    name: 'carts',
    initialState: {
        quantityOrder: 1,
        cartList: []
    },
    reducers: {
        changeQuantity: (state, action) => {
            state.quantityOrder = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCarts.fulfilled, (state, action) => {
                state.cartList = [...action.payload];
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cartList.push(action.payload);
            })
            .addCase(destroyCart.fulfilled, (state, action) => {
                state.cartList = state.cartList.filter(item => item.id !== action.payload);
            })
    }
});

export const fetchCarts = createAsyncThunk('carts/fetchCarts', async (userId) => {
    const res = await axios.get(`${URL_DB}`);
    const data = res.data.filter(item => item.userId === userId);
    return data;
})

export const addToCart = createAsyncThunk('carts/addToCart', async (payload) => {
    const res = await axios.post(`${URL_DB}`, { ...payload });
    return res.data;
});

export const destroyCart = createAsyncThunk('carts/destroyCart', async (id) => {
    await axios.delete(`${URL_DB}/${id}`);
    return id;
});

export default cartSlice;