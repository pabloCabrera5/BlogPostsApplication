import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('App should render the correct title', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Welcome to the blog posts app/i);
  expect(linkElement).toBeInTheDocument();
});
