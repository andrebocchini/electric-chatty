import { createSlice } from '@reduxjs/toolkit';
import NavigationState from '../../types/NavigationState';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../config/store';
import * as routes from '../../constants/routes';

const initialState: NavigationState = {
  allowBackNavigation: false,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {},
  extraReducers: {
    '@@router/LOCATION_CHANGE': (state, action) => {
      const { pathname } = action.payload.location;
      const backButtonEnabledRoutes = [
        routes.THREAD,
        routes.PINNED_THREADS,
        routes.PREFERENCES,
      ];
      if (backButtonEnabledRoutes.includes(pathname)) {
        state.allowBackNavigation = true;
      } else {
        state.allowBackNavigation = false;
      }
    },
  },
});

export default navigationSlice.reducer;

export const getAllowBackNavigation = (state: RootState) =>
  state.navigation.allowBackNavigation;
