import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import CardVoucher from '../components/CardVoucher/CardVoucher';

describe('component/CardVoucher', () => {
  test('render correctly', () => {
    expect(
      render(
        <BrowserRouter>
          <CardVoucher />
        </BrowserRouter>,
      ),
    ).toMatchSnapshot();
  });
});
