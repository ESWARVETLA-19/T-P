import { createSlice } from '@reduxjs/toolkit';

const jobApplicationSlice = createSlice({
  name: 'jobApplications',
  initialState: JSON.parse(localStorage.getItem('jobApplications')) || {},
  reducers: {
    applyForJob: (state, action) => {
      const { jobId } = action.payload;
      state[jobId] = true; 
      localStorage.setItem('jobApplications', JSON.stringify(state)); 
    },
    setJobApplications: (state, action) => {
      return action.payload;
    },
  },
});

export const { applyForJob, setJobApplications } = jobApplicationSlice.actions;
export default jobApplicationSlice.reducer;
