// src/components/common/IconButton.jsx
const IconButton = ({ src, onClick, alt = "view details" }) => {
  return (
    <button 
      onClick={onClick}
      className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-all duration-200 flex items-center justify-center bg-white shadow-sm"
    >
      <img src={src} alt={alt} className="w-5 h-5 object-contain" />
    </button>
  );
};

export default IconButton;