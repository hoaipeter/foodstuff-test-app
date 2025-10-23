import { useCallback } from 'react';
import {
  calculateOrder,
  resetCalculator,
  setError,
  setNumItems,
  setPricePerItem,
  setRegionCode,
  setResult,
  startCalculation,
  useAppDispatch,
  useAppSelector,
} from '#/store';

export const useCalculator = () => {
  const dispatch = useAppDispatch();
  const { numItems, pricePerItem, regionCode, result, isCalculating, error } = useAppSelector(
    (state) => state.calculator,
  );

  const handleNumItemsChange = useCallback(
    (value: string) => {
      dispatch(setNumItems(value));
    },
    [dispatch],
  );

  const handlePricePerItemChange = useCallback(
    (value: string) => {
      dispatch(setPricePerItem(value));
    },
    [dispatch],
  );

  const handleRegionCodeChange = useCallback(
    (value: string) => {
      dispatch(setRegionCode(value));
    },
    [dispatch],
  );

  const handleCalculate = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      dispatch(startCalculation());

      const items = parseFloat(numItems);
      const price = parseFloat(pricePerItem);

      if (isNaN(items) || isNaN(price) || items <= 0 || price <= 0) {
        dispatch(setError('Please enter valid positive numbers'));
        return;
      }

      const calculation = calculateOrder(items, price, regionCode);
      dispatch(setResult(calculation));
    },
    [dispatch, numItems, pricePerItem, regionCode],
  );

  const handleReset = useCallback(() => {
    dispatch(resetCalculator());
  }, [dispatch]);

  return {
    numItems,
    pricePerItem,
    regionCode,
    result,
    isCalculating,
    error,
    handleNumItemsChange,
    handlePricePerItemChange,
    handleRegionCodeChange,
    handleCalculate,
    handleReset,
  };
};
