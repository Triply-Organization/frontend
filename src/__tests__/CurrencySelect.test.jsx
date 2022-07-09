import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import CurrencySelect from '../components/CurrencySelect/CurrencySelect';

describe('component/CurrencySelect', () => {
  test('render correctly', () => {
    expect(
      render(
        <BrowserRouter>
          <CurrencySelect />
        </BrowserRouter>,
      ),
    ).toMatchSnapshot();
  });
});
