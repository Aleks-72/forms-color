import React, { useState } from 'react';
import './ColorConverter.css';

const hexToRgb = (hex) => {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
};

const isValidHex = (value) => {
  const hexRegex = /^#[0-9A-Fa-f]{6}$/;
  return hexRegex.test(value);
};

export default function ColorConverter() {
  const [hexValue, setHexValue] = useState('#');
  const [error, setError] = useState(false);
  const [rgbValue, setRgbValue] = useState('');

  const handleHexChange = (e) => {
    if (e.target.value.length < hexValue.length && hexValue.length <= 1) {
      setHexValue('#');
      setRgbValue('');
      setError(false);
      return;
    }

    const rawValue = e.target.value.slice(1);
    
    const cleanValue = rawValue.replace(/[^0-9A-Fa-f]/g, '').slice(0, 6);
    
    const newHexValue = `#${cleanValue}`;
    setHexValue(newHexValue);

    if (cleanValue.length === 6) {
      if (isValidHex(newHexValue)) {
        setError(false);
        setRgbValue(hexToRgb(newHexValue));
      } else {
        setError(true);
        setRgbValue('Ошибка');
      }
    } else {
      setError(false);
      setRgbValue('');
    }
  };

  const handleHexSelect = (e) => {
    if (e.target.selectionStart === 0) {
      e.target.setSelectionRange(1, e.target.selectionEnd);
    }
  };

  const pageStyle = {
    backgroundColor: hexValue.length === 7 && !error ? hexValue : '#f5f5f5',
    transition: 'background-color 0.3s ease',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box'
  };

  return (
    <div style={pageStyle}>
      <div className="converter-wrapper">
        <input
          type="text"
          value={hexValue}
          onChange={handleHexChange}
          onSelect={handleHexSelect}
          maxLength={7}
          className="hex-input"
        />
        
        <input
          type="text"
          value={rgbValue}
          readOnly
          className={`rgb-output ${error ? 'error' : ''}`}
        />
      </div>
    </div>
  );
}