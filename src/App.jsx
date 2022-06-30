import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.scss';
import RoutesApp from './Route/RoutesApp';
import { store } from './app/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <RoutesApp />
      </Router>
    </Provider>
  );
}

export default App;
