const Button = ({ text, onClick, variant = "primary", icon }) => {
  const isGoogle = variant === "google";

  return (
    <button
      onClick={onClick}
      className={`w-full py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 mb-3 transition
      ${
        isGoogle
          ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {icon && <img src={icon} alt="icon" className="w-5" />}
      {text}
    </button>
  );
};

export default Button;
