import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CurrencyDropdown from '../currencyDropdown';

const mockSetBaseCurrency = jest.fn();

const mockCurrencies = [
  {
    code: 'USD',
    name: 'US Dollar',
    image: '/assets/icons/USD.png',
  },
  {
    code: 'EUR',
    name: 'Euro',
    image: '/assets/icons/EUR.png',
  },
  {
    code: 'GBP',
    name: 'British Pound',
    image: '/assets/icons/GBP.png',
  },
];

describe('CurrencyDropdown Component', () => {
  it('renders the dropdown with the selected currency', () => {
    render(
      <CurrencyDropdown
        currencies={mockCurrencies}
        baseCurrency="USD"
        setBaseCurrency={mockSetBaseCurrency}
      />
    );

    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByAltText('USD')).toHaveAttribute(
      'src',
      '/assets/icons/USD.png'
    );
  });
});
