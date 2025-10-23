import { describe, expect, it } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';
import { useCalculator } from '#/hooks';

describe('useCalculator Hook', () => {
  it('should return initial state', () => {
    const { result } = renderHook(() => useCalculator());

    expect(result.current.result).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should calculate order successfully', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.calculate(100, 15, 'AUK');
    });

    expect(result.current.result).not.toBeNull();
    expect(result.current.result?.subtotal).toBe(1500);
  });

  it('should set error for invalid number of items (NaN)', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.calculate(NaN, 10, 'AUK');
    });

    expect(result.current.error).toBe('Please enter valid positive numbers');
    expect(result.current.result).toBeNull();
  });

  it('should set error for invalid price (NaN)', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.calculate(10, NaN, 'AUK');
    });

    expect(result.current.error).toBe('Please enter valid positive numbers');
  });

  it('should set error for negative number of items', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.calculate(-5, 10, 'AUK');
    });

    expect(result.current.error).toBe('Please enter valid positive numbers');
  });

  it('should set error for negative price', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.calculate(10, -20, 'AUK');
    });

    expect(result.current.error).toBe('Please enter valid positive numbers');
  });

  it('should set error for zero items', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.calculate(0, 10, 'AUK');
    });

    expect(result.current.error).toBe('Please enter valid positive numbers');
  });

  it('should set error for zero price', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.calculate(10, 0, 'AUK');
    });

    expect(result.current.error).toBe('Please enter valid positive numbers');
  });

  it('should reset calculator', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.calculate(100, 50, 'WLG');
    });

    expect(result.current.result).not.toBeNull();

    act(() => {
      result.current.handleReset();
    });

    expect(result.current.result).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
