import React from 'react'

const Button = ({ children, variant = "primary", className = "", as = "button", ...props }) => {
  const base = "px-6 py-3 rounded-xl font-medium inline-flex items-center justify-center gap-2 transition duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60";
  const styles = {
    primary: "bg-[#0B78C1] text-white hover:bg-[#095a99] disabled:hover:bg-[#0B78C1]",
    secondary: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:hover:bg-white",
  };
  const Component = as;

  return (
    <Component className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </Component>
  );
};

export default Button