import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../config/store';
import AppState from '../../types/AppState';

const initialState: AppState = {
  isStartingUp: true,
  startupError: undefined,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    startupBegin: (state) => {
      state.isStartingUp = true;
      state.startupError = undefined;
    },
    startupFailure: (state, action: PayloadAction<string>) => {
      state.isStartingUp = false;
      state.startupError = action.payload;
    },
    startupSuccess: (state) => {
      state.isStartingUp = false;
      state.startupError = undefined;
    },
  },
});

export const {
  startupBegin,
  startupFailure,
  startupSuccess,
} = appSlice.actions;

export default appSlice.reducer;

export const getIsStartingUp = (state: RootState) => state.app.isStartingUp;
export const getStartupError = (state: RootState) => state.app.startupError;
