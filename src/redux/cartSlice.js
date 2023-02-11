import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../API";

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
            .addCase(destroyCart.fulfilled, (state, action) => {
                state.cartList = state.cartList.filter(item => item.id !== action.payload);
            })
    }
});

export const fetchCarts = createAsyncThunk('carts/fetchCarts', async (userId) => {
    const res = await api.post(`/carts/getCarts.php`, { ID: userId });
    return res.data;
})

export const addToCart = createAsyncThunk('carts/addToCart', async (payload) => {
    const res = await api.post(`/carts/addCart.php`, payload);
    return res.data;
});

export const destroyCart = createAsyncThunk('carts/destroyCart', async (id) => {
    const res = await api.post(`/carts/destroyCart.php`, { cartID: id });
    return res.data;
});

export default cartSlice;