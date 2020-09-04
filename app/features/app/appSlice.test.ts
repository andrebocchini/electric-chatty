import reducer, {
  getIsStartingUp,
  startupBegin,
  startupFailure,
  startupSuccess,
} from './appSlice';
import { mockState, mockStore } from '../../utils/testUtils';

describe('App synchronous actions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should handle startupBegin', () => {
    expect(startupBegin()).toEqual({
      payload: undefined,
      type: startupBegin.type,
    });

    const state = {
      ...mockState.app,
      isStartingUp: false,
      startupError: 'error',
    };
    expect(reducer(state, startupBegin)).toEqual({
      ...state,
      isStartingUp: true,
      startupError: undefined,
    });
  });

  it('should handle startupFailure', () => {
    const payload = 'error';
    expect(startupFailure(payload)).toEqual({
      payload,
      type: startupFailure.type,
    });

    const state = {
      ...mockState.app,
      isStartingUp: true,
      startupError: undefined,
    };
    expect(reducer(state, startupFailure(payload))).toEqual({
      ...state,
      isStartingUp: false,
      startupError: payload,
    });
  });

  it('should handle startupSuccess', () => {
    expect(startupSuccess()).toEqual({
      payload: undefined,
      type: startupSuccess.type,
    });

    const state = {
      ...mockState.app,
      isStartingUp: true,
      startupError: undefined,
    };
    expect(reducer(state, startupSuccess())).toEqual({
      ...state,
      isStartingUp: false,
      startupError: undefined,
    });
  });
});

describe('App selectors', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return is starting up', () => {
    const store = mockStore({
      ...mockState,
      app: {
        ...mockState.app,
        isStartingUp: true,
      },
    });

    expect(getIsStartingUp(store.getState())).toBeTruthy();
  });
});
