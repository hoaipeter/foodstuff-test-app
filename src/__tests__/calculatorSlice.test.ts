import { describe, expect, it } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import {
  calculateOrder,
  calculatorReducer,
  getDiscountPercentage,
  getTaxRate,
  resetCalculator,
  setError,
  setNumItems,
  setPricePerItem,
  setRegionCode,
  setResult,
  startCalculation,
} from '#/store';

describe('calculatorSlice', () => {
  const createTestStore = () => {
    return configureStore({
      reducer: {
        calculator: calculatorReducer,
      },
    });
  };

  it('should have correct initial state', () => {
    const store = createTestStore();
    const state = store.getState().calculator;

    expect(state.numItems).toBe('');
    expect(state.pricePerItem).toBe('');
    expect(state.regionCode).toBe('AUK');
    expect(state.result).toBeNull();
    expect(state.isCalculating).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should set number of items', () => {
    const store = createTestStore();
    store.dispatch(setNumItems('10'));

    const state = store.getState().calculator;
    expect(state.numItems).toBe('10');
    expect(state.error).toBeNull();
  });

  it('should set price per item', () => {
    const store = createTestStore();
    store.dispatch(setPricePerItem('25.50'));

    const state = store.getState().calculator;
    expect(state.pricePerItem).toBe('25.50');
    expect(state.error).toBeNull();
  });

  it('should set region code', () => {
    const store = createTestStore();
    store.dispatch(setRegionCode('WLG'));

    const state = store.getState().calculator;
    expect(state.regionCode).toBe('WLG');
    expect(state.error).toBeNull();
  });

  it('should set calculation result', () => {
    const store = createTestStore();
    const mockResult = {
      subtotal: 1000,
      discount: 30,
      discountPercentage: 3,
      priceAfterDiscount: 970,
      tax: 66.475,
      taxPercentage: 6.85,
      total: 1036.475,
    };

    store.dispatch(setResult(mockResult));

    const state = store.getState().calculator;
    expect(state.result).toEqual(mockResult);
    expect(state.isCalculating).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should set error message', () => {
    const store = createTestStore();
    const errorMsg = 'Please enter valid positive numbers';

    store.dispatch(setError(errorMsg));

    const state = store.getState().calculator;
    expect(state.error).toBe(errorMsg);
    expect(state.isCalculating).toBe(false);
  });

  it('should start calculation', () => {
    const store = createTestStore();
    store.dispatch(setError('Some error'));
    store.dispatch(startCalculation());

    const state = store.getState().calculator;
    expect(state.isCalculating).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should reset calculator to initial state', () => {
    const store = createTestStore();

    // Set some values
    store.dispatch(setNumItems('100'));
    store.dispatch(setPricePerItem('50'));
    store.dispatch(setRegionCode('CHC'));

    // Reset
    store.dispatch(resetCalculator());

    const state = store.getState().calculator;
    expect(state.numItems).toBe('');
    expect(state.pricePerItem).toBe('');
    expect(state.regionCode).toBe('AUK');
    expect(state.result).toBeNull();
    expect(state.isCalculating).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should clear error when setting new values', () => {
    const store = createTestStore();

    store.dispatch(setError('Some error'));
    expect(store.getState().calculator.error).toBe('Some error');

    store.dispatch(setNumItems('10'));
    expect(store.getState().calculator.error).toBeNull();

    store.dispatch(setError('Another error'));
    store.dispatch(setPricePerItem('20'));
    expect(store.getState().calculator.error).toBeNull();

    store.dispatch(setError('Yet another error'));
    store.dispatch(setRegionCode('WLG'));
    expect(store.getState().calculator.error).toBeNull();
  });
});

describe('Calculator Helper Functions', () => {
  describe('getDiscountPercentage', () => {
    it('should return 15% for orders >= 50000', () => {
      expect(getDiscountPercentage(50000)).toBe(15);
      expect(getDiscountPercentage(100000)).toBe(15);
    });

    it('should return 10% for orders >= 10000 and < 50000', () => {
      expect(getDiscountPercentage(10000)).toBe(10);
      expect(getDiscountPercentage(25000)).toBe(10);
    });

    it('should return 7% for orders >= 7000 and < 10000', () => {
      expect(getDiscountPercentage(7000)).toBe(7);
      expect(getDiscountPercentage(9999)).toBe(7);
    });

    it('should return 5% for orders >= 5000 and < 7000', () => {
      expect(getDiscountPercentage(5000)).toBe(5);
      expect(getDiscountPercentage(6999)).toBe(5);
    });

    it('should return 3% for orders >= 1000 and < 5000', () => {
      expect(getDiscountPercentage(1000)).toBe(3);
      expect(getDiscountPercentage(4999)).toBe(3);
    });

    it('should return 0% for orders < 1000', () => {
      expect(getDiscountPercentage(999)).toBe(0);
      expect(getDiscountPercentage(500)).toBe(0);
      expect(getDiscountPercentage(0)).toBe(0);
    });
  });

  describe('getTaxRate', () => {
    it('should return correct tax rate for AUK', () => {
      expect(getTaxRate('AUK')).toBe(6.85);
      expect(getTaxRate('auk')).toBe(6.85);
      expect(getTaxRate('Auk')).toBe(6.85);
    });

    it('should return correct tax rate for WLG', () => {
      expect(getTaxRate('WLG')).toBe(8.0);
    });

    it('should return correct tax rate for WAI', () => {
      expect(getTaxRate('WAI')).toBe(6.25);
    });

    it('should return correct tax rate for CHC', () => {
      expect(getTaxRate('CHC')).toBe(4.0);
    });

    it('should return correct tax rate for TAS', () => {
      expect(getTaxRate('TAS')).toBe(8.25);
    });

    it('should return 0 for unknown region codes', () => {
      expect(getTaxRate('UNKNOWN')).toBe(0);
      expect(getTaxRate('XXX')).toBe(0);
      expect(getTaxRate('')).toBe(0);
    });

    it('should handle case-insensitive region codes', () => {
      expect(getTaxRate('wlg')).toBe(8.0);
      expect(getTaxRate('WLG')).toBe(8.0);
      expect(getTaxRate('Wlg')).toBe(8.0);
    });
  });

  describe('calculateOrder', () => {
    it('should calculate order with discount and tax correctly', () => {
      const result = calculateOrder(100, 15, 'AUK');

      expect(result.subtotal).toBe(1500);
      expect(result.discountPercentage).toBe(3);
      expect(result.discount).toBe(45);
      expect(result.priceAfterDiscount).toBe(1455);
      expect(result.taxPercentage).toBe(6.85);
      expect(result.tax).toBeCloseTo(99.6675, 2);
      expect(result.total).toBeCloseTo(1554.6675, 2);
    });

    it('should calculate order with no discount', () => {
      const result = calculateOrder(10, 50, 'CHC');

      expect(result.subtotal).toBe(500);
      expect(result.discountPercentage).toBe(0);
      expect(result.discount).toBe(0);
      expect(result.priceAfterDiscount).toBe(500);
      expect(result.taxPercentage).toBe(4.0);
      expect(result.tax).toBe(20);
      expect(result.total).toBe(520);
    });

    it('should calculate large order with maximum discount', () => {
      const result = calculateOrder(1000, 100, 'WLG');

      expect(result.subtotal).toBe(100000);
      expect(result.discountPercentage).toBe(15);
      expect(result.discount).toBe(15000);
      expect(result.priceAfterDiscount).toBe(85000);
      expect(result.taxPercentage).toBe(8.0);
      expect(result.tax).toBe(6800);
      expect(result.total).toBe(91800);
    });

    it('should handle unknown region code with 0% tax', () => {
      const result = calculateOrder(100, 10, 'UNKNOWN');

      expect(result.subtotal).toBe(1000);
      expect(result.taxPercentage).toBe(0);
      expect(result.tax).toBe(0);
      expect(result.total).toBe(result.priceAfterDiscount);
    });

    it('should calculate correctly for boundary discount values', () => {
      // Exactly 5000 - should get 5% discount
      const result1 = calculateOrder(100, 50, 'AUK');
      expect(result1.subtotal).toBe(5000);
      expect(result1.discountPercentage).toBe(5);

      // Exactly 7000 - should get 7% discount
      const result2 = calculateOrder(100, 70, 'AUK');
      expect(result2.subtotal).toBe(7000);
      expect(result2.discountPercentage).toBe(7);
    });
  });
});
