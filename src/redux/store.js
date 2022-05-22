import { configureStore } from '@reduxjs/toolkit';
import { modalSlice } from '../components/Modal/modalSlice';
import formSlice from './formSlice';
import productSlice from './productSlice';
import paginationSlice from './paginationSlice';
import userSlice from './userSlice';
import cartSlice from './cartSlice';

const store = configureStore({
    reducer: {
        modal: modalSlice.reducer,
        form: formSlice.reducer,
        products: productSlice.reducer,
        pages: paginationSlice.reducer,
        user: userSlice.reducer,
        carts: cartSlice.reducer,
    }
});

export default store;