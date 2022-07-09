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

import MobileNav from '../components/Header/MobileNav';

describe('MobileNav component', () => {
  it('should render correctly', () => {
    const result = render(
      <BrowserRouter>
        <MobileNav />
      </BrowserRouter>,
    );
    expect(result).toMatchSnapshot();
  });
});
