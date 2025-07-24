import { render, screen } from '@testing-library/react';
import App from './App';

test('renders landing page', () => {
  render(<App />);
  const heading = screen.getByText(/Hallo Noord-Holland!/i);
  expect(heading).toBeInTheDocument();
});
