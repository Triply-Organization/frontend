import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.scss';
import RoutesApp from './Route/RoutesApp';
import { store } from './app/store';
import './translation';

function App() {
  localStorage.setItem('currencyString', 'en-US');
  localStorage.setItem('currencyItem', 'USD');
  return (
    <Provider store={store}>
      <Router>
        <RoutesApp />
      </Router>
    </Provider>
  );
}

export default App;
