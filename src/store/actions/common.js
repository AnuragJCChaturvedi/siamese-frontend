import { SET_LOADER, UNSET_LOADER } from '../constant';

export const setLoader = () => ({
  type: SET_LOADER,
  payload: true,
});

export const unsetLoader = () => ({
  type: UNSET_LOADER,
  payload: null,
});
