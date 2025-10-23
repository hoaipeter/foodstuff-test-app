import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '#/App';
import { store } from '#/store';

const renderWithProvider = (component: React.ReactElement) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('App Component', () => {
  it('renders without crashing', () => {
    const { getByText } = renderWithProvider(<App />);
    const heading = getByText(/Retail Calculator/i);
    expect(heading).toBeTruthy();
  });

  it('displays form inputs', () => {
    const { getByLabelText } = renderWithProvider(<App />);
    expect(getByLabelText(/Number of Items/i)).toBeTruthy();
    expect(getByLabelText(/Price per Item/i)).toBeTruthy();
    expect(getByLabelText(/Region Code/i)).toBeTruthy();
  });

  it('has a calculate button', () => {
    const { getByRole } = renderWithProvider(<App />);
    const button = getByRole('button', { name: /Calculate/i });
    expect(button).toBeTruthy();
  });

  it('renders reference tables', () => {
    renderWithProvider(<App />);

    // Check for discount tiers table
    expect(screen.getByText(/Discount Tiers/i)).toBeTruthy();

    // Check for tax rates table
    expect(screen.getByText(/Tax Rates by Region/i)).toBeTruthy();
  });
});
