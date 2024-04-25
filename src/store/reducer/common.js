import { SET_LOADER, UNSET_LOADER } from '../constant';

const INIT_STATE = {
  loader: true,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_LOADER: {
      return {
        ...state,
        loader: true,
      };
    }
    case UNSET_LOADER: {
      return {
        ...state,
        loader: false,
      };
    }
    default:
      return state;
  }
};
