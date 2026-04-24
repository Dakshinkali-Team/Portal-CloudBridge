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
// import React from 'react';

// const Input = ({ label, placeholder, value, onChange, type = "text" }) => {
//   return (
//     <div style={{ marginBottom: '16px' }}>
//       {/* Label */}
//       {label && (
//         <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
//           {label}
//         </label>
//       )}
      
//       {/* Input Field */}
//       <input
//         type={type}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         style={{
//           width: '100%',
//           padding: '10px',
//           border: '1px solid #ccc',
//           borderRadius: '4px',
//           outline: 'none'
//         }}
//       />
//     </div>
//   );
// };

// export default Input;