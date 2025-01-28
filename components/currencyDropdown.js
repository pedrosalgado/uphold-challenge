import { useState } from 'react';
import Image from 'next/image';
import '../styles/currencyDropdown.css';

const CurrencyDropdown = ({ currencies, baseCurrency, setBaseCurrency }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedCurrency = currencies.find((cur) => cur.code === baseCurrency);

  const handleSelect = (code) => {
    setBaseCurrency(code);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button onClick={() => setIsOpen(!isOpen)} className="dropdown-button">
        {baseCurrency && (
          <div className="dropdown-selected">
            {selectedCurrency?.image && (
              <Image
                src={selectedCurrency.image}
                alt={baseCurrency}
                width={16}
                height={16}
              />
            )}
            <span>{baseCurrency}</span>
          </div>
        )}
        <Image
          src="/assets/dropdown-icon.svg"
          alt="Dropdown Icon"
          width={12}
          height={12}
          className="dropdown-arrow"
        />
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {currencies.map((currency) => (
            <div
              key={currency.code}
              className="dropdown-item"
              onClick={() => handleSelect(currency.code)}
            >
              <Image
                src={currency.image}
                alt={currency.code}
                width={16}
                height={16}
              />
              <span>
                {currency.name} ({currency.code})
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencyDropdown;
