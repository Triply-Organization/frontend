import {
  act,
  fireEvent,
  getByText,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe } from 'vitest';

import Header from '../components/Header/';

describe('Header component', () => {
  it('should render correctly', () => {
    const result = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    expect(result).toMatchSnapshot();
  });
});
