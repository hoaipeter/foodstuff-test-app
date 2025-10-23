import { describe, expect, it } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useCalculator } from '#/hooks';
import { calculatorReducer } from '#/store';

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const store = configureStore({
    reducer: {
      calculator: calculatorReducer,
    },
  });
  return <Provider store={store}>{children}</Provider>;
};

describe('useCalculator Hook', () => {
  it('should return initial state', () => {
    const { result } = renderHook(() => useCalculator(), { wrapper });

    expect(result.current.numItems).toBe('');
    expect(result.current.pricePerItem).toBe('');
    expect(result.current.regionCode).toBe('AUK');
    expect(result.current.result).toBeNull();
    expect(result.current.isCalculating).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle number of items change', () => {
    const { result } = renderHook(() => useCalculator(), { wrapper });

    act(() => {
      result.current.handleNumItemsChange('10');
    });

    expect(result.current.numItems).toBe('10');
  });

  it('should handle price per item change', () => {
    const { result } = renderHook(() => useCalculator(), { wrapper });

    act(() => {
      result.current.handlePricePerItemChange('25.50');
    });

    expect(result.current.pricePerItem).toBe('25.50');
  });

  it('should handle region code change', () => {
    const { result } = renderHook(() => useCalculator(), { wrapper });

    act(() => {
      result.current.handleRegionCodeChange('WLG');
    });

    expect(result.current.regionCode).toBe('WLG');
  });

  it('should calculate order successfully', () => {
    const { result } = renderHook(() => useCalculator(), { wrapper });

    act(() => {
      result.current.handleNumItemsChange('100');
      result.current.handlePricePerItemChange('15');
    });

    const mockEvent = { preventDefault: () => {} } as React.FormEvent;

    act(() => {
      result.current.handleCalculate(mockEvent);
    });

    expect(result.current.result).not.toBeNull();
    expect(result.current.result?.subtotal).toBe(1500);
  });

  it('should set error for invalid number of items (NaN)', () => {
    const { result } = renderHook(() => useCalculator(), { wrapper });

    act(() => {
      result.current.handleNumItemsChange('abc');
      result.current.handlePricePerItemChange('10');
    });

    const mockEvent = { preventDefault: () => {} } as React.FormEvent;

    act(() => {
      result.current.handleCalculate(mockEvent);
    });

    expect(result.current.error).toBe('Please enter valid positive numbers');
    expect(result.current.result).toBeNull();
  });

  it('should set error for invalid price (NaN)', () => {
    const { result } = renderHook(() => useCalculator(), { wrapper });

    act(() => {
      result.current.handleNumItemsChange('10');
      result.current.handlePricePerItemChange('xyz');
    });

    const mockEvent = { preventDefault: () => {} } as React.FormEvent;

    act(() => {
      result.current.handleCalculate(mockEvent);
    });

    expect(result.current.error).toBe('Please enter valid positive numbers');
  });

  it('should set error for negative number of items', () => {
    const { result } = renderHook(() => useCalculator(), { wrapper });

    act(() => {
      result.current.handleNumItemsChange('-5');
      result.current.handlePricePerItemChange('10');
    });

    const mockEvent = { preventDefault: () => {} } as React.FormEvent;

    act(() => {
      result.current.handleCalculate(mockEvent);
    });

    expect(result.current.error).toBe('Please enter valid positive numbers');
  });

  it('should set error for negative price', () => {
    const { result } = renderHook(() => useCalculator(), { wrapper });

    act(() => {
      result.current.handleNumItemsChange('10');
      result.current.handlePricePerItemChange('-20');
    });

    const mockEvent = { preventDefault: () => {} } as React.FormEvent;

    act(() => {
      result.current.handleCalculate(mockEvent);
    });

    expect(result.current.error).toBe('Please enter valid positive numbers');
  });

  it('should set error for zero items', () => {
    const { result } = renderHook(() => useCalculator(), { wrapper });

    act(() => {
      result.current.handleNumItemsChange('0');
      result.current.handlePricePerItemChange('10');
    });

    const mockEvent = { preventDefault: () => {} } as React.FormEvent;

    act(() => {
      result.current.handleCalculate(mockEvent);
    });

    expect(result.current.error).toBe('Please enter valid positive numbers');
  });

  it('should set error for zero price', () => {
    const { result } = renderHook(() => useCalculator(), { wrapper });

    act(() => {
      result.current.handleNumItemsChange('10');
      result.current.handlePricePerItemChange('0');
    });

    const mockEvent = { preventDefault: () => {} } as React.FormEvent;

    act(() => {
      result.current.handleCalculate(mockEvent);
    });

    expect(result.current.error).toBe('Please enter valid positive numbers');
  });

  it('should reset calculator', () => {
    const { result } = renderHook(() => useCalculator(), { wrapper });

    act(() => {
      result.current.handleNumItemsChange('100');
      result.current.handlePricePerItemChange('50');
      result.current.handleRegionCodeChange('WLG');
    });

    act(() => {
      result.current.handleReset();
    });

    expect(result.current.numItems).toBe('');
    expect(result.current.pricePerItem).toBe('');
    expect(result.current.regionCode).toBe('AUK');
    expect(result.current.result).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
