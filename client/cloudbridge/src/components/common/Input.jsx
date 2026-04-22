// src/components/common/Input.jsx
import React from 'react';

const Input = ({ placeholder, type = "text", ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="
        rounded-[8px] 
        border border-[#D5D7DA] 
        bg-[#FFF] 
        shadow-[0_1px_2px_0_rgba(10,13,18,0.05)] 
        flex items-center 
        px-[14px] py-[10px] 
        gap-[8px] 
        self-stretch 
        outline-none 
        focus:ring-2 focus:ring-blue-500
      "
      {...props}
    />
  );
};

export default Input;