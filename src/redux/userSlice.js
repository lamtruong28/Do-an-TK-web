import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import bcrypt from 'bcryptjs';
import { api } from '../API';
const salt = bcrypt.genSaltSync(10)
import { rememberUser } from '../services';

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
    const res = await api.post(`/users/signup.php`, payload);
    return res.data
});

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    // const res = await axios.get(`${URL_DB}/getAllUser.php`);
    // return res.data;
});

export const fetchUser = createAsyncThunk('users/fetchUser', async (payload) => {
    const res = await api.post(`/users/signin.php`, payload);
    res && rememberUser({ id: res.data.ID, userName: res.data.userName });
    return res.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async (payload) => {
    const res = await api.post(`/users/forgotPass.php`, payload);
    return res.data;
});

export const updatePass = createAsyncThunk('users/updatePass', async (payload) => {
    const res = await api.post(`/users/changePass.php`, payload);
    return res.data;
});


export const handleLogin = ({ users, userName, password }) => {
    // const res = users.find(user => (user.userName === userName && bcrypt.compareSync(password, user.password)));
    // res && rememberUser({ id: res.id, userName: res.userName });
    // return res
};
export const checkEistsUser = ({ users, userName }) => {
    // const res = users.find(user => (user.userName === userName));
    // return res;
};
export const checkPassword = ({ users, id, password }) => {
    // const res = users.find(user => user.id === id);
    // if (res) {
    //     return bcrypt.compareSync(password, res.password);
    // } else return false;
}

export default userSlice;