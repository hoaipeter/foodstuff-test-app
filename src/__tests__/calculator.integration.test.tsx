import { describe, expect, it } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '#/App';

describe('Calculator Integration Tests - Full Flow', () => {
  describe('End-to-End Calculation Flow', () => {
    it('completes full calculation with no discount (order < 1000)', async () => {
      render(<App />);

      // Step 1: Fill in form
      const numItemsInput = screen.getByLabelText(/Number of Items/i);
      const priceInput = screen.getByLabelText(/Price per Item/i);
      const regionSelect = screen.getByLabelText(/Region Code/i) as HTMLSelectElement;

      await userEvent.type(numItemsInput, '10');
      await userEvent.type(priceInput, '50');
      await userEvent.selectOptions(regionSelect, 'AUK');

      // Step 2: Submit calculation
      const calculateButton = screen.getByRole('button', { name: /Calculate/i });
      fireEvent.click(calculateButton);

      // Step 3: Verify results appear
      await waitFor(() => {
        expect(screen.getByText(/Calculation Results/i)).toBeTruthy();
      });

      // Step 4: Verify calculation accuracy
      // 10 items × $50 = $500 subtotal
      // No discount (< 1000)
      // Tax: 6.85% of 500 = $34.25
      // Total: $534.25
      const resultsSection = screen.getByText(/Calculation Results/i).parentElement;
      expect(resultsSection?.textContent).toContain('$500.00'); // Subtotal
      expect(resultsSection?.textContent).toContain('0%'); // No discount
      expect(resultsSection?.textContent).toContain('$534.25'); // Total

      // Step 5: Verify reset button appears
      expect(screen.getByRole('button', { name: /Reset/i })).toBeTruthy();
    });

    it('completes full calculation with 3% discount (order 1000-4999)', async () => {
      render(<App />);

      // Order value: 25 × $50 = $1250
      await userEvent.type(screen.getByLabelText(/Number of Items/i), '25');
      await userEvent.type(screen.getByLabelText(/Price per Item/i), '50');
      await userEvent.selectOptions(screen.getByLabelText(/Region Code/i), 'WLG');

      fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

      await waitFor(() => {
        expect(screen.getByText(/Calculation Results/i)).toBeTruthy();
      });

      // Verify: Subtotal $1250, 3% discount = $37.50, After discount = $1212.50
      // Tax: 8% of $1212.50 = $97, Total = $1309.50
      const resultsSection = screen.getByText(/Calculation Results/i).parentElement;
      expect(resultsSection?.textContent).toContain('$1,250.00'); // Subtotal
      expect(resultsSection?.textContent).toContain('3%'); // Discount percentage
      expect(resultsSection?.textContent).toContain('$37.50'); // Discount amount
      expect(resultsSection?.textContent).toContain('$1,309.50'); // Total
    });

    it('completes full calculation with 5% discount (order 5000-6999)', async () => {
      render(<App />);

      // Order value: 100 × $60 = $6000
      await userEvent.type(screen.getByLabelText(/Number of Items/i), '100');
      await userEvent.type(screen.getByLabelText(/Price per Item/i), '60');
      await userEvent.selectOptions(screen.getByLabelText(/Region Code/i), 'WAI');

      fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

      await waitFor(() => {
        expect(screen.getByText(/Calculation Results/i)).toBeTruthy();
      });

      // Verify: Subtotal $6000, 5% discount = $300, After discount = $5700
      // Tax: 6.25% of $5700 = $356.25, Total = $6056.25
      const resultsSection = screen.getByText(/Calculation Results/i).parentElement;
      expect(resultsSection?.textContent).toContain('$6,000.00');
      expect(resultsSection?.textContent).toContain('5%');
      expect(resultsSection?.textContent).toContain('$300.00');
      expect(resultsSection?.textContent).toContain('$6,056.25');
    });

    it('completes full calculation with 7% discount (order 7000-9999)', async () => {
      render(<App />);

      // Order value: 200 × $40 = $8000
      await userEvent.type(screen.getByLabelText(/Number of Items/i), '200');
      await userEvent.type(screen.getByLabelText(/Price per Item/i), '40');
      await userEvent.selectOptions(screen.getByLabelText(/Region Code/i), 'CHC');

      fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

      await waitFor(() => {
        expect(screen.getByText(/Calculation Results/i)).toBeTruthy();
      });

      // Verify: Subtotal $8000, 7% discount = $560, After discount = $7440
      // Tax: 4% of $7440 = $297.60, Total = $7737.60
      const resultsSection = screen.getByText(/Calculation Results/i).parentElement;
      expect(resultsSection?.textContent).toContain('$8,000.00');
      expect(resultsSection?.textContent).toContain('7%');
      expect(resultsSection?.textContent).toContain('$560.00');
      expect(resultsSection?.textContent).toContain('$7,737.60');
    });

    it('completes full calculation with 10% discount (order 10000-49999)', async () => {
      render(<App />);

      // Order value: 250 × $50 = $12500
      await userEvent.type(screen.getByLabelText(/Number of Items/i), '250');
      await userEvent.type(screen.getByLabelText(/Price per Item/i), '50');
      await userEvent.selectOptions(screen.getByLabelText(/Region Code/i), 'TAS');

      fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

      await waitFor(() => {
        expect(screen.getByText(/Calculation Results/i)).toBeTruthy();
      });

      // Verify: Subtotal $12500, 10% discount = $1250, After discount = $11250
      // Tax: 8.25% of $11250 = $928.125, Total = $12178.125
      const resultsSection = screen.getByText(/Calculation Results/i).parentElement;
      expect(resultsSection?.textContent).toContain('$12,500.00');
      expect(resultsSection?.textContent).toContain('10%');
      expect(resultsSection?.textContent).toContain('$1,250.00');
      expect(resultsSection?.textContent).toContain('$12,178.13'); // Rounded
    });

    it('completes full calculation with 15% discount (order >= 50000)', async () => {
      render(<App />);

      // Order value: 1000 × $60 = $60000
      await userEvent.type(screen.getByLabelText(/Number of Items/i), '1000');
      await userEvent.type(screen.getByLabelText(/Price per Item/i), '60');
      await userEvent.selectOptions(screen.getByLabelText(/Region Code/i), 'AUK');

      fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

      await waitFor(() => {
        expect(screen.getByText(/Calculation Results/i)).toBeTruthy();
      });

      // Verify: Subtotal $60000, 15% discount = $9000, After discount = $51000
      // Tax: 6.85% of $51000 = $3493.50, Total = $54493.50
      const resultsSection = screen.getByText(/Calculation Results/i).parentElement;
      expect(resultsSection?.textContent).toContain('$60,000.00');
      expect(resultsSection?.textContent).toContain('15%');
      expect(resultsSection?.textContent).toContain('$9,000.00');
      expect(resultsSection?.textContent).toContain('$54,493.50');
    });
  });

  describe('Multiple Calculations in Sequence', () => {
    it('allows multiple calculations without page refresh', async () => {
      render(<App />);

      // First calculation
      await userEvent.type(screen.getByLabelText(/Number of Items/i), '10');
      await userEvent.type(screen.getByLabelText(/Price per Item/i), '50');
      fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

      await waitFor(() => {
        expect(screen.getByText(/Calculation Results/i)).toBeTruthy();
      });

      // Reset
      const resetButton = screen.getByRole('button', { name: /Reset/i });
      fireEvent.click(resetButton);

      await waitFor(() => {
        expect(screen.queryByText(/Calculation Results/i)).toBeFalsy();
      });

      // Second calculation with different values
      await userEvent.type(screen.getByLabelText(/Number of Items/i), '100');
      await userEvent.type(screen.getByLabelText(/Price per Item/i), '60');
      fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

      await waitFor(() => {
        expect(screen.getByText(/Calculation Results/i)).toBeTruthy();
      });

      const resultsSection = screen.getByText(/Calculation Results/i).parentElement;
      expect(resultsSection?.textContent).toContain('$6,000.00'); // New subtotal
    });
  });

  describe('Decimal Values Integration', () => {
    it('handles decimal prices correctly through full flow', async () => {
      render(<App />);

      // Use decimal price
      await userEvent.type(screen.getByLabelText(/Number of Items/i), '3');
      await userEvent.type(screen.getByLabelText(/Price per Item/i), '19.99');
      await userEvent.selectOptions(screen.getByLabelText(/Region Code/i), 'WLG');

      fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

      await waitFor(() => {
        expect(screen.getByText(/Calculation Results/i)).toBeTruthy();
      });

      // Subtotal should be 3 × 19.99 = 59.97
      const resultsSection = screen.getByText(/Calculation Results/i).parentElement;
      expect(resultsSection?.textContent).toContain('$59.97');
    });

    it('handles large quantities correctly', async () => {
      render(<App />);

      await userEvent.type(screen.getByLabelText(/Number of Items/i), '123');
      await userEvent.type(screen.getByLabelText(/Price per Item/i), '99.99');

      fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

      await waitFor(() => {
        expect(screen.getByText(/Calculation Results/i)).toBeTruthy();
      });

      // Should calculate without error
      expect(screen.getByText(/Calculation Results/i)).toBeTruthy();
    });
  });

  describe('Edge Cases Integration', () => {
    it('handles discount tier boundary (exactly 1000)', async () => {
      render(<App />);

      // Exactly $1000 should get 3% discount
      await userEvent.type(screen.getByLabelText(/Number of Items/i), '20');
      await userEvent.type(screen.getByLabelText(/Price per Item/i), '50');

      fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

      await waitFor(() => {
        expect(screen.getByText(/Calculation Results/i)).toBeTruthy();
      });

      const resultsSection = screen.getByText(/Calculation Results/i).parentElement;
      expect(resultsSection?.textContent).toContain('$1,000.00');
      expect(resultsSection?.textContent).toContain('3%'); // Should get discount
    });

    it('handles discount tier boundary (just below 1000)', async () => {
      render(<App />);

      // $999 should get 0% discount
      await userEvent.type(screen.getByLabelText(/Number of Items/i), '999');
      await userEvent.type(screen.getByLabelText(/Price per Item/i), '1');

      fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

      await waitFor(() => {
        expect(screen.getByText(/Calculation Results/i)).toBeTruthy();
      });

      const resultsSection = screen.getByText(/Calculation Results/i).parentElement;
      expect(resultsSection?.textContent).toContain('$999.00');
      expect(resultsSection?.textContent).toContain('0%'); // No discount
    });
  });

  describe('Error Handling Integration', () => {
    it('prevents calculation and shows errors when validation fails', async () => {
      render(<App />);

      // Try to calculate with invalid data
      await userEvent.type(screen.getByLabelText(/Number of Items/i), '-5');
      await userEvent.type(screen.getByLabelText(/Price per Item/i), '0');

      fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

      // Should show validation errors, not results
      await waitFor(() => {
        expect(screen.getByText(/Please enter a valid positive number/i)).toBeTruthy();
      });

      expect(screen.queryByText(/Calculation Results/i)).toBeFalsy();
    });

    it('clears previous errors when valid calculation is made', async () => {
      render(<App />);

      // First, trigger validation error
      fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

      await waitFor(() => {
        expect(screen.getByText(/Number of items is required/i)).toBeTruthy();
      });

      // Now enter valid data and calculate
      await userEvent.type(screen.getByLabelText(/Number of Items/i), '10');
      await userEvent.type(screen.getByLabelText(/Price per Item/i), '50');

      fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

      // Error should be cleared, results should show
      await waitFor(() => {
        expect(screen.queryByText(/Number of items is required/i)).toBeFalsy();
        expect(screen.getByText(/Calculation Results/i)).toBeTruthy();
      });
    });
  });

  describe('UI State Integration', () => {
    it('shows and hides reset button based on calculation state', async () => {
      render(<App />);

      // Initially, no reset button
      expect(screen.queryByRole('button', { name: /Reset/i })).toBeFalsy();

      // After calculation, reset button appears
      await userEvent.type(screen.getByLabelText(/Number of Items/i), '10');
      await userEvent.type(screen.getByLabelText(/Price per Item/i), '50');
      fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Reset/i })).toBeTruthy();
      });

      // After reset, button disappears
      fireEvent.click(screen.getByRole('button', { name: /Reset/i }));

      await waitFor(() => {
        expect(screen.queryByRole('button', { name: /Reset/i })).toBeFalsy();
      });
    });

    it('displays all result fields after calculation', async () => {
      render(<App />);

      await userEvent.type(screen.getByLabelText(/Number of Items/i), '10');
      await userEvent.type(screen.getByLabelText(/Price per Item/i), '50');
      fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

      await waitFor(() => {
        expect(screen.getByText(/Calculation Results/i)).toBeTruthy();
      });

      // Verify all fields exist within results section
      const resultsSection = screen.getByText(/Calculation Results/i).parentElement;
      expect(resultsSection?.textContent).toContain('Subtotal:');
      expect(resultsSection?.textContent).toContain('Discount (');
      expect(resultsSection?.textContent).toContain('Price After Discount:');
      expect(resultsSection?.textContent).toContain('Tax (');
      expect(resultsSection?.textContent).toContain('Total:');
    });
  });

  describe('Region-Specific Tax Calculations', () => {
    it('applies correct tax for each region in full flow', async () => {
      const regions = [
        { code: 'AUK', rate: 6.85 },
        { code: 'WLG', rate: 8.0 },
        { code: 'WAI', rate: 6.25 },
        { code: 'CHC', rate: 4.0 },
        { code: 'TAS', rate: 8.25 },
      ];

      for (const region of regions) {
        const { unmount } = render(<App />);

        await userEvent.type(screen.getByLabelText(/Number of Items/i), '10');
        await userEvent.type(screen.getByLabelText(/Price per Item/i), '100');
        await userEvent.selectOptions(screen.getByLabelText(/Region Code/i), region.code);

        fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

        await waitFor(() => {
          const resultsSection = screen.getByText(/Calculation Results/i).parentElement;
          expect(resultsSection?.textContent).toContain(`${region.rate}%`);
        });

        unmount();
      }
    });
  });
});
