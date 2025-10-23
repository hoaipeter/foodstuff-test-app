import type { CalculationResult, DiscountTier, TaxRate } from '#/types';

export const DISCOUNT_TIERS: DiscountTier[] = [
  { threshold: 50000, percentage: 15 },
  { threshold: 10000, percentage: 10 },
  { threshold: 7000, percentage: 7 },
  { threshold: 5000, percentage: 5 },
  { threshold: 1000, percentage: 3 },
];

export const TAX_RATES: TaxRate[] = [
  { code: 'AUK', rate: 6.85 },
  { code: 'WLG', rate: 8.0 },
  { code: 'WAI', rate: 6.25 },
  { code: 'CHC', rate: 4.0 },
  { code: 'TAS', rate: 8.25 },
];

export function getDiscountPercentage(orderValue: number): number {
  for (const tier of DISCOUNT_TIERS) {
    if (orderValue >= tier.threshold) {
      return tier.percentage;
    }
  }
  return 0;
}

export function getTaxRate(regionCode: string): number {
  const region = TAX_RATES.find((r) => r.code.toUpperCase() === regionCode.toUpperCase());
  return region ? region.rate : 0;
}

export function calculateOrder(numItems: number, pricePerItem: number, regionCode: string): CalculationResult {
  const subtotal = numItems * pricePerItem;
  const discountPercentage = getDiscountPercentage(subtotal);
  const discount = (subtotal * discountPercentage) / 100;
  const priceAfterDiscount = subtotal - discount;
  const taxPercentage = getTaxRate(regionCode);
  const tax = (priceAfterDiscount * taxPercentage) / 100;
  const total = priceAfterDiscount + tax;

  return {
    subtotal,
    discount,
    discountPercentage,
    priceAfterDiscount,
    tax,
    taxPercentage,
    total,
  };
}
