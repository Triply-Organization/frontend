/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';

import CardTour from '../components/CardTour/CardTour';

it('should render without crashing', () => {
  ReactDOM.render(<CardTour />, document.createElement('div'));
});
