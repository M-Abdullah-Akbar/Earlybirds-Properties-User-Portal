"use client";
import React from 'react';

export default function PriceDisplay({ 
  price, 
  className = '', 
  showCurrency = true,
  priceOnRequest = false,
  priceOnRequestText = 'Price on request',
  currencySymbol = 'AED'
}) {
  // Handle price on request or invalid price
  if (priceOnRequest || !price || price === 0) {
    return (
      <span className={`price-display ${className}`}>
        {priceOnRequestText}
      </span>
    );
  }

  // Format the price
  const formattedNumber = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  const formattedPrice = showCurrency ? `${currencySymbol} ${formattedNumber}` : formattedNumber;

  return (
    <span className={`price-display ${className}`}>
      {formattedPrice}
    </span>
  );
}

// Utility component for rent prices (per month, per year, etc.)
export function RentPriceDisplay({ 
  price, 
  period = 'month',
  className = '', 
  showCurrency = true,
  priceOnRequest = false,
  currencySymbol = 'AED'
}) {
  const periodText = period ? `/${period}` : '';
  
  return (
    <span className={`rent-price-display ${className}`}>
      <PriceDisplay 
        price={price}
        showCurrency={showCurrency}
        priceOnRequest={priceOnRequest}
        priceOnRequestText={`Price on request${periodText}`}
        currencySymbol={currencySymbol}
      />
      {!priceOnRequest && price && price > 0 && (
        <span className="period-text">{periodText}</span>
      )}
    </span>
  );
}

// Utility component for sale prices
export function SalePriceDisplay({ 
  price, 
  className = '', 
  showCurrency = true,
  priceOnRequest = false,
  currencySymbol = 'AED'
}) {
  return (
    <span className={`sale-price-display ${className}`}>
      <PriceDisplay 
        price={price}
        showCurrency={showCurrency}
        priceOnRequest={priceOnRequest}
        priceOnRequestText="Price on request"
        currencySymbol={currencySymbol}
      />
    </span>
  );
}