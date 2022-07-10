import {
  act,
  fireEvent,
  getByText,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import Header from '../components/Header/';

describe('Header component', () => {
  test('should render correctly', () => {
    const result = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    expect(result).toMatchSnapshot();
  });

  test('should correct header class name', () => {
    const ctn = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    const header = ctn.queryByTestId('header');

    expect(header).toBeInTheDocument();

    expect(header.className).toBe('header__wrapper');

    fireEvent.scroll(window, { target: { scrollY: 100 } });

    expect(header.className).toBe(
      'header__wrapper header__wrapper--transition',
    );
  });

  test('should correct activeTab', () => {
    const ctn = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
  });
});
