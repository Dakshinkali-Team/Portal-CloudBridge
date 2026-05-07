// src/components/common/FilterButton.jsx

const FilterButton = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 text-sm rounded-md border transition
        ${
          active
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
        }`}
    >
      {label}
    </button>
  );
};

export default FilterButton;