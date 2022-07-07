import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.scss';
import RoutesApp from './Route/RoutesApp';
import { store } from './app/store';
import './translation';

function App() {
  {
    !localStorage.getItem('currencyString')
      ? localStorage.setItem('currencyString', 'en-US')
      : localStorage.getItem('currencyString');
  }

  {
    !localStorage.getItem('currencyItem')
      ? localStorage.setItem('currencyItem', 'USD')
      : localStorage.getItem('currencyItem');
  }
  return (
    <Provider store={store}>
      <Router>
        <RoutesApp />
      </Router>
    </Provider>
  );
}

export default App;
