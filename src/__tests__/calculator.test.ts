import { describe, expect, it } from '@jest/globals';
import { DISCOUNT_TIERS, TAX_RATES, calculateOrder, getDiscountPercentage, getTaxRate } from '#/utils/calculator';

describe('Calculator Utilities', () => {
  describe('getDiscountPercentage', () => {
    it('returns 0% for order values below first tier (< 1000)', () => {
      expect(getDiscountPercentage(999)).toBe(0);
      expect(getDiscountPercentage(0)).toBe(0);
      expect(getDiscountPercentage(500)).toBe(0);
    });

    it('returns 3% for order values 1000-4999', () => {
      expect(getDiscountPercentage(1000)).toBe(3);
      expect(getDiscountPercentage(2500)).toBe(3);
      expect(getDiscountPercentage(4999)).toBe(3);
    });

    it('returns 5% for order values 5000-6999', () => {
      expect(getDiscountPercentage(5000)).toBe(5);
      expect(getDiscountPercentage(6000)).toBe(5);
      expect(getDiscountPercentage(6999)).toBe(5);
    });

    it('returns 7% for order values 7000-9999', () => {
      expect(getDiscountPercentage(7000)).toBe(7);
      expect(getDiscountPercentage(8500)).toBe(7);
      expect(getDiscountPercentage(9999)).toBe(7);
    });

    it('returns 10% for order values 10000-49999', () => {
      expect(getDiscountPercentage(10000)).toBe(10);
      expect(getDiscountPercentage(25000)).toBe(10);
      expect(getDiscountPercentage(49999)).toBe(10);
    });

    it('returns 15% for order values 50000 and above', () => {
      expect(getDiscountPercentage(50000)).toBe(15);
      expect(getDiscountPercentage(75000)).toBe(15);
      expect(getDiscountPercentage(100000)).toBe(15);
    });
  });

  describe('getTaxRate', () => {
    it('returns correct tax rate for AUK', () => {
      expect(getTaxRate('AUK')).toBe(6.85);
    });

    it('returns correct tax rate for WLG', () => {
      expect(getTaxRate('WLG')).toBe(8.0);
    });

    it('returns correct tax rate for WAI', () => {
      expect(getTaxRate('WAI')).toBe(6.25);
    });

    it('returns correct tax rate for CHC', () => {
      expect(getTaxRate('CHC')).toBe(4.0);
    });

    it('returns correct tax rate for TAS', () => {
      expect(getTaxRate('TAS')).toBe(8.25);
    });

    it('is case-insensitive for region codes', () => {
      expect(getTaxRate('auk')).toBe(6.85);
      expect(getTaxRate('WlG')).toBe(8.0);
      expect(getTaxRate('Wai')).toBe(6.25);
    });

    it('returns 0 for unknown region codes', () => {
      expect(getTaxRate('INVALID')).toBe(0);
      expect(getTaxRate('')).toBe(0);
      expect(getTaxRate('XYZ')).toBe(0);
    });
  });

  describe('calculateOrder', () => {
    it('calculates correct order with no discount (below 1000)', () => {
      const result = calculateOrder(10, 50, 'AUK');

      expect(result.subtotal).toBe(500);
      expect(result.discountPercentage).toBe(0);
      expect(result.discount).toBe(0);
      expect(result.priceAfterDiscount).toBe(500);
      expect(result.taxPercentage).toBe(6.85);
      expect(result.tax).toBe(34.25);
      expect(result.total).toBe(534.25);
    });

    it('calculates correct order with 3% discount (1000-4999)', () => {
      const result = calculateOrder(25, 50, 'WLG');

      expect(result.subtotal).toBe(1250);
      expect(result.discountPercentage).toBe(3);
      expect(result.discount).toBe(37.5);
      expect(result.priceAfterDiscount).toBe(1212.5);
      expect(result.taxPercentage).toBe(8.0);
      expect(result.tax).toBe(97);
      expect(result.total).toBe(1309.5);
    });

    it('calculates correct order with 5% discount (5000-6999)', () => {
      const result = calculateOrder(100, 60, 'WAI');

      expect(result.subtotal).toBe(6000);
      expect(result.discountPercentage).toBe(5);
      expect(result.discount).toBe(300);
      expect(result.priceAfterDiscount).toBe(5700);
      expect(result.taxPercentage).toBe(6.25);
      expect(result.tax).toBe(356.25);
      expect(result.total).toBe(6056.25);
    });

    it('calculates correct order with 7% discount (7000-9999)', () => {
      const result = calculateOrder(200, 40, 'CHC');

      expect(result.subtotal).toBe(8000);
      expect(result.discountPercentage).toBe(7);
      expect(result.discount).toBe(560);
      expect(result.priceAfterDiscount).toBe(7440);
      expect(result.taxPercentage).toBe(4.0);
      expect(result.tax).toBe(297.6);
      expect(result.total).toBe(7737.6);
    });

    it('calculates correct order with 10% discount (10000-49999)', () => {
      const result = calculateOrder(250, 50, 'TAS');

      expect(result.subtotal).toBe(12500);
      expect(result.discountPercentage).toBe(10);
      expect(result.discount).toBe(1250);
      expect(result.priceAfterDiscount).toBe(11250);
      expect(result.taxPercentage).toBe(8.25);
      expect(result.tax).toBe(928.125);
      expect(result.total).toBe(12178.125);
    });

    it('calculates correct order with 15% discount (50000+)', () => {
      const result = calculateOrder(1000, 60, 'AUK');

      expect(result.subtotal).toBe(60000);
      expect(result.discountPercentage).toBe(15);
      expect(result.discount).toBe(9000);
      expect(result.priceAfterDiscount).toBe(51000);
      expect(result.taxPercentage).toBe(6.85);
      expect(result.tax).toBe(3493.5);
      expect(result.total).toBe(54493.5);
    });

    it('handles unknown region code with 0% tax', () => {
      const result = calculateOrder(10, 50, 'INVALID');

      expect(result.subtotal).toBe(500);
      expect(result.taxPercentage).toBe(0);
      expect(result.tax).toBe(0);
      expect(result.total).toBe(500);
    });

    it('handles decimal prices correctly', () => {
      const result = calculateOrder(3, 19.99, 'WLG');

      expect(result.subtotal).toBeCloseTo(59.97, 2);
      expect(result.discountPercentage).toBe(0);
      expect(result.discount).toBe(0);
      expect(result.priceAfterDiscount).toBeCloseTo(59.97, 2);
      expect(result.tax).toBeCloseTo(4.8, 2);
      expect(result.total).toBeCloseTo(64.77, 2);
    });

    it('verifies discount tiers configuration', () => {
      expect(DISCOUNT_TIERS).toHaveLength(5);
      expect(DISCOUNT_TIERS[0]).toEqual({ threshold: 50000, percentage: 15 });
      expect(DISCOUNT_TIERS[1]).toEqual({ threshold: 10000, percentage: 10 });
      expect(DISCOUNT_TIERS[2]).toEqual({ threshold: 7000, percentage: 7 });
      expect(DISCOUNT_TIERS[3]).toEqual({ threshold: 5000, percentage: 5 });
      expect(DISCOUNT_TIERS[4]).toEqual({ threshold: 1000, percentage: 3 });
    });

    it('verifies tax rates configuration', () => {
      expect(TAX_RATES).toHaveLength(5);
      expect(TAX_RATES).toContainEqual({ code: 'AUK', rate: 6.85 });
      expect(TAX_RATES).toContainEqual({ code: 'WLG', rate: 8.0 });
      expect(TAX_RATES).toContainEqual({ code: 'WAI', rate: 6.25 });
      expect(TAX_RATES).toContainEqual({ code: 'CHC', rate: 4.0 });
      expect(TAX_RATES).toContainEqual({ code: 'TAS', rate: 8.25 });
    });
  });
});
