import { SerializedError } from '../../../redux/rootReducer';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChallengesResponse, Challenge, getChallenges, getGuides, Guide, GuidesResponse } from '../../../services/coach';
import { Params } from '../../../services/quotes';

const GUIDES = 'counter/GUIDES';
const CHALLENGES = 'counter/CHALLENGES';

export const getGuidesAction = createAsyncThunk(GUIDES, (params: Params = { max: 10, page: 1 }) => {
  console.log('hitting:::::');

  return getGuides(params);
});

export const getChallengesAction = createAsyncThunk(CHALLENGES, (params: Params = { max: 10, page: 1 }) => {
  console.log('hitting:::::');

  return getChallenges(params);
});

const initialGuidesResponse = {
  learn_collection: [],
  learn_primary: null,
  maxLimit: 0,
  page: 0,
};

const initialChallengesResponse = {
  challenges_collection: [],
  limit: 0,
  page: 0,
};

const initialState = {
  guides: initialGuidesResponse,
  activeGuide: null,
  challenges: initialChallengesResponse,
  activeChallenge: null,
  loading: false,
  error: null,
} as {
  guides: GuidesResponse;
  activeGuide: Guide | null;
  loading: boolean;
  error: null | SerializedError;
  challenges: ChallengesResponse;
  activeChallenge: null | Challenge;
};

const coachSlice = createSlice({
  name: 'coach',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    reset: () => initialState,
    setActiveGuide: (state, action: PayloadAction<{ id: string }>) => {
      const {
        guides: { learn_collection },
      } = state;

      console.log({ id11: state });

      state.activeGuide = learn_collection.find((guide) => guide.id === action.payload.id) || null;
    },
    setActiveChallenge: (state, action: PayloadAction<{ id: string }>) => {
      const {
        challenges: { challenges_collection },
      } = state;

      state.activeChallenge = challenges_collection.find((item) => item.id === action.payload.id) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGuidesAction.fulfilled, (state, action) => {
        const { page, maxLimit, learn_primary, learn_collection } = action.payload;
        state.guides = { page, maxLimit, learn_primary, learn_collection: [...state.guides.learn_collection, ...learn_collection] };
        state.loading = false;
      })
      .addCase(getGuidesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGuidesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      .addCase(getChallengesAction.fulfilled, (state, action) => {
        const { page, limit, challenges_collection } = action.payload;

        state.challenges = { page, limit, challenges_collection: [...state.challenges.challenges_collection, ...challenges_collection] };
        state.loading = false;
      })
      .addCase(getChallengesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChallengesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default coachSlice.reducer;
export const { reset, setActiveGuide, setActiveChallenge } = coachSlice.actions;
