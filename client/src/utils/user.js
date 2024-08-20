import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: JSON.parse(localStorage.getItem('users')) || null,
};

const appSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.users = action.payload;
            localStorage.setItem('users', JSON.stringify(state.users));
        },
        logout: (state) => {
            state.users = null;
            localStorage.removeItem('users');
        },
        isStudent: (state) => {
            state.users = { ...state.users, isStudent: true };
            localStorage.setItem('users', JSON.stringify(state.users));
        },
    },
});

export const { login, logout } = appSlice.actions;
export default appSlice.reducer;
