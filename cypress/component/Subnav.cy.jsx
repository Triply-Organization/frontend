/* eslint-disable no-undef */
import React from 'react';

import Subnav from '../../src/components/Header/Navbar/Subnav';

describe('component/Header', () => {
  beforeEach(() => {
    cy.viewport(1200, 700);
  });

  it('should render without crashing', () => {
    const subnavItem = ['subnav 1', 'subnav 2', 'subnav 3'];
    cy.mount(<Subnav subnavItem={subnavItem} />);
  });
});
