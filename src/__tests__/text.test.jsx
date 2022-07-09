import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { expect, test } from 'vitest';

import { Text } from '../components/Text';

test('test', () => {
  const component = render(<Text />);
  const test = component.getByTestId('text');

  expect(test.textContent).toBe('test');
});
