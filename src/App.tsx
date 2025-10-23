import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useCalculator } from '#/hooks';
import { DISCOUNT_TIERS, TAX_RATES } from '#/utils/calculator';
import './App.scss';

interface CalculatorFormValues {
  numItems: string;
  pricePerItem: string;
  regionCode: string;
}

function App() {
  const { result, error, calculate, handleReset } = useCalculator();

  const initialValues: CalculatorFormValues = {
    numItems: '',
    pricePerItem: '',
    regionCode: 'AUK',
  };

  const validate = (values: CalculatorFormValues) => {
    const errors: Partial<Record<keyof CalculatorFormValues, string>> = {};

    if (!values.numItems) {
      errors.numItems = 'Number of items is required';
    } else {
      const items = parseFloat(values.numItems);
      if (isNaN(items) || items <= 0) {
        errors.numItems = 'Please enter a valid positive number';
      }
    }

    if (!values.pricePerItem) {
      errors.pricePerItem = 'Price per item is required';
    } else {
      const price = parseFloat(values.pricePerItem);
      if (isNaN(price) || price <= 0) {
        errors.pricePerItem = 'Please enter a valid positive number';
      }
    }

    if (!values.regionCode) {
      errors.regionCode = 'Region code is required';
    }

    return errors;
  };

  const handleSubmit = (values: CalculatorFormValues) => {
    const items = parseFloat(values.numItems);
    const price = parseFloat(values.pricePerItem);

    calculate(items, price, values.regionCode);
  };

  const handleResetForm = (resetForm: () => void) => {
    handleReset();
    resetForm();
  };

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

        <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
          {({ resetForm }) => (
            <Form className="calculator-form">
              <div className="form-group">
                <label htmlFor="numItems">Number of Items</label>
                <Field
                  id="numItems"
                  name="numItems"
                  type="number"
                  placeholder="Enter number of items"
                  min="0"
                  step="1"
                />
                <ErrorMessage name="numItems" component="div" className="field-error" />
              </div>

              <div className="form-group">
                <label htmlFor="pricePerItem">Price per Item ($)</label>
                <Field
                  id="pricePerItem"
                  name="pricePerItem"
                  type="number"
                  placeholder="Enter price per item"
                  min="0"
                  step="0.01"
                />
                <ErrorMessage name="pricePerItem" component="div" className="field-error" />
              </div>

              <div className="form-group">
                <label htmlFor="regionCode">Region Code</label>
                <Field id="regionCode" name="regionCode" as="select">
                  {TAX_RATES.map((region) => (
                    <option key={region.code} value={region.code}>
                      {region.code} - {region.rate}% Tax
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="regionCode" component="div" className="field-error" />
              </div>

              <div className="button-group">
                <button type="submit" className="calculate-btn">
                  Calculate
                </button>
                {result && (
                  <button type="button" onClick={() => handleResetForm(resetForm)} className="reset-btn">
                    Reset
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>

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
