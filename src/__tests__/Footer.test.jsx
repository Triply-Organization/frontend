import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import Footer from '../components/Footer/Footer';

describe('component/Footer', () => {
  test('render correctly', () => {
    expect(
      render(
        <Router>
          <Footer />
        </Router>,
      ),
    ).toMatchSnapshot();
  });
});
