import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Card from "../components/cloud/requestservices/RequestCard";
import ServiceItem from "../components/cloud/requestservices/RequestServiceItem";
import SummaryCard from "../components/cloud/requestservices/RequestSummaryCard";

import ComputeIcon from "../assets/serviceRequestIcons/Compute.png";
import StorageIcon from "../assets/serviceRequestIcons/Storage.png";
import DatabaseIcon from "../assets/serviceRequestIcons/Database.png";
import NetworkIcon from "../assets/serviceRequestIcons/Network.png";
import EnterpriseIcon from "../assets/serviceRequestIcons/Enterprise.png";

const servicesData = [
  { id: 1, name: "Virtual Machine - Small", price: 50 },
  { id: 2, name: "Virtual Machine - Medium", price: 100 },
  { id: 3, name: "Virtual Machine - Large", price: 200 },

  { id: 4, name: "Block Storage - 100GB", price: 10 },
  { id: 5, name: "Block Storage - 500GB", price: 40 },
  { id: 6, name: "Block Storage - 1TB", price: 75 },

  { id: 7, name: "PostgreSQL Instance", price: 80 },
  { id: 8, name: "MySQL Instance", price: 75 },
  { id: 9, name: "Redis Cache", price: 60 },

  { id: 10, name: "Load Balancer", price: 50 },
  { id: 11, name: "VPN Gateway", price: 40 },
  { id: 12, name: "CDN Service", price: 30 },
];

const ServiceRequest = () => {
  const [selected, setSelected] = useState([]);

  const handleToggle = (service) => {
    const exists = selected.find((s) => s.id === service.id);

    if (exists) {
      setSelected(selected.filter((s) => s.id !== service.id));
    } else {
      setSelected([...selected, service]);
    }
  };

  const total = selected.reduce((sum, item) => sum + item.price, 0);
  const count = selected.length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-4xl font-bold">New Service Request</h1>
          <p className="text-left -mt-4 pb-2">
            Select the cloud services you need and submit the request
          </p>

          {/* COMPUTE */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <img src={ComputeIcon} className="w-8 h-8" />
                <span>Compute</span>
              </div>
            }
          >
            {servicesData.slice(0, 3).map((item) => (
              <ServiceItem
                key={item.id}
                {...item}
                checked={selected.some((s) => s.id === item.id)}
                onChange={() => handleToggle(item)}
              />
            ))}
          </Card>

          {/* STORAGE */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <img src={StorageIcon} className="w-8 h-8" />
                <span>Storage</span>
              </div>
            }
          >
            {servicesData.slice(3, 6).map((item) => (
              <ServiceItem
                key={item.id}
                {...item}
                checked={selected.some((s) => s.id === item.id)}
                onChange={() => handleToggle(item)}
              />
            ))}
          </Card>

          {/* DATABASE */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <img src={DatabaseIcon} className="w-8 h-8" />
                <span>Database</span>
              </div>
            }
          >
            {servicesData.slice(6, 9).map((item) => (
              <ServiceItem
                key={item.id}
                {...item}
                checked={selected.some((s) => s.id === item.id)}
                onChange={() => handleToggle(item)}
              />
            ))}
          </Card>

          {/* NETWORK */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <img src={NetworkIcon} className="w-8 h-8" />
                <span>Network</span>
              </div>
            }
          >
            {servicesData.slice(9, 12).map((item) => (
              <ServiceItem
                key={item.id}
                {...item}
                checked={selected.some((s) => s.id === item.id)}
                onChange={() => handleToggle(item)}
              />
            ))}
          </Card>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4 mt-14 sticky top-20">
          <SummaryCard total={total} count={count} />

          <div className="bg-blue-50 text-blue-700 p-4 rounded-2xl text-sm min-h-25">
            <div className="flex items-center gap-3">
              <img src={EnterpriseIcon} className="w-6 h-6 shrink-0" />
              <h2 className="font-semibold whitespace-nowrap">
                Enterprise Support Included
              </h2>
            </div>

            <p className="mt-2 pl-9">
              24/7 support and 99.9% uptime SLA with all services.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServiceRequest;