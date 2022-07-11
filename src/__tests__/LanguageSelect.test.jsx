import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import LanguageSelect from '../components/LanguageSelect/LanguageSelect';

describe('component/LanguageSelect', () => {
  test('render correctly', () => {
    expect(
      render(
        <BrowserRouter>
          <LanguageSelect />
        </BrowserRouter>,
      ),
    ).toMatchSnapshot();
  });
});
