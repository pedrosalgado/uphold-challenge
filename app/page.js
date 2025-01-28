'use client';

import React, { useState, useEffect } from 'react';
import SDK from '@uphold/uphold-sdk-javascript';
import Image from 'next/image';
import '../styles/main.css';
import Header from '../components/header';
import Footer from '../components/footer';
import CurrencyDropdown from '@/components/currencyDropdown';
import { useDebounce } from '@/hooks/useDebounce';

const sdk = new SDK({
  baseUrl: process.env.NEXT_PUBLIC_UPHOLD_BASE_URL,
  clientId: process.env.NEXT_PUBLIC_UPHOLD_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_UPHOLD_CLIENT_SECRET,
});

const MAX_CACHE_SIZE = 10;

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [cache, setCache] = useState({});
  const [exchangeRates, setExchangeRates] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('/api/assets');
        if (!response.ok) {
          throw new Error(`Error fetching assets: ${response.status}`);
        }
        const data = await response.json();
        setCurrencies(data);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, []);

  useDebounce(
    () => {
      if (!amount || amount <= 0) {
        setExchangeRates([]);
        return;
      }

      setHasInteracted(true);

      const fetchExchangeRates = async () => {
        setLoading(true);
        if (cache[baseCurrency]) {
          setExchangeRates(cache[baseCurrency]);
          setLoading(false);
          return;
        }
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
          ].filter(
            (pair) => !pair.startsWith(`${baseCurrency}-${baseCurrency}`)
          );

          const promises = pairs.map((pair) => sdk.getTicker(pair));
          const responses = await Promise.all(promises);
          setExchangeRates(responses);
          setCache((prevCache) => {
            const newCache = { ...prevCache, [baseCurrency]: responses };

            // Log the updated cache
            console.log('Updated Cache:', newCache);

            const keys = Object.keys(newCache);
            if (keys.length > MAX_CACHE_SIZE) {
              delete newCache[keys[0]]; // Remove the first key (oldest entry)
            }

            return newCache;
          });
        } catch (error) {
          console.error('Error fetching exchange rates:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchExchangeRates();
    },
    300,
    [baseCurrency, amount]
  );

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <>
      <Header />
      <div className="app-container">
        <h1 className="app-title">Currency Converter</h1>
        <p className="app-description">
          Receive competitive and transparent pricing with no hidden spreads.
          See how we compare.
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
        </div>
        <p className="helper-text">Enter an amount to check the rates.</p>
        <div className="rates-container">
          {loading && hasInteracted ? (
            <p className="loading-text">Loading exchange rates...</p>
          ) : (
            <div className="rates-list">
              {exchangeRates.map((rate) => (
                <div
                  key={`${rate.pair}-${rate.currency}`}
                  className="rate-item"
                >
                  <div className="currency-info">
                    <Image
                      src={`/assets/icons/${rate.currency}.png`}
                      alt={rate.currency}
                      width={24}
                      height={24}
                      srcSet={`/assets/icons/${rate.currency}.png 1x, /assets/icons/${rate.currency}@2x.png 2x, /assets/icons/${rate.currency}@3x.png 3x`}
                      onError={(e) => {
                        e.target.src = '/assets/icons/USD.png';
                      }}
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
      <Footer />
    </>
  );
};

export default App;
