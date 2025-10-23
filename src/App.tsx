import { useCalculator } from '#/hooks';
import { DISCOUNT_TIERS, TAX_RATES } from '#/store';
import './App.css';

function App() {
  const {
    numItems,
    pricePerItem,
    regionCode,
    result,
    error,
    handleNumItemsChange,
    handlePricePerItemChange,
    handleRegionCodeChange,
    handleCalculate,
    handleReset,
  } = useCalculator();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Retail Calculator</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleCalculate} className="calculator-form">
          <div className="form-group">
            <label htmlFor="numItems">Number of Items</label>
            <input
              id="numItems"
              type="number"
              value={numItems}
              onChange={(e) => handleNumItemsChange(e.target.value)}
              placeholder="Enter number of items"
              min="0"
              step="1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="pricePerItem">Price per Item ($)</label>
            <input
              id="pricePerItem"
              type="number"
              value={pricePerItem}
              onChange={(e) => handlePricePerItemChange(e.target.value)}
              placeholder="Enter price per item"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="regionCode">Region Code</label>
            <select
              id="regionCode"
              value={regionCode}
              onChange={(e) => handleRegionCodeChange(e.target.value)}
              required
            >
              {TAX_RATES.map((region) => (
                <option key={region.code} value={region.code}>
                  {region.code} - {region.rate}% Tax
                </option>
              ))}
            </select>
          </div>

          <div className="button-group">
            <button type="submit" className="calculate-btn">
              Calculate
            </button>
            {result && (
              <button type="button" onClick={handleReset} className="reset-btn">
                Reset
              </button>
            )}
          </div>
        </form>

        {result && (
          <div className="results">
            <h2>Calculation Results</h2>
            <div className="result-grid">
              <div className="result-item">
                <span className="result-label">Subtotal:</span>
                <span className="result-value">{formatCurrency(result.subtotal)}</span>
              </div>
              <div className="result-item highlight">
                <span className="result-label">Discount ({result.discountPercentage}%):</span>
                <span className="result-value discount">-{formatCurrency(result.discount)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Price After Discount:</span>
                <span className="result-value">{formatCurrency(result.priceAfterDiscount)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Tax ({result.taxPercentage}%):</span>
                <span className="result-value">{formatCurrency(result.tax)}</span>
              </div>
              <div className="result-item total">
                <span className="result-label">Total:</span>
                <span className="result-value">{formatCurrency(result.total)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="reference-tables">
          <div className="reference-table">
            <h3>Discount Tiers</h3>
            <table>
              <thead>
                <tr>
                  <th>Order Value</th>
                  <th>Discount</th>
                </tr>
              </thead>
              <tbody>
                {DISCOUNT_TIERS.map((tier) => (
                  <tr key={tier.threshold}>
                    <td>{formatCurrency(tier.threshold)}+</td>
                    <td>{tier.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="reference-table">
            <h3>Tax Rates by Region</h3>
            <table>
              <thead>
                <tr>
                  <th>Region</th>
                  <th>Tax Rate</th>
                </tr>
              </thead>
              <tbody>
                {TAX_RATES.map((rate) => (
                  <tr key={rate.code}>
                    <td>{rate.code}</td>
                    <td>{rate.rate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
