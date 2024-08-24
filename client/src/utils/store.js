import { configureStore } from '@reduxjs/toolkit';
import user from './user';
import dataReducer from './data';
const store = configureStore({
    reducer: {
        user : user,
        data : dataReducer,
    },
});
export default store;