import { combineReducers } from 'redux';

import propReducer from '../reducer.js';
import authReducer from './auth.js';
import commonReducer from './common.js';

export default () => {
  const appReducer = combineReducers({
    auth: authReducer,
    common: commonReducer,
    properties: propReducer,
  });

  return appReducer;
};
