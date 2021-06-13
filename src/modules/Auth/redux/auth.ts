import { SerializedError } from './../../../redux/rootReducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginRequest, LoginResponse, loginService } from '../../../services/login';
import localStorageService from '../../../common/localStorage';

const LOGIN = 'auth/LOGIN';

export const loginAction = createAsyncThunk(LOGIN, async (loginPayload: LoginRequest) => {
  return loginService(loginPayload);
});

const initialLoginState: LoginResponse = {
  app_detail_Id: '',
  days_sober: 0,
  first_login: false,
  success: false,
};

const initialState = {
  login: initialLoginState,
  loading: false,
  error: null,
} as {
  login: LoginResponse;
  loading: boolean;
  error: null | SerializedError;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.fulfilled, (state, action) => {
        state.error = null;
        state.login = action.payload;
        localStorageService.set('Id', state.login.app_detail_Id);
        state.loading = false;
      })
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.login = initialLoginState;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.login = initialLoginState;
      });
  },
});

export default authSlice.reducer;
export const { reset } = authSlice.actions;
