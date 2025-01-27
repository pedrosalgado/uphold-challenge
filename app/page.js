'use client';

import React, { useState, useEffect } from 'react';
import SDK from '@uphold/uphold-sdk-javascript';
import Image from 'next/image';
import '../styles/main.css';
import '../styles/reset.css';
import CurrencyDropdown from '@/components/currencyDropdown';

const sdk = new SDK({
  baseUrl: 'http://api-sandbox.uphold.com',
  clientId: 'foo',
  clientSecret: 'bar',
});

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [exchangeRates, setExchangeRates] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState('AAVE');
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        console.log('SDK initialized successfully');

        // Fetch available currencies
        const response = await fetch('/api/assets');
        if (!response.ok) {
          throw new Error(`Error fetching assets: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setCurrencies(data);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, []);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      setLoading(true);
      try {
        const pairs = [
          `${baseCurrency}-AUD`,
          `${baseCurrency}-BAT`,
          `${baseCurrency}-BCH`,
          `${baseCurrency}-BTC`,
          `${baseCurrency}-CNY`,
          `${baseCurrency}-DKK`,
          `${baseCurrency}-ETH`,
          `${baseCurrency}-EUR`,
          `${baseCurrency}-GBP`,
          `${baseCurrency}-SEK`,
          `${baseCurrency}-USD`,
          `${baseCurrency}-SGD`,
        ].filter((pair) => !pair.startsWith(`${baseCurrency}-${baseCurrency}`));
        // Fetch exchange rates for specific pairs
        const promises = pairs.map((pair) => sdk.getTicker(pair));
        const responses = await Promise.all(promises);

        // Flatten and filter results
        // const filteredRates = responses.filter(rate => rate.currency);
        setExchangeRates(responses);

        // const response = await sdk.getTicker(baseCurrency);
        // // console.log(response);
        // setExchangeRates(response);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, [baseCurrency]);

  // useEffect(() => {
  //     if (currencies.length > 0) {
  //         setBaseCurrency(currencies[0].'USD');
  //     }
  // }, [currencies]);

  // const handleBaseCurrencyChange = (event) => {
  //     setBaseCurrency(event.target.value);
  // };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Currency Converter</h1>
      <p className="app-description">
        Receive competitive and transparent pricing with no hidden spreads. See
        how we compare.
      </p>
      <div className="input-container">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
          className="amount-input"
        />

        <CurrencyDropdown
          currencies={currencies}
          baseCurrency={baseCurrency}
          setBaseCurrency={setBaseCurrency}
        />
        {/*<select*/}
        {/*    value={baseCurrency}*/}
        {/*    onChange={handleBaseCurrencyChange}*/}
        {/*    className="currency-select"*/}
        {/*>*/}
        {/*    {currencies.map((currency) => (*/}
        {/*        <option key={currency.code} value={currency.code}>*/}
        {/*            <span className="dropdown-option">*/}
        {/*            <Image*/}
        {/*            src={currency.image}*/}
        {/*            alt={currency.code}*/}
        {/*            width={16}*/}
        {/*            height={16}*/}
        {/*            />*/}
        {/*                {currency.name} ({currency.code})*/}
        {/*            </span>*/}
        {/*        </option>*/}
        {/*    ))}*/}
        {/*</select>*/}
      </div>
      <p className="helper-text">Enter an amount to check the rates.</p>
      <div className="rates-container">
        {loading ? (
          <p className="loading-text">Loading exchange rates...</p>
        ) : (
          <div className="rates-list">
            {exchangeRates.map((rate) => (
              <div key={`${rate.pair}-${rate.currency}`} className="rate-item">
                <div className="currency-info">
                  <Image
                    src={`/assets/icons/${rate.currency}.png`}
                    alt={rate.currency}
                    width={24}
                    height={24}
                  />
                  <span>{rate.currency}</span>
                </div>
                <span className="currency-rate">
                  {(rate.bid * amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
