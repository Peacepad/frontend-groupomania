import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import rootReducer from './reducers';


//dev
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk))
)


ReactDOM.render(
  <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);


