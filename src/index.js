import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import App from './App/index';
import * as serviceWorker from './serviceWorker';
import combineReducers from './store/reducer/index';
import config from './properties';

import './aws.js';

import dotenv from 'dotenv';
dotenv.config();

const store = createStore(
  combineReducers(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const app = (
  <SnackbarProvider>
    <Provider store={store}>
      <BrowserRouter basename={config.basename}>
        {/* basename="/datta-able" */}
        <App />
      </BrowserRouter>
    </Provider>
  </SnackbarProvider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
