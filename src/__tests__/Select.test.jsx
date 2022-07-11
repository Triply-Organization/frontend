import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import Select from '../components/Select/SelectCustom';

describe('component/Select', () => {
  test('render correctly', () => {
    expect(
      render(
        <BrowserRouter>
          <Select />
        </BrowserRouter>,
      ),
    ).toMatchSnapshot();
  });
});
