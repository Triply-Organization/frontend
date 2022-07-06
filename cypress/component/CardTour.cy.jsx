/* eslint-disable no-undef */
import React from 'react';

import CardTour from '../../src/components/CardTour/CardTour';

describe('component/CardTour', () => {
  beforeEach(() => {
    cy.viewport(1200, 700);
  });

  it('should render without crashing', () => {
    const tour = {
      image:
        'https://th.bing.com/th/id/R.85bf34eb56fd55acc5a397ae570f923c?rik=I18Z9x9jMcnmjA&pid=ImgRaw&r=0&sres=1&sresct=1',
      name: 'asd',
      duration: 4,
      maxPeople: 1,
      tourDestination: 'a',
      id: 1,
    };
    cy.mount(<CardTour tour={tour} />);
  });
});
