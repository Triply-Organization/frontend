/* eslint-disable no-undef */

/* eslint-disable react/react-in-jsx-scope */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';

import Search from '../components/Search/Search';

describe('Seach component test', () => {
  it('should render correctly', () => {
    const result = render(<Search />);
    expect(result).toMatchSnapshot();
  });

  it('should render option destination', () => {
    render(<Search destinations={[{ id: 1, name: 'Test' }]} />);
    expect(
      screen.getAllByTestId('option-search-destination'),
    ).toBeInTheDocument();
  });
});
