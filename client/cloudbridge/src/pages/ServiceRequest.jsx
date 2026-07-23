import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import Card from "../components/cloud/requestservices/RequestCard";
import ServiceItem from "../components/cloud/requestservices/RequestServiceItem";
import SummaryCard from "../components/cloud/requestservices/RequestSummaryCard";
import { useToast } from "../context/ToastContext";
import http from "../utils/http.js";

import ComputeIcon from "../assets/serviceRequestIcons/Compute.png";
import StorageIcon from "../assets/serviceRequestIcons/Storage.png";
import DatabaseIcon from "../assets/serviceRequestIcons/Database.png";
import NetworkIcon from "../assets/serviceRequestIcons/Network.png";
import EnterpriseIcon from "../assets/serviceRequestIcons/Enterprise.png";

const SERVICE_SECTIONS = [
  { key: "COMPUTE", label: "Compute", icon: ComputeIcon },
  { key: "STORAGE", label: "Storage", icon: StorageIcon },
  { key: "DATABASE", label: "Database", icon: DatabaseIcon },
  { key: "NETWORK", label: "Network", icon: NetworkIcon },
];

const createEmptyServiceGroups = () =>
  SERVICE_SECTIONS.reduce((groups, section) => {
    groups[section.key] = [];
    return groups;
  }, {});

const formatAttributeSummary = (attributes = []) =>
  attributes
    .map((attribute) => {
      const label = typeof attribute?.key === "string" ? attribute.key.trim() : "";

      if (!label) {
        return null;
      }

      const value =
        attribute?.valueText ??
        (attribute?.valueNumber !== null && attribute?.valueNumber !== undefined
          ? `${attribute.valueNumber}${attribute.unit ?? ""}`
          : "");

      return value ? `${label}: ${value}` : label;
    })
    .filter(Boolean)
    .join(", ");

const buildServiceDisplayName = (service, variant, variantIndex) => {
  const attributeSummary = formatAttributeSummary(variant?.attributes);

  if (attributeSummary) {
    return `${service.name} - ${attributeSummary}`;
  }

  if ((service?.variants?.length ?? 0) > 1) {
    return `${service.name} - Option ${variantIndex + 1}`;
  }

  return service.name;
};

const normalizeAvailableServices = (services = []) => {
  const groupedServices = createEmptyServiceGroups();
  const availableIds = new Set();

  services.forEach((service) => {
    const categoryKey = typeof service?.category === "string"
      ? service.category.toUpperCase()
      : "";

    if (!groupedServices[categoryKey]) {
      return;
    }

    const variants = Array.isArray(service?.variants) ? service.variants : [];

    if (variants.length === 0) {
      const fallbackId = `service-${service.id}`;

      groupedServices[categoryKey].push({
        id: fallbackId,
        serviceId: service.id,
        serviceVariantId: null,
        name: service.name,
        price: Number(service?.startingPrice ?? 0),
      });
      availableIds.add(fallbackId);
      return;
    }

    variants.forEach((variant, variantIndex) => {
      groupedServices[categoryKey].push({
        id: variant.id,
        serviceId: service.id,
        serviceVariantId: variant.id,
        name: buildServiceDisplayName(service, variant, variantIndex),
        price: Number(variant?.basePrice ?? service?.startingPrice ?? 0),
      });
      availableIds.add(variant.id);
    });
  });

  return { groupedServices, availableIds };
};

const ServiceRequest = () => {
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [servicesByCategory, setServicesByCategory] = useState(
    createEmptyServiceGroups()
  );
  const [loadingServices, setLoadingServices] = useState(true);
  const [servicesError, setServicesError] = useState("");
  const [submittingRequest, setSubmittingRequest] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isActive = true;

    const loadServices = async () => {
      setLoadingServices(true);
      setServicesError("");

      try {
        const response = await http.get("/customer/services", {
          params: { limit: 50 },
        });

        if (!isActive) {
          return;
        }

        const { groupedServices, availableIds } = normalizeAvailableServices(
          response?.data?.data
        );

        setServicesByCategory(groupedServices);
        setSelected((current) =>
          current.filter((service) => availableIds.has(service.id))
        );
      } catch (error) {
        if (!isActive) {
          return;
        }

        setServicesByCategory(createEmptyServiceGroups());
        setSelected([]);
        setServicesError(
          error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Unable to load available services right now."
        );
      } finally {
        if (isActive) {
          setLoadingServices(false);
        }
      }
    };

    loadServices();

    return () => {
      isActive = false;
    };
  }, [reloadKey]);

  const handleToggle = (service) => {
    setSelected((current) => {
      const exists = current.some((item) => item.id === service.id);

      if (exists) {
        return current.filter((item) => item.id !== service.id);
      }

      return [...current, service];
    });
  };

  const total = selected.reduce(
    (sum, item) => sum + Number(item?.price ?? 0),
    0
  );
  const count = selected.length;

  const handleSubmitRequest = async () => {
    if (submittingRequest || loadingServices) {
      return;
    }

    if (selected.length === 0) {
      toast.error("Select at least one service before submitting your request.");
      return;
    }

    const items = selected
      .filter((service) => Number.isInteger(service?.serviceVariantId))
      .map((service) => ({
        serviceVariantId: service.serviceVariantId,
        quantity: 1,
      }));

    if (items.length !== selected.length) {
      toast.error(
        "One or more selected services are not requestable right now. Please refresh and try again."
      );
      return;
    }

    setSubmittingRequest(true);

    try {
      const response = await http.post("/customer/service-request", { items });

      setSelected([]);
      toast.success(
        response?.data?.message || "Service request submitted successfully."
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          "Unable to submit your service request right now."
      );
    } finally {
      setSubmittingRequest(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 p-8 overflow-y-auto">
        <header className="lg:hidden flex items-center gap-3 h-14 px-4 -mx-8 -mt-8 mb-6 bg-white border-b border-slate-200">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
          <span className="text-[15px] font-semibold text-[#0F172B]">CloudBridge</span>
        </header>

        <div className="w-full max-w-9xl">
          <header className="mb-4">
            <h1 className="text-[28px] font-bold text-[#0F172A] tracking-tight">
              New Service Request
            </h1>
            <p className="text-slate-500 text-base mt-1">
              Select the cloud services you need and submit the request
            </p>
          </header>

          {servicesError ? (
            <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
              <span>{servicesError}</span>
              <button
                type="button"
                onClick={() => setReloadKey((current) => current + 1)}
                className="rounded-lg bg-red-600 px-3 py-2 font-medium text-white transition hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          ) : null}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-6">
              {SERVICE_SECTIONS.map((section) => {
                const services = servicesByCategory[section.key] ?? [];

                return (
                  <Card
                    key={section.key}
                    title={
                      <div className="flex items-center gap-2">
                        <img
                          src={section.icon}
                          alt={`${section.label} icon`}
                          className="w-8 h-8"
                        />
                        <span>{section.label}</span>
                      </div>
                    }
                  >
                    {loadingServices ? (
                      <p className="text-sm text-[#45556C]">Loading services...</p>
                    ) : services.length > 0 ? (
                      services.map((item) => (
                        <ServiceItem
                          key={item.id}
                          {...item}
                          checked={selected.some((service) => service.id === item.id)}
                          onChange={() => handleToggle(item)}
                        />
                      ))
                    ) : (
                      <p className="text-sm text-[#45556C]">
                        No {section.label.toLowerCase()} services available right now.
                      </p>
                    )}
                  </Card>
                );
              })}
            </div>

            <div className="h-fit space-y-4 self-start lg:sticky lg:top-10">
              <SummaryCard
                total={total}
                count={count}
                onSubmit={handleSubmitRequest}
                submitting={submittingRequest}
                disabled={loadingServices || submittingRequest || count === 0}
              />

              <div className="bg-blue-50 text-blue-700 p-4 rounded-2xl text-sm min-h-25">
                <div className="flex items-center gap-3">
                  <img
                    src={EnterpriseIcon}
                    alt="Enterprise support icon"
                    className="w-6 h-6 shrink-0"
                  />
                  <h2 className="text-Work Sans text-sm font-semibold whitespace-nowrap">
                    Enterprise Support Included
                  </h2>
                </div>

                <p className="mt-2 pl-9 text-Work Sans text-regular">
                  24/7 support and 99.9% uptime SLA with all services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServiceRequest;
