'use client';

import React, { useState, useEffect } from 'react';
import SDK from '@uphold/uphold-sdk-javascript';

const sdk = new SDK({
    baseUrl: 'http://api-sandbox.uphold.com',
    clientId: 'foo',
    clientSecret: 'bar',
});

const App = () => {
    const [currencies, setCurrencies] = useState([]);
    const [exchangeRates, setExchangeRates] = useState([]);
    const [baseCurrency, setBaseCurrency] = useState('USD');
    const [amount, setAmount] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeSDK = async () => {
            try {
                console.log('SDK initialized successfully');
                // Perform SDK authorization
                // await sdk.authorize('code'); // Replace 'code' with the appropriate authorization code if required
                // console.log('SDK authorized successfully');

                // Fetch available currencies
                // const response = await sdk.api('GET', '/v0/assets');
                const response = await fetch('/api/assets');
                if (!response.ok) {
                    throw new Error(`Error fetching assets: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setCurrencies(data.filter((asset) => asset.status === 'open'));
            } catch (error) {
                console.error('Error fetching currencies:', error);
            }
        };

        initializeSDK();
    }, []);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            setLoading(true);
            try {
                const pairs = [
                    `${baseCurrency}-USD`,
                    `${baseCurrency}-EUR`,
                    `${baseCurrency}-JPY`,
                    `${baseCurrency}-GBP`,
                    `${baseCurrency}-CNY`,
                    `${baseCurrency}-AUD`,
                    `${baseCurrency}-CAD`,
                    `${baseCurrency}-CHF`,
                    `${baseCurrency}-HKD`,
                    `${baseCurrency}-NZD`,
                    `${baseCurrency}-SEK`,
                    `${baseCurrency}-SGD`
                ].filter(pair => !pair.startsWith(`${baseCurrency}-${baseCurrency}`));
                // Fetch exchange rates for specific pairs
                const promises = pairs.map(pair => sdk.getTicker(pair));
                const responses = await Promise.all(promises);

                // Flatten and filter results
                const filteredRates = responses.filter(rate => rate.currency);
                setExchangeRates(filteredRates);

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

    const handleBaseCurrencyChange = (event) => {
        setBaseCurrency(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    return (
        <div>
            <h1>Assessment Challenge</h1>
            <div>
                <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="Enter amount"
                />
                <select value={baseCurrency} onChange={handleBaseCurrencyChange}>
                    {currencies.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                {loading ? (
                    <p>Loading exchange rates...</p>
                ) : (
                    <table>
                        <thead>
                        <tr>
                            <th>Currency</th>
                            <th>Rate</th>
                        </tr>
                        </thead>
                        <tbody>
                        {exchangeRates.map((rate) => (
                            <tr key={`${rate.pair}-${rate.currency}`}>
                                <td>{rate.currency}</td>
                                <td>{(rate.bid * amount).toFixed(2)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default App;