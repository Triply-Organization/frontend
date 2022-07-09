import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import CardTour from '../components/CardTour/CardTour';

describe('component/CardTour', () => {
  test('render correctly', () => {
    expect(
      render(
        <BrowserRouter>
          <CardTour />
        </BrowserRouter>,
      ),
    ).toMatchSnapshot();
  });
});
