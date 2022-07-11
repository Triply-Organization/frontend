import {
  act,
  fireEvent,
  getByText,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from 'antd';
import { describe, it } from 'vitest';

import Subnav from '../components/Header/Navbar/Subnav';

describe('Subnav component', () => {
  it('should render correctly', () => {
    const result = render(<Subnav />);
    expect(result).toMatchSnapshot();
  });
});
