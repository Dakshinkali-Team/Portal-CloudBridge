// src/components/cloud/services/ServiceFilterGroup.jsx

import FilterButton from "../../common/FilterButton";

const tabs = ["All", "Active", "Pending", "Cancelled"];

const ServiceFilterGroup = ({ active, setActive }) => {
  return (
    <div className="flex gap-2 mb-6">
      {tabs.map((tab) => (
        <FilterButton
          key={tab}
          label={tab}
          active={active === tab}
          onClick={() => setActive(tab)}
        />
      ))}
    </div>
  );
};

export default ServiceFilterGroup;