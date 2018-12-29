import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from './actions';

import createReducer from '../createReducer';

const initialState = {
  user: {},
  isLoggingInUser: false,
  loginUserErrorMessage: '',
};

export const blacklistKeys = [
  'isLoggingInUser',
  'loginUserErrorMessage',
];

const actionHandlers = {
  [LOGIN_USER]: state => ({
    ...state,
    isLoggingInUser: true,
  }),
  [LOGIN_USER_SUCCESS]: (state, { payload }) => ({
    ...state,
    isLoggingInUser: false,
    user: {
      ...state.user,
      ...payload,
    },
  }),
  [LOGIN_USER_FAILURE]: (state, { payload }) => ({
    ...state,
    isLoggingInUser: false,
    loginUserErrorMessage: payload,
  }),
};

export default createReducer(initialState, actionHandlers);
