/* eslint-disable no-undef */
import React from 'react';

import Footer from '../../src/components/Footer';

describe('component/footer', () => {
  beforeEach(() => {
    cy.viewport(1200, 700);
  });

  it('should render without crashing', () => {
    cy.mount(<Footer />);
  });
});
