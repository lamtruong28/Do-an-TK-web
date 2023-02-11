import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../API";

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
                state.products = action.payload.filter(product => state.type === 'all' ? product : product.prodTypeCode === state.type);
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
    const res = await api.get(`/products/getAllProduct.php`);
    return res.data
});
export const addProduct = createAsyncThunk('products/addProduct', async (payload) => {
    const res = await api.post(`/products/uploads.php`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    payload['image'] = res.data;
    const response = await api.post(`/products/addProduct.php`, payload);
    return response.data
});

export const destroyProduct = createAsyncThunk('products/destroyPost', async (id) => {
    await api.post(`/products/destroyProduct.php`, { prodCode: id });
});

export const editProduct = createAsyncThunk('products/editProduct', async (payload) => {
    if (payload.isChangeImage) {
        const res = await api.post(`/products/uploads.php`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        payload['image'] = res.data;
    }
    const response = await api.post(`/products/updateProduct.php`, payload);
    return response.data;
});

export const UpdateProdSold = createAsyncThunk('products/UpdateProdSold', async (payload) => {
    const res = await api.post(`/products/updateSold.php`, payload);
    return res.data;
});

export default productSlice;