export interface CalculationResult {
  subtotal: number;
  discount: number;
  discountPercentage: number;
  priceAfterDiscount: number;
  tax: number;
  taxPercentage: number;
  total: number;
}

export interface DiscountTier {
  threshold: number;
  percentage: number;
}

export interface TaxRate {
  code: string;
  rate: number;
}

export interface CalculatorState {
  numItems: string;
  pricePerItem: string;
  regionCode: string;
  result: CalculationResult | null;
  isCalculating: boolean;
  error: string | null;
}
