import {
  act,
  fireEvent,
  getByText,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect } from 'vitest';

import MobileNav from '../components/Header/MobileNav';

const onChangeNavbarStatus = () => 'change navbar status';

describe('MobileNav component', () => {
  it('should render correctly', () => {
    const result = render(
      <BrowserRouter>
        <MobileNav />
      </BrowserRouter>,
    );
    expect(result).toMatchSnapshot();
  });

  it('should trigger click then onChangeNavbarStatus', () => {
    const ctn = render(
      <BrowserRouter>
        <MobileNav onChangeNavbarStatus={onChangeNavbarStatus} />
      </BrowserRouter>,
    );

    const mobileNav_btn = ctn.queryByTestId('mobileNav_btn');

    fireEvent.click(mobileNav_btn);
    expect(onChangeNavbarStatus).toBeTruthy();
  });
});
