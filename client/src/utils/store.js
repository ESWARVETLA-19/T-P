import { configureStore } from '@reduxjs/toolkit';
import user from './user';
import dataReducer from './data';
import jobApplicationReducer from './jobApplications';
const store = configureStore({
    reducer: {
        user : user,
        data : dataReducer,
        jobApplications: jobApplicationReducer,
    },
});
export default store;