
import { useState, useEffect } from "react";
import ServiceListItem from "../../components/cloud/services/ServiceListItem";
import useAxios from "../../hooks/useAxios";

export default function MyServicesSection() {
  const [active, setActive] = useState("ALL");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = useAxios();

  const normalizeServiceStatus = (rawStatus) => {
    const status = rawStatus?.toString().toUpperCase?.() ?? "";

    if (status === "PENDING") return "Pending";
    if (status === "APPROVED" || status === "COMPLETED" || status === "ACTIVE") return "APPROVED";
    if (status === "REJECTED" || status === "CANCELLED") return "REJECTED";
    if (status === "ALL") return undefined;

    return rawStatus || "Unknown";
  };

  useEffect(() => {
    let mounted = true;
    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      try {
        // server mounts customer routes at /api/customer
        const activeStatus = normalizeServiceStatus(active);
        const res = await api.get(`/customer/my-services?status=${activeStatus || "ALL"}`);
        console.log("My Services API response:", res.data);

        if (!mounted) return;

        const payload =
          Array.isArray(res.data)
            ? res.data
            : Array.isArray(res.data?.data)
            ? res.data.data
            : Array.isArray(res.data?.services)
            ? res.data.services
            : [];

        console.log("Parsed services:", payload);
        setServices(payload);
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
    return () => {
      mounted = false;
    };
  }, [active]);

  // Normalize and filter by status returned from API
  console.log("Selected Tab:", active, services);
  const filtered = services;

  const tabs = ["ALL", "Active", "Pending", "Cancelled"];

  return (
    <div className="mt-6">
      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`text-xs px-3 py-1 rounded-md border transition ${
              active === t
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-3">
        {loading ? (
          <div className="p-6 bg-white border rounded-lg text-center">Loading services...</div>
        ) : error ? (
          <div className="p-6 bg-red-50 border border-red-100 rounded-lg text-red-700">
            <div className="font-medium">Error</div>
            <div className="text-sm mt-1">{error}</div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-6 bg-white border rounded-lg text-center text-slate-600">
            No services found for <strong>{active}</strong>.
          </div>
        ) : (
          filtered.map((s) => <ServiceListItem key={s.id || s._id} service={s} />)
        )}
      </div>
    </div>
  );
}