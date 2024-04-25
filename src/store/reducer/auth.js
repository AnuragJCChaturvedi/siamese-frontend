import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  TOKEN_VALIDATE_SUCCESS,
} from '../constant';

const INIT_STATE = {
  loader: false,
  authUser: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload,
      };
    }
    default:
      return state;
  }
};
