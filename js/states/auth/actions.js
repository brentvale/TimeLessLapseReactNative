export const LOGIN_USER = 'auth/LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'auth/LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'auth/LOGIN_USER_FAILURE';

export const loginUser = () => async dispatch => {
  dispatch({ type: LOGIN_USER });
  try {
    setTimeout(() => {
      dispatch({ type: LOGIN_USER_SUCCESS, payload: tempUser });
    }, 400);
  } catch (e) {
    dispatch({ type: LOGIN_USER_FAILURE, payload: 'unable to login user' });
  }
};

const tempUser = {
  id: 1,
  first_name: 'Brent',
  last_name: 'Vale',
};
