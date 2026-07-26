import { useEffect, useState } from "react";
import http from "../../utils/http.js";
import PageHeader from './admin_dashboard/PageHeader';
import SummaryStats from './admin_dashboard/SummaryStats';
import TabBar from './admin_dashboard/TabBar';
import IconButton from './admin_dashboard/IconButton';
import StatusBadge from './admin_dashboard/StatusBadge';
import DataTable from "./admin_dashboard/DataTable";
import ServiceRequestDetailModal from "./admin_dashboard/ServiceRequestDetailModal";

const TABS = ["All", "Pending", "Approved", "Rejected"];

const COLUMNS = [
  { key: "id", label: "Request ID" },
  { key: "customer", label: "Customer" },
  { key: "service", label: "Service" },
  { key: "amount", label: "Amount" },
  { key: "requestDate", label: "Request Date" },
  { key: "status", label: "Status" },
  { key: "actions", label: "Actions", align: "right" },
];

const EyeIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
    <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
    <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const XIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default function AdminServiceRequest() {
  const [requests, setRequests] = useState([]);
  const [summaryStats, setSummaryStats] = useState([
    { label: "Total Requests", value: 0 },
    { label: "Pending", value: 0 },
    { label: "Approved", value: 0 },
    { label: "Rejected", value: 0 },
  ]);
  const [activeTab, setActiveTab] = useState("All");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);

      try {
        const status = activeTab === "All" ? undefined : activeTab.toUpperCase();
        const response = await http.get("/admin/service-requests", {
          params: {
            page,
            limit: pagination.limit,
            ...(status ? { status } : {}),
          },
        });
        const nextRequests = response.data.data || [];
        const nextStats = response.data.stats || {};
        const nextPagination = response.data.pagination || pagination;

        setRequests(nextRequests);
        setSummaryStats([
          { label: "Total Requests", value: nextStats.totalRequests ?? 0 },
          { label: "Pending", value: nextStats.pending ?? 0 },
          { label: "Approved", value: nextStats.approved ?? 0 },
          { label: "Rejected", value: nextStats.rejected ?? 0 },
        ]);
        setPagination(nextPagination);

        // Warm the server cache for the status tabs after the initial list is
        // visible, so switching between Pending, Approved, and Rejected does
        // not wait on the hosted database.
        if (activeTab === "All" && page === 1) {
          const warmStatusTabs = async () => {
            for (const tabStatus of ["PENDING", "APPROVED", "REJECTED"]) {
              try {
                await http.get("/admin/service-requests", {
                  params: { page: 1, limit: pagination.limit, status: tabStatus },
                });
              } catch {
                // The visible request has already succeeded; warming is best effort.
              }
            }
          };

          void warmStatusTabs();
        }
      } catch (err) {
        setError(
          err?.response?.data?.message || "Failed to load service requests."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [activeTab, page, refreshKey]);

  const toDateString = (value) => {
    if (!value) return "-";
    return new Date(value).toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleRequestAction = async (requestId, status) => {
    setActionLoading((prev) => ({ ...prev, [requestId]: true }));
    setError(null);

    try {
      const response = await http.post(
        `/admin/service-requests/${requestId}/respond`,
        { status }
      );
      const updatedRequest = response.data.data;

      setRequests((prev) =>
        prev.map((request) =>
          request.id === requestId ? { ...request, ...updatedRequest } : request
        )
      );

      // Update selected request if it's the one being modified
      if (selectedRequest?.id === requestId) {
        setSelectedRequest(updatedRequest);
      }

      // Reload the server-backed table and summary so the active filter and
      // statistics immediately reflect the status change.
      setRefreshKey((current) => current + 1);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          `Failed to ${status.toLowerCase()} the request.`
      );
    } finally {
      setActionLoading((prev) => ({ ...prev, [requestId]: false }));
    }
  };

  const openDetailModal = (request) => {
    setSelectedRequest(request);
    setDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setDetailModalOpen(false);
    setSelectedRequest(null);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <PageHeader
        title="Service Request Management"
        subtitle="Review and manage customer service requests"
      />

      <SummaryStats stats={summaryStats} cols="grid-cols-2 lg:grid-cols-4" />

      <TabBar
        tabs={TABS}
        activeTab={activeTab}
        onChange={(nextTab) => {
          setActiveTab(nextTab);
          setPage(1);
        }}
      />

      <div className="mt-4">
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <DataTable
          columns={COLUMNS}
          isEmpty={!loading && requests.length === 0}
          emptyMessage={
            loading
              ? "Loading service requests..."
              : error || "No requests match this filter."
          }
        >
          {requests.map((req) => {
            const customerName = req.customer?.name || "Unknown customer";
            const customerEmail = req.customer?.email || "";
            const serviceLabel = req.items?.[0]?.service?.name || "—";
            const amount = req.totalAmount ?? 0;

            return (
              <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="px-5 py-4 text-sm text-[#0F172B]">#{req.id}</td>

                <td className="px-5 py-4">
                  <p className="text-sm font-semibold text-[#0F172B]">{customerName}</p>
                  <p className="text-xs text-[#45556C] mt-0.5">{customerEmail}</p>
                </td>

                <td className="px-5 py-4 text-sm text-[#0F172B]">
                  {serviceLabel}
                  {req.items?.length > 1 && (
                    <span className="text-xs text-[#667085] block mt-1">
                      +{req.items.length - 1} more item{req.items.length - 1 === 1 ? "" : "s"}
                    </span>
                  )}
                </td>

                <td className="px-5 py-4 whitespace-nowrap">
                  <span className="font-mono text-sm font-semibold text-[#0F172B]">
                    ${amount.toFixed(2)}
                  </span>
                </td>

                <td className="px-5 py-4 text-xs text-[#45556C] whitespace-nowrap">
                  {toDateString(req.createdAt)}
                </td>

                <td className="px-5 py-4">
                  <StatusBadge status={req.status} />
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1.5">
                    <IconButton
                      title="View details"
                      variant="default"
                      onClick={() => openDetailModal(req)}
                    >
                      <EyeIcon />
                    </IconButton>
                    {req.status?.toLowerCase() === "pending" && (
                      <>
                        <IconButton
                          title="Approve"
                          variant="success"
                          disabled={Boolean(actionLoading[req.id])}
                          onClick={() => handleRequestAction(req.id, "APPROVED")}
                        >
                          <CheckIcon />
                        </IconButton>
                        <IconButton
                          title="Reject"
                          variant="danger"
                          disabled={Boolean(actionLoading[req.id])}
                          onClick={() => handleRequestAction(req.id, "REJECTED")}
                        >
                          <XIcon />
                        </IconButton>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </DataTable>

        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
          <div className="text-sm text-slate-600">
            Page {pagination.page || 1} of {pagination.totalPages || 1}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
              disabled={loading || page <= 1}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <button
              type="button"
              onClick={() => setPage((currentPage) => Math.min(pagination.totalPages || currentPage, currentPage + 1))}
              disabled={loading || page >= (pagination.totalPages || 1)}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <ServiceRequestDetailModal
        isOpen={detailModalOpen}
        onClose={closeDetailModal}
        request={selectedRequest}
      />
    </div>
  );
}
