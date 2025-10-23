import { describe, expect, it } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '#/App';

describe('App Component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<App />);
    const heading = getByText(/Retail Calculator/i);
    expect(heading).toBeTruthy();
  });

  it('displays form inputs', () => {
    const { getByLabelText } = render(<App />);
    expect(getByLabelText(/Number of Items/i)).toBeTruthy();
    expect(getByLabelText(/Price per Item/i)).toBeTruthy();
    expect(getByLabelText(/Region Code/i)).toBeTruthy();
  });

  it('has a calculate button', () => {
    const { getByRole } = render(<App />);
    const button = getByRole('button', { name: /Calculate/i });
    expect(button).toBeTruthy();
  });

  it('renders reference tables', () => {
    render(<App />);

    // Check for discount tiers table
    expect(screen.getByText(/Discount Tiers/i)).toBeTruthy();

    // Check for tax rates table
    expect(screen.getByText(/Tax Rates by Region/i)).toBeTruthy();
  });

  describe('Form Validation', () => {
    it('shows validation error for empty number of items', async () => {
      render(<App />);

      const calculateButton = screen.getByRole('button', { name: /Calculate/i });

      // Try to submit empty form
      fireEvent.click(calculateButton);

      // Check for validation error
      await waitFor(() => {
        expect(screen.getByText(/Number of items is required/i)).toBeTruthy();
      });
    });

    it('shows validation error for empty price per item', async () => {
      render(<App />);

      const numItemsInput = screen.getByLabelText(/Number of Items/i);
      const calculateButton = screen.getByRole('button', { name: /Calculate/i });

      // Fill only numItems, leave price empty
      await userEvent.type(numItemsInput, '10');
      fireEvent.click(calculateButton);

      await waitFor(() => {
        expect(screen.getByText(/Price per item is required/i)).toBeTruthy();
      });
    });
  });

  describe('Successful Calculation', () => {
    it('displays results after successful calculation', async () => {
      render(<App />);

      const numItemsInput = screen.getByLabelText(/Number of Items/i);
      const priceInput = screen.getByLabelText(/Price per Item/i);
      const calculateButton = screen.getByRole('button', { name: /Calculate/i });

      // Fill in valid values
      await userEvent.type(numItemsInput, '10');
      await userEvent.type(priceInput, '50');
      fireEvent.click(calculateButton);

      // Check that results are displayed
      await waitFor(() => {
        expect(screen.getByText(/Calculation Results/i)).toBeTruthy();
      });

      // Verify result fields exist within results section
      const resultsSection = screen.getByText(/Calculation Results/i).parentElement;
      expect(resultsSection?.textContent).toContain('Subtotal:');
      expect(resultsSection?.textContent).toContain('Discount (');
      expect(resultsSection?.textContent).toContain('Price After Discount:');
      expect(resultsSection?.textContent).toContain('Tax (');
      expect(resultsSection?.textContent).toContain('Total:');
    });

    it('shows reset button after successful calculation', async () => {
      render(<App />);

      const numItemsInput = screen.getByLabelText(/Number of Items/i);
      const priceInput = screen.getByLabelText(/Price per Item/i);
      const calculateButton = screen.getByRole('button', { name: /Calculate/i });

      // Calculate
      await userEvent.type(numItemsInput, '10');
      await userEvent.type(priceInput, '50');
      fireEvent.click(calculateButton);

      // Check for reset button
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Reset/i })).toBeTruthy();
      });
    });

    it('formats currency values correctly', async () => {
      render(<App />);

      const numItemsInput = screen.getByLabelText(/Number of Items/i);
      const priceInput = screen.getByLabelText(/Price per Item/i);
      const calculateButton = screen.getByRole('button', { name: /Calculate/i });

      // Calculate with values that give known results
      await userEvent.type(numItemsInput, '10');
      await userEvent.type(priceInput, '100');
      fireEvent.click(calculateButton);

      // Check that currency is formatted
      await waitFor(() => {
        const results = screen.getByText(/Calculation Results/i).parentElement;
        expect(results?.textContent).toContain('$');
      });
    });
  });

  describe('Reset Functionality', () => {
    it('resets form and clears results when reset button is clicked', async () => {
      render(<App />);

      const numItemsInput = screen.getByLabelText(/Number of Items/i) as HTMLInputElement;
      const priceInput = screen.getByLabelText(/Price per Item/i) as HTMLInputElement;
      const calculateButton = screen.getByRole('button', { name: /Calculate/i });

      // Calculate
      await userEvent.type(numItemsInput, '10');
      await userEvent.type(priceInput, '50');
      fireEvent.click(calculateButton);

      // Wait for results
      await waitFor(() => {
        expect(screen.getByText(/Calculation Results/i)).toBeTruthy();
      });

      // Click reset
      const resetButton = screen.getByRole('button', { name: /Reset/i });
      fireEvent.click(resetButton);

      // Check that results are cleared
      await waitFor(() => {
        expect(screen.queryByText(/Calculation Results/i)).toBeFalsy();
      });

      // Check that form is cleared
      expect(numItemsInput.value).toBe('');
      expect(priceInput.value).toBe('');
    });
  });

  describe('Region Selection', () => {
    it('allows selecting different regions', async () => {
      render(<App />);

      const regionSelect = screen.getByLabelText(/Region Code/i) as HTMLSelectElement;

      // Check initial value
      expect(regionSelect.value).toBe('AUK');

      // Change to different region
      await userEvent.selectOptions(regionSelect, 'WLG');
      expect(regionSelect.value).toBe('WLG');
    });

    it('displays all region options', () => {
      render(<App />);

      const regionSelect = screen.getByLabelText(/Region Code/i) as HTMLSelectElement;
      const options = Array.from(regionSelect.options).map((opt) => opt.value);

      expect(options).toContain('AUK');
      expect(options).toContain('WLG');
      expect(options).toContain('WAI');
      expect(options).toContain('CHC');
      expect(options).toContain('TAS');
    });
  });
});
