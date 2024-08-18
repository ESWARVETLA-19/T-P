import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
    name: 'user',
    initialState: {
        users: null,
    },
    reducers: {
        login: (state, action) => {
            state.users = action.payload;
        },
        logout: (state) => {
            state.users = null;
        },
    },
});

export const { login, logout } = appSlice.actions;
export default appSlice.reducer;
