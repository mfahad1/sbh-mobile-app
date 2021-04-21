import { SerializedError } from '../../../redux/rootReducer';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getQuotes, Params, QuotesList, Quote } from '../../../services/quotes';

const GET_QUOTES = 'history/GET_QUOTES';

export const getQuotesAction = createAsyncThunk(GET_QUOTES, (params: Params = { max: 10, page: 1 }) => {
  return getQuotes(params);
});

const initialQuotes = {
  quote_today: null,
  quote_collection: [],
  page: 1,
};

const initialState = {
  quotes: initialQuotes,
  activeQuote: null,
  loading: false,
  error: null,
} as {
  quotes: QuotesList;
  activeQuote: Quote | null;
  loading: boolean;
  error: null | SerializedError;
};

const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    reset: () => initialState,
    setActiveQuote: (state, action: PayloadAction<{ id: string }>) => {
      const {
        quotes: { quote_collection },
      } = state;

      state.activeQuote = quote_collection.find((quote) => quote.id === action.payload.id) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuotesAction.fulfilled, (state, action) => {
        const { page, quote_today, quote_collection } = action.payload;
        state.quotes = { page, quote_today, quote_collection: [...state.quotes.quote_collection, ...quote_collection] };
        state.loading = false;
      })
      .addCase(getQuotesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getQuotesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.quotes = initialQuotes;
      });
  },
});

export default quotesSlice.reducer;
export const { reset, setActiveQuote } = quotesSlice.actions;
