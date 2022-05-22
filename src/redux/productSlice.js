import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
const URL_DB = 'http://localhost:8080/products';

const productSlice = createSlice({
    name: 'products',
    initialState: {
        status: 'idle',
        products: [],
        type: 'all',
        error: false,
    },
    reducers: {
        setType: (state, action) => {
            state.type = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = 'loading';
                state.error = false;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload.filter(product => state.type === 'all' ? product : product.type === state.type);
                state.status = 'idle';
                state.error = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'idle';
                state.error = true;
            })
            .addCase(addProduct.pending, (state, action) => {
                state.status = 'loading';
                state.error = false;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
                state.status = 'idle';
                state.error = false;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.status = 'idle';
                state.error = true;

            })
            .addCase(editProduct.pending, (state, action) => {
                state.status = 'loading';
                state.error = false;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.status = 'idle';
                state.error = false;
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.status = 'idle';
                state.error = true;
            })
    }
});

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const res = await axios.get(`${URL_DB}`);
    return res.data
});
export const addProduct = createAsyncThunk('products/addProduct', async (payload) => {
    const res = await axios.post(`${URL_DB}`, payload);
    return res.data
});

export const destroyProduct = createAsyncThunk('products/destroyPost', async (id) => {
    await axios.delete(`${URL_DB}/${id}`);
});

export const editProduct = createAsyncThunk('products/editProduct', async (payload) => {
    const id = payload.productId || payload.id;
    const res = await axios.put(`${URL_DB}/${id}`, payload);
    return res.data;
});

export default productSlice;