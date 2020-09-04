import { mockState, mockStore } from '../../utils/testUtils';
import NavigationState from '../../types/NavigationState';
import reducer, { getAllowBackNavigation } from './navigationSlice';

describe('Navigation synchronous actions', () => {
  it('should allow back navigation', () => {
    const state: NavigationState = {
      ...mockState.navigation,
      allowBackNavigation: false,
    };

    const makeAction = (pathname: string) => {
      return {
        payload: {
          location: {
            pathname,
          },
        },
        type: '@@router/LOCATION_CHANGE',
      };
    };

    const expected = {
      ...state,
      allowBackNavigation: true,
    };

    expect(reducer(state, makeAction('/preferences'))).toEqual(expected);
    expect(reducer(state, makeAction('/pinnedthreads'))).toEqual(expected);
    expect(reducer(state, makeAction('/thread'))).toEqual(expected);
  });

  it('should not allow back navigation', () => {
    const state: NavigationState = {
      ...mockState.navigation,
      allowBackNavigation: true,
    };

    const makeAction = (pathname: string) => {
      return {
        payload: {
          location: {
            pathname,
          },
        },
        type: '@@router/LOCATION_CHANGE',
      };
    };

    const expected = {
      ...state,
      allowBackNavigation: false,
    };

    expect(reducer(state, makeAction('/chatty'))).toEqual(expected);
  });
});

describe('Navigation selectors', () => {
  it('should return allow back navigation', () => {
    const store = mockStore({
      ...mockState,
      navigation: {
        ...mockState.navigation,
        allowBackNavigation: true,
      },
    });
    expect(getAllowBackNavigation(store.getState())).toEqual(true);
  });
});
