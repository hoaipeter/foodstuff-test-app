import { useCallback, useState } from 'react';
import type { CalculationResult } from '#/types';
import { calculateOrder } from '#/utils/calculator';

export const useCalculator = () => {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback((items: number, price: number, region: string) => {
    if (isNaN(items) || isNaN(price) || items <= 0 || price <= 0) {
      setError('Please enter valid positive numbers');
      setResult(null);
      return;
    }

    setError(null);
    const calculation = calculateOrder(items, price, region);
    setResult(calculation);
  }, []);

  const handleReset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    result,
    error,
    calculate,
    handleReset,
  };
};
