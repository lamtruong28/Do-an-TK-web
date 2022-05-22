import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
    name: 'form',
    initialState: {
        typeForm: '',
        dataPayload: {},
    },
    reducers: {
        showAddNewForm: (state) => { state.typeForm = 'addNew' },
        showEditForm: (state, action) => {
            state.typeForm = 'edit';
        },
        dataEditFormPayload: (state, action) => {
            state.dataPayload = action.payload;
        }
    }
});

export default formSlice;