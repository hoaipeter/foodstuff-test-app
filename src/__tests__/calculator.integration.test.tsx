import { describe, expect, it } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '#/App';
import { calculatorReducer } from '#/store';

const createTestStore = () => {
  return configureStore({
    reducer: {
      calculator: calculatorReducer,
    },
  });
};

const renderWithProvider = (component: React.ReactElement) => {
  const store = createTestStore();
  return render(<Provider store={store}>{component}</Provider>);
};

describe('Calculator Integration Tests', () => {
  it('should calculate order with valid inputs', async () => {
    const { getByLabelText, getByRole, getByText } = renderWithProvider(<App />);

    // Fill in the form
    const numItemsInput = getByLabelText(/Number of Items/i);
    const pricePerItemInput = getByLabelText(/Price per Item/i);
    const regionSelect = getByLabelText(/Region Code/i);
    const calculateButton = getByRole('button', { name: /Calculate/i });

    fireEvent.change(numItemsInput, { target: { value: '100' } });
    fireEvent.change(pricePerItemInput, { target: { value: '10' } });
    fireEvent.change(regionSelect, { target: { value: 'AUK' } });

    // Submit the form
    fireEvent.click(calculateButton);

    // Wait for results to appear
    await waitFor(() => {
      expect(getByText(/Calculation Results/i)).toBeTruthy();
    });

    // Check if subtotal is displayed (100 * 10 = 1000)
    expect(getByText(/Subtotal/i)).toBeTruthy();
  });

  it('should reset calculator when reset button is clicked', async () => {
    const { getByLabelText, getByRole, getByText, queryByText } = renderWithProvider(<App />);

    const numItemsInput = getByLabelText(/Number of Items/i) as HTMLInputElement;
    const pricePerItemInput = getByLabelText(/Price per Item/i) as HTMLInputElement;
    const calculateButton = getByRole('button', { name: /Calculate/i });

    // Fill and calculate
    fireEvent.change(numItemsInput, { target: { value: '50' } });
    fireEvent.change(pricePerItemInput, { target: { value: '20' } });
    fireEvent.click(calculateButton);

    // Wait for results
    await waitFor(() => {
      expect(getByText(/Calculation Results/i)).toBeTruthy();
    });

    // Click reset button
    const resetButton = getByRole('button', { name: /Reset/i });
    fireEvent.click(resetButton);

    // Check if form is reset
    await waitFor(() => {
      expect(numItemsInput.value).toBe('');
      expect(pricePerItemInput.value).toBe('');
      expect(queryByText(/Calculation Results/i)).toBeFalsy();
    });
  });

  it('should apply correct discount tier', async () => {
    const { getByLabelText, getByRole, getByText } = renderWithProvider(<App />);

    const numItemsInput = getByLabelText(/Number of Items/i);
    const pricePerItemInput = getByLabelText(/Price per Item/i);
    const calculateButton = getByRole('button', { name: /Calculate/i });

    // Order value = 1000 * 10 = 10,000 (should get 10% discount)
    fireEvent.change(numItemsInput, { target: { value: '1000' } });
    fireEvent.change(pricePerItemInput, { target: { value: '10' } });
    fireEvent.click(calculateButton);

    await waitFor(() => {
      expect(getByText(/Discount \(10%\)/i)).toBeTruthy();
    });
  });

  it('should apply correct tax rate for different regions', async () => {
    const { getByLabelText, getByRole, getByText } = renderWithProvider(<App />);

    const numItemsInput = getByLabelText(/Number of Items/i);
    const pricePerItemInput = getByLabelText(/Price per Item/i);
    const regionSelect = getByLabelText(/Region Code/i);
    const calculateButton = getByRole('button', { name: /Calculate/i });

    // Test with WLG region (8% tax)
    fireEvent.change(numItemsInput, { target: { value: '10' } });
    fireEvent.change(pricePerItemInput, { target: { value: '100' } });
    fireEvent.change(regionSelect, { target: { value: 'WLG' } });
    fireEvent.click(calculateButton);

    await waitFor(() => {
      expect(getByText(/Tax \(8%\)/i)).toBeTruthy();
    });
  });
});
