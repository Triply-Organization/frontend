import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
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

  test('should correctly finish', () => {
    const ctn = render(
      <Router>
        <Footer />
      </Router>,
    );

    const form = ctn.queryByTestId('footer_form');
    const input = ctn.queryByTestId('footer-input');

    // console.log(input);
    expect(form).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'gg@gmail.com' } });
    expect(input.value).toBe('gg@gmail.com');
    fireEvent.submit(form);

    // fireEvent.submit(submit);
  });
});
