import { useCallback, useEffect, useState } from "react";
import PageHeader from "./admin_dashboard/PageHeader";
import SummaryStats from './admin_dashboard/SummaryStats';
import { useToast } from "../../context/ToastContext";
import useAxios from "../../hooks/useAxios";

import StatusBadge from "./admin_dashboard/StatusBadge";
import IconButton from "./admin_dashboard/IconButton";
import Button from '../../components/layout/components/Button';
import DataTable from "./admin_dashboard/DataTable";
import AddServiceModal from '../../components/modals/AddServiceModal';

 
// ── Table column definitions ──────────────────────────────────────────────────
 
const COLUMNS = [
  { key: "name",     label: "Service Name"   },
  { key: "category", label: "Category"       },
  { key: "specs",    label: "Specifications" },
  { key: "price",    label: "Price/Month"    },
  { key: "status",   label: "Status"         },
  { key: "actions",  label: "Actions", align: "right" },
];
 
// ── SVG icons ─────────────────────────────────────────────────────────────────
 
const ServerIcon = () => (
  <svg className="w-5 h-5 text-[#0B78C1]" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="2" width="14" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
    <rect x="1" y="9" width="14" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="3.5" cy="4.5" r="0.7" fill="currentColor" />
    <circle cx="3.5" cy="11.5" r="0.7" fill="currentColor" />
  </svg>
);
 
const PlusIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
 
const EditIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
    <path d="M11 2l3 3-8 8H3v-3l8-8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);
 
const TrashIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
    <path
      d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
 
// ── Page component ────────────────────────────────────────────────────────────
 
export default function AdminServiceConfig() {
  const [services, setServices] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  const api = useAxios();
  const { toast } = useToast();

  const fetchServices = useCallback(async () => {
    setLoadError("");
    setIsLoading(true);

    try {
      const response = await api.get("/admin/services");
      const data = Array.isArray(response.data?.data)
        ? response.data.data
        : [];

      const normalizedServices = data.map((service) => ({
        ...service,
        specs: service.specifications || "",
        status: service.isActive ? "active" : "inactive",
        price:
          service.price ??
          service.startingPrice ??
          service.variants?.[0]?.basePrice ?? "",
      }));

      setServices(normalizedServices);
    } catch (error) {
      console.error("Failed to load services:", error);
      setLoadError("Failed to load services. Please refresh the page or try again.");
      toast.error("Unable to fetch services.");
    } finally {
      setIsLoading(false);
    }
  }, [api, toast]);

  const stats = [
    { label: "Total Services",    value: services.length },
    { label: "Active Services",   value: services.filter((s) => s.status === "active").length   },
    { label: "Inactive Services", value: services.filter((s) => s.status === "inactive").length },
  ];
 
  // ── Action handlers ─────────────────────────────────────────────────────────
 
  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/services/${id}`);
      toast.success("Service deleted successfully.");
      await fetchServices();
    } catch (error) {
      console.error("Failed to delete service:", error);
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Unable to delete service. Please try again.";
      toast.error(message);
    }
  };

  const handleServiceSaved = async () => {
    setSelectedService(null);
    setIsAddModalOpen(false);
    await fetchServices();
  };

  useEffect(() => {
    const loadServices = async () => {
      await fetchServices();
    };

    loadServices();
  }, [fetchServices]);
 
  // ── Render ──────────────────────────────────────────────────────────────────
 
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
 
      {/* ── Header with "Add Service" button in the right slot ── */}
      <PageHeader
        title="Service Configuration"
        subtitle="Manage available cloud services and pricing"
      >
        <Button
          variant="primary"
          className="shadow-lg shadow-blue-400/40 text-sm"
          onClick={() => setIsAddModalOpen(true)}
        >
          <PlusIcon />
          Add Service
        </Button>
      </PageHeader>
 
      {/* ── Stat cards (3-column grid) ── */}
      <SummaryStats stats={stats} cols="grid-cols-1 sm:grid-cols-3" />
 
      {loadError ? (
        <div className="mx-6 mb-4 rounded-md border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          {loadError}
        </div>
      ) : null}

      {/* ── Table ── */}
      <DataTable
        columns={COLUMNS}
        isEmpty={!isLoading && services.length === 0}
        emptyMessage={isLoading ? "Loading services..." : "No services configured yet."}
      >
        {services.map((svc) => (
          <tr key={svc.id} className="hover:bg-slate-50/70 transition-colors">
 
            {/* Service name + server icon */}
            <td className="px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] flex items-center justify-center shrink-0">
                  <ServerIcon />
                </div>
                <span className="text-sm font-medium text-[#0F172B]">{svc.name}</span>
              </div>
            </td>
 
            {/* Category */}
            <td className="px-5 py-4 text-sm text-[#45556C]">
              {svc.category}
            </td>
 
            {/* Specifications */}
            <td className="px-5 py-4 text-xs text-[#45556C]">
              {svc.specs}
            </td>
 
            {/* Price/month */}
            <td className="px-5 py-4 whitespace-nowrap">
              <span className="font-mono text-sm font-bold text-[#0F172B]">
                ${svc.price}
              </span>
              <span className="text-xs text-[#45556C]">/mo</span>
            </td>
 
            {/* Status badge — uses StatusBadge component */}
            <td className="px-5 py-4">
              <StatusBadge status={svc.status} />
            </td>
 
            {/* Action buttons — uses IconButton component */}
            <td className="px-5 py-4">
              <div className="flex items-center justify-end gap-1.5">
 
                <IconButton
                  title="Edit service"
                  variant="default"
                  onClick={() => {
                    setSelectedService(svc);
                    setIsAddModalOpen(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
 
                <IconButton
                  title="Delete service"
                  variant="danger"
                  onClick={() => handleDelete(svc.id)}
                >
                  <TrashIcon />
                </IconButton>
              </div>
            </td>
          </tr>
        ))}
      </DataTable>

      <AddServiceModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setSelectedService(null);
          setIsAddModalOpen(false);
        }}
        onCreate={handleServiceSaved}
        service={selectedService}
      />
    </div>
  );
}

