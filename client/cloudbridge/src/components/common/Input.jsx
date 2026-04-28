// src/components/common/Input.jsx
import React from 'react';

const Input = ({ label, type = "text", placeholder, ...props }) => {
  return (
    <div className="mb-4 text-left">
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...props}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg 
        focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
export default Input;

