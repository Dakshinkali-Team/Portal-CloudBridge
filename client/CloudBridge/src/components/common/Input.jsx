// src/components/common/Input.jsx
import React from 'react';

const Input = ({ label, placeholder, value, onChange, type = "text" }) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      {/* Label */}
      {label && (
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
          {label}
        </label>
      )}
      
      {/* Input Field */}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          outline: 'none'
        }}
      />
    </div>
  );
};

export default Input;