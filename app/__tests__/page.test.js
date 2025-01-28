import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import App from '../page';

fetchMock.enableMocks();

describe('App Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('renders the component correctly', () => {
    render(<App />);
    expect(screen.getByText(/Currency Converter/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter amount/i)).toBeInTheDocument();
  });

  it('fetches and displays currencies in the dropdown', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify([
        { code: 'USD', name: 'US Dollar', image: '/assets/icons/USD.png' },
        { code: 'EUR', name: 'Euro', image: '/assets/icons/EUR.png' },
      ])
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/US Dollar/i)).toBeInTheDocument();
      expect(screen.getByText(/Euro/i)).toBeInTheDocument();
    });
  });
});
