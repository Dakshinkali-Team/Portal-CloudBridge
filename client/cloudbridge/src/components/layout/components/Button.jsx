import React from 'react'

const Button = ({ children, variant = "primary", as = "button", ...props}) => {

    const base = "px-6 py-3 rounded-lg font-medium";
    const styles = {
        primary: "bg-[#0B78C1] text-white",
        secondary: "border border-gray-300 text-gray-700",
    };
    const Component = as;
    
  return (
     <Component className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </Component>
  )
}

export default Button