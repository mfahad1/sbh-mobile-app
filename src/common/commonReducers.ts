import { createSlice } from '@reduxjs/toolkit';

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    apiLoading: false,
  },
  reducers: {
    apiLoaderToggle: (state) => {
      state.apiLoading = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { apiLoaderToggle } = commonSlice.actions;

export default commonSlice.reducer;
