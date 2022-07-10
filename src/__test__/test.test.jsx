/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';

import Footer from '../../src/components/Footer/';

// const toUpperCase = str => str.toUpperCase();

// it('toUpperCase', () => {
//   const result = toUpperCase('foobar');
//   expect(result).toMatchSnapshot();
// });

it('should render correctly', () => {
  const result = renderer.create(<Footer />);
  console.log(result.toJSON());
  // expect(<Footer />).toMatchSnapshot();
});
