import { SerializedError } from '../../../redux/rootReducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sobrietyCheck, SobrietyCheckRequest } from '../../../services/sobriety';
import { getUser, UserType } from '../../../services/login';

const SOBRIETY_CHECK = 'counter/SOBRIETY_CHECK';
const GET_USER = 'counter/GET_USER';

export const sobrietyCheckAction = createAsyncThunk(SOBRIETY_CHECK, (loginPayload: SobrietyCheckRequest) => {
  return sobrietyCheck(loginPayload);
});

export const getUserAction = createAsyncThunk(GET_USER, () => {
  return getUser();
});

const initialUser = {
  success: false,
  isEditable: false,
  inTake: false,
  days_sober: 0,
  app_detail_Id: '',
};

const initialState = {
  success: false,
  loading: false,
  error: null,
  user: initialUser,
} as {
  success: boolean;
  loading: boolean;
  error: null | SerializedError;
  user: Partial<UserType>;
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sobrietyCheckAction.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.loading = false;
      })
      .addCase(sobrietyCheckAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(sobrietyCheckAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.success = false;
      })
      .addCase(getUserAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default counterSlice.reducer;
export const { reset } = counterSlice.actions;
