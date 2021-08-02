import { SerializedError } from '../../../redux/rootReducer';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getHistory, HistoryResponse, DailySobriety, getHistoryByInterval, HistoryByIntervalRequest } from '../../../services/history';
import { addDays, format, startOfWeek } from 'date-fns';

const GET_HISTORY = 'history/GET_HISTORY';

const GET_HISTORY_BY_INTERVAL = 'history/GET_HISTORY_BY_INTERVAL';

export enum IntervalShort {
  Month = 30,
  Week = 7,
}

export const getHistoryAction = createAsyncThunk(GET_HISTORY, () => {
  return getHistory();
});

export const getHistoryByIntervalAction = createAsyncThunk(GET_HISTORY_BY_INTERVAL, (params: Partial<HistoryByIntervalRequest>) => {
  return getHistoryByInterval(params);
});

const initialHistoryResponse: HistoryResponse = {
  daily_sobriety: [],
  streak: { current_checkin: null, longest_checkin: null },
  badges: [],
};

const initialState = {
  history: initialHistoryResponse,
  historyByInterval: [],
  activeHistory: null,
  loading: false,
  error: null,
  selectedDate: format(startOfWeek(new Date()), 'yyyy-MM-dd'),
  interval: IntervalShort.Week,
  historyDateMapped: {},
  historyDates: [],
} as {
  history: HistoryResponse;
  historyByInterval: DailySobriety[];
  activeHistory: DailySobriety | null;
  loading: boolean;
  error: null | SerializedError;
  selectedDate: string;
  interval: IntervalShort;
  historyDateMapped: { [key: string]: DailySobriety };
  historyDates: string[];
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    reset: () => initialState,
    setActiveHistory: (state, action: PayloadAction<{ data: DailySobriety }>) => {
      state.activeHistory = action.payload.data || null;
    },
    setInterval: (state, { payload: { interval } }: PayloadAction<{ interval: IntervalShort }>) => {
      state.interval = interval;
    },
    setSelectedDate: (state, { payload: { selectedDate } }: PayloadAction<{ selectedDate: string }>) => {
      state.selectedDate = selectedDate;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHistoryAction.fulfilled, (state, action) => {
        state.history = action.payload;
        state.loading = false;
      })
      .addCase(getHistoryAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHistoryAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.history = initialHistoryResponse;
      })
      .addCase(getHistoryByIntervalAction.fulfilled, (state, action) => {
        state.historyByInterval = action.payload;
        state.loading = false;
        const dateObject = new Date(state.selectedDate);
        state.historyDates = [0, 1, 2, 3, 4, 5, 6].map((num) => format(addDays(dateObject, num), 'yyyy-MM-dd'));
        state.historyDateMapped = state.historyDates.reduce<{ [key: string]: DailySobriety }>((acc, curr) => {
          const found = action.payload.find((history) => history.record_date === curr);

          acc[curr] = found || { record_date: curr, anxious: '0', craving: '0', depressed: '0', feeling: 'Neutral' };

          return acc;
        }, {});
      })
      .addCase(getHistoryByIntervalAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHistoryByIntervalAction.rejected, (state, action) => {

        state.loading = false;
        state.error = action.error;
        state.historyByInterval = [];
      });
  },
});

export default historySlice.reducer;
export const { reset, setActiveHistory, setInterval, setSelectedDate } = historySlice.actions;
