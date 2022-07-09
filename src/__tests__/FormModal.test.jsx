import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import FormModal from '../components/FormModal/FormModal';

describe('component/FormModal', () => {
  test('render correctly', () => {
    expect(
      render(
        <BrowserRouter>
          <FormModal />
        </BrowserRouter>,
      ),
    ).toMatchSnapshot();
  });
});
