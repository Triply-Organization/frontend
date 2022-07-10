import {
  act,
  fireEvent,
  getByText,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from 'antd';
import { describe } from 'vitest';

import Search from '../components/Search/Search';

describe('Search component', () => {
  it('should render correctly', () => {
    const result = render(<Search />);
    expect(result).toMatchSnapshot();
  });

  it('should render select and option destination', () => {
    render(<Search destinations={[{ id: 1, name: 'Test' }]} />);

    const select = screen.getByTestId(
      'select-search-destination',
    ).firstElementChild;
    fireEvent.mouseDown(select);
    expect(screen.getByTestId('option-search-destination')).toBeInTheDocument();
  });

  it('should render select and option services', () => {
    render(<Search services={[{ id: 1, name: 'Test' }]} />);

    const select = screen.getByTestId(
      'select-search-services',
    ).firstElementChild;
    fireEvent.mouseDown(select);
    expect(screen.getByTestId('option-search-services')).toBeInTheDocument();
  });
});
