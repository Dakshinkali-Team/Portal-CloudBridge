import React from 'react';

const Input = ({ label, type = "text", placeholder, error, ...props }) => {
  return (
    <div className="flex flex-col mb-4 text-left">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        {...props}
        className={`
          /* Layout & Box Model */
          flex items-center self-stretch
          px-3.5 py-2.5 
          gap-(--spacing-md,8px)
          
          /* Style & Borders */
          bg-(--Colors-Background-bg-primary,#FFF)
          border ${error ? 'border-red-500' : 'border-(--Colors-Border-border-primary,#D5D7DA)'}
          rounded-(--radius-md,8px)
          
          /* Effects */
          shadow-[0_1px_2px_0_var(--Colors-Effects-Shadows-shadow-xs,rgba(10,13,18,0.05))]
          
          /* Interaction */
          w-full focus:outline-none ${error ? 'focus:ring-2 focus:ring-red-500' : 'focus:ring-2 focus:ring-blue-500'}
          placeholder:text-gray-400
        `}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;