import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import ImageBreadcrumb from '../components/ImageBreadcrumb/ImageBreadcrumb';

describe('component/ImageBreadcrumb', () => {
  test('render correctly', () => {
    expect(
      render(
        <BrowserRouter>
          <ImageBreadcrumb />
        </BrowserRouter>,
      ),
    ).toMatchSnapshot();
  });
});
