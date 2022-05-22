import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10)
import { rememberUser } from '../services';

const URL_DB = 'http://localhost:8080/users';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: {},
        users: [],
    },
    reducers: {
        setInfoUser: (state, action) => {
            state.currentUser = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
    }
});

export const addNewUser = createAsyncThunk('user/addNewUser', async (payload) => {
    payload.password = bcrypt.hashSync(payload.password, salt);
    const res = await axios.post(`${URL_DB}`, payload);
    return res.data
});

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const res = await axios.get(`${URL_DB}`);
    return res.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, password }) => {
    password = bcrypt.hashSync(password, salt);
    const res = await axios.patch(`${URL_DB}/${id}`, { password });
    return res.data;
});

export const handleLogin = ({ users, userName, password }) => {
    const res = users.find(user => (user.userName === userName && bcrypt.compareSync(password, user.password)));
    res && rememberUser({ id: res.id, userName: res.userName });
    return res
};
export const checkEistsUser = ({ users, userName }) => {
    const res = users.find(user => (user.userName === userName));
    return res;
};
export const checkPassword = ({ users, id, password }) => {
    const res = users.find(user => user.id === id);
    if (res) {
        return bcrypt.compareSync(password, res.password);
    } else return false;
}

export default userSlice;