"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Convert } from 'easy-currencies';

const SUPPORTED_CURRENCIES = [
  { code: 'AED', name: 'UAE Dirham' },
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'SAR', name: 'Saudi Riyal' },
  { code: 'QAR', name: 'Qatari Riyal' },
  { code: 'KWD', name: 'Kuwaiti Dinar' },
  { code: 'BHD', name: 'Bahraini Dinar' },
  { code: 'OMR', name: 'Omani Rial' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'PKR', name: 'Pakistani Rupee' },
  { code: 'EGP', name: 'Egyptian Pound' },
  { code: 'JOD', name: 'Jordanian Dinar' },
  { code: 'LBP', name: 'Lebanese Pound' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'CNY', name: 'Chinese Yuan' },
  { code: 'CHF', name: 'Swiss Franc' },
  { code: 'SEK', name: 'Swedish Krona' },
  { code: 'NOK', name: 'Norwegian Krone' },
  { code: 'DKK', name: 'Danish Krone' },
  { code: 'RUB', name: 'Russian Ruble' },
  { code: 'TRY', name: 'Turkish Lira' },
  { code: 'ZAR', name: 'South African Rand' },
  { code: 'BRL', name: 'Brazilian Real' },
  { code: 'MXN', name: 'Mexican Peso' },
  { code: 'SGD', name: 'Singapore Dollar' },
  { code: 'HKD', name: 'Hong Kong Dollar' },
  { code: 'KRW', name: 'South Korean Won' },
  { code: 'THB', name: 'Thai Baht' },
  { code: 'MYR', name: 'Malaysian Ringgit' },
  { code: 'IDR', name: 'Indonesian Rupiah' },
  { code: 'PHP', name: 'Philippine Peso' },
  { code: 'VND', name: 'Vietnamese Dong' },
  { code: 'TWD', name: 'Taiwan Dollar' },
  { code: 'NZD', name: 'New Zealand Dollar' },
  { code: 'ILS', name: 'Israeli Shekel' },
  { code: 'CZK', name: 'Czech Koruna' },
  { code: 'HUF', name: 'Hungarian Forint' },
  { code: 'PLN', name: 'Polish Zloty' },
  { code: 'RON', name: 'Romanian Leu' },
  { code: 'BGN', name: 'Bulgarian Lev' },
  { code: 'HRK', name: 'Croatian Kuna' },
  { code: 'ISK', name: 'Icelandic Krona' },
  { code: 'CLP', name: 'Chilean Peso' },
  { code: 'COP', name: 'Colombian Peso' },
  { code: 'PEN', name: 'Peruvian Sol' },
  { code: 'UYU', name: 'Uruguayan Peso' },
  { code: 'ARS', name: 'Argentine Peso' }
];

export default function CurrencyConverter({ 
  price, 
  baseCurrency = 'AED', 
  onCurrencyChange,
  className = '',
  showCurrencyName = false,
  compact = false,
  animated = true
}) {
  const [selectedCurrency, setSelectedCurrency] = useState(baseCurrency);
  const [convertedPrice, setConvertedPrice] = useState(price);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef();
  const optionsRef = useRef();

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Get currency display options (top 5 only)
  const getCurrencyOptions = () => {
    return SUPPORTED_CURRENCIES.slice(0, 5).map(currency => ({
      ...currency,
      display: showCurrencyName ? `${currency.code} - ${currency.name}` : currency.code
    }));
  };

  const currencyOptions = getCurrencyOptions();
  const selectedCurrencyData = SUPPORTED_CURRENCIES.find(c => c.code === selectedCurrency);

  // Convert currency using easy-currencies
  const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    if (fromCurrency === toCurrency || !amount || amount === 0) {
      return amount;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // Use easy-currencies for conversion with correct syntax
      const result = await Convert(amount).from(fromCurrency).to(toCurrency);
      return result;
    } catch (err) {
      console.error('Currency conversion error:', err);
      setError('Conversion failed');
      return amount; // Return original amount on error
    } finally {
      setIsLoading(false);
    }
  };

  // Handle currency change
  const handleCurrencyChange = async (newCurrency) => {
    if (newCurrency === selectedCurrency) return;
    
    const converted = await convertCurrency(baseCurrency, newCurrency, price);
    setConvertedPrice(converted);
    setSelectedCurrency(newCurrency);
    
    if (onCurrencyChange) {
      onCurrencyChange({
        currency: newCurrency,
        convertedPrice: converted,
        originalPrice: price,
        baseCurrency
      });
    }
  };

  // Initialize conversion on mount
  useEffect(() => {
    if (selectedCurrency !== baseCurrency) {
      handleCurrencyChange(selectedCurrency);
    } else {
      setConvertedPrice(price);
    }
  }, [price, baseCurrency]);





  // Format the converted price
  const formatPrice = (amount) => {
    if (!amount || amount === 0) return '0';
    
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: selectedCurrency === 'JPY' || selectedCurrency === 'KRW' ? 0 : 2,
    }).format(amount);
  };

  if (!price || price === 0) {
    return null;
  }

  return (
    <div className={`currency-converter-wrapper ${compact ? 'compact' : ''} ${animated ? 'animated' : ''} ${className}`}>
      <div className="price-container">
        <div className="price-display">
          {isLoading ? (
            <div className="loading-indicator">
              <span className="loading-spinner"></span>
              <span className="loading-text">Converting...</span>
            </div>
          ) : error ? (
            <div className="price-error">
              <span className="currency-code">{selectedCurrency}</span>
              <span className="price-amount">{formatPrice(price)}</span>
            </div>
          ) : (
            <div className="price-success">
              <span className="currency-code">{selectedCurrency}</span>
              <span className="price-amount">{formatPrice(convertedPrice)}</span>
            </div>
          )}
        </div>
        
        <div className="currency-dropdown">
          <div className={`dropdown-container ${isOpen ? 'active' : ''}`} ref={selectRef}>
            <button 
              className="dropdown-trigger" 
              onClick={toggleDropdown}
              type="button"
            >
              <span className="selected-currency">{selectedCurrency}</span>
              <svg className="dropdown-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className={`dropdown-menu ${isOpen ? 'open' : 'closed'}`} ref={optionsRef}>
              <div className="dropdown-content">
                {currencyOptions.map((currency) => (
                  <button
                    key={currency.code}
                    type="button"
                    onClick={() => {
                      handleCurrencyChange(currency.code);
                      setIsOpen(false);
                    }}
                    className={`dropdown-option ${
                      selectedCurrency === currency.code ? 'selected' : ''
                    }`}
                  >
                    <span className="option-code">{currency.code}</span>
                    {showCurrencyName && (
                      <span className="option-name">{currency.name}</span>
                    )}
                    {selectedCurrency === currency.code && (
                      <svg className="check-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="error-message">
          <svg className="error-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L13 12H1L7 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 10H7.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

// Hook for managing global currency preference
export function useCurrencyPreference() {
  const [preferredCurrency, setPreferredCurrency] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('preferredCurrency') || 'AED';
    }
    return 'AED';
  });

  const updateCurrencyPreference = (currency) => {
    setPreferredCurrency(currency);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredCurrency', currency);
    }
  };

  return [preferredCurrency, updateCurrencyPreference];
}