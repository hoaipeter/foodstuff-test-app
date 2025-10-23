import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<App />);
    const heading = getByText(/Vite \+ React/i);
    expect(heading).toBeTruthy();
  });

  it('displays the count button', () => {
    const { getByRole } = render(<App />);
    const button = getByRole('button', { name: /count is 0/i });
    expect(button).toBeTruthy();
  });

  it('displays logos', () => {
    const { getByAltText } = render(<App />);
    expect(getByAltText(/Vite logo/i)).toBeTruthy();
    expect(getByAltText(/React logo/i)).toBeTruthy();
  });
});
