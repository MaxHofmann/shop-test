import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './scss/index.scss';

import { Provider, initialState, reducer, actions } from './store';
import App from './App.jsx';

ReactDOM.render(
  <Provider initialState={initialState} reducer={reducer} actions={actions}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
