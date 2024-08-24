import { createSlice } from '@reduxjs/toolkit';

const data = createSlice({
  name: 'data',
  initialState: {
    formDataList: [],  
  },
  reducers: {
    addFormData: (state, action) => {
      state.formDataList.push(action.payload);  
    },
    clearFormData: (state) => {
      state.formDataList = [];  
    },
  },
});

export const { addFormData, clearFormData } = data.actions;
export default data.reducer;
