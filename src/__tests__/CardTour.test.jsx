import '@testing-library/jest-dom/extend-expect';
import {
  fireEvent,
  getByTestId,
  getByText,
  render,
} from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import CardTour from '../components/CardTour/CardTour';

describe('component/CardTour', () => {
  test('render correctly', () => {
    expect(
      render(
        <BrowserRouter>
          <CardTour />
        </BrowserRouter>,
      ),
    ).toMatchSnapshot();
  });

  test('should render none tag', () => {
    const tour = {};
    const ctn = render(
      <BrowserRouter>
        <CardTour tag="" tour={tour} />
      </BrowserRouter>,
    );
    const tagCpn = ctn.queryByTestId('cardTour-tag');

    expect(tagCpn.textContent).toBe('');
  });

  test('should render correct tag', () => {
    const tour = {
      id: 1,
      name: 'name',
      image: 'src',
      duration: 1,
      maxPeople: 1,
      rating: 1,
      totalReviews: 1,
      tourDestination: 1,
    };
    const ctn = render(
      <BrowserRouter>
        <CardTour tour={tour} tag="featured" />
      </BrowserRouter>,
    );
    const tagTextCpn = ctn.queryByTestId('cardTour-tag-text');

    expect(tagTextCpn.textContent).toBe('featured');
  });

  test('should navigate to correct link', () => {
    const tour = {
      id: 1,
      name: 'name',
      image: 'src',
      duration: 1,
      maxPeople: 1,
      rating: 1,
      totalReviews: 1,
      tourDestination: 1,
    };
    const ctn = render(
      <BrowserRouter>
        <CardTour tag="" tour={tour} />
      </BrowserRouter>,
    );
    const exploreBtn = ctn.queryByTestId('cardTour_explore');

    fireEvent.click(exploreBtn);

    expect(location.pathname).toBe('/detail/1');
  });

  test('should render correct price range', () => {
    const tour = {
      id: 1,
      name: 'name',
      image: 'src',
      duration: 1,
      maxPeople: 1,
      rating: 1,
      totalReviews: 1,
      tourDestination: 1,
      minPrice: 10,
      maxPrice: 100,
    };
    const ctn = render(
      <BrowserRouter>
        <CardTour tag="" tour={tour} />
      </BrowserRouter>,
    );
    const priceRange = ctn.queryByTestId('cardTour-priceRange');
    expect(priceRange.textContent).toBe('$10.00 - $100.00');
  });
});
