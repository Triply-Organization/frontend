import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import ModalForm from '../components/ModalForm/ModalForm';

describe('component/ModalForm', () => {
  test('render correctly', () => {
    expect(
      render(
        <BrowserRouter>
          <ModalForm />
        </BrowserRouter>,
      ),
    ).toMatchSnapshot();
  });
});
