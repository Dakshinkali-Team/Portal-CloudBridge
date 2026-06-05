import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ServiceIcon, IconButton } from "./ReusableAtoms";

const formatDate = (d) => {
  if (!d) return "—";
  try {
    const dt = new Date(d);
    return isNaN(dt.getTime()) ? d : dt.toLocaleDateString();
  } catch (e) {
    return e;
  }
};

const normalizeServiceStatus = (rawStatus) => {
  const status = rawStatus?.toString().toUpperCase?.() ?? "";

  if (status === "PENDING") return "Pending";
  if (status === "APPROVED" || status === "COMPLETED" || status === "ACTIVE") return "Active";
  if (status === "REJECTED" || status === "CANCELLED") return "Cancelled";

  return rawStatus || "Unknown";
};

const ServiceListItem = ({ service }) => {
  const [open, setOpen] = useState(false);
  const items = Array.isArray(service.items) ? service.items : [];

  const serviceName =
    service.name ||
    items[0]?.service?.name ||
    items[0]?.serviceVariant?.service?.name ||
    "Service Request";

  const category =
    service.category ||
    items[0]?.service?.category ||
    items[0]?.serviceVariant?.service?.category ||
    "General";

  const totalItems = service.totalItems ?? items.reduce((sum, item) => sum + Number(item.quantity ?? 0), 0);
  const totalAmount =
    service.totalAmount ??
    items.reduce(
      (sum, item) => sum + Number(item.lineTotal ?? item.quantity * (item.unitPriceSnap ?? 0)),
      0
    );

  const created = service.createdAt || service.created_at || service.requested || "";
  const displayStatus = normalizeServiceStatus(service.status);

  const statusClass =
    displayStatus === "Active"
      ? "bg-green-50 text-green-600"
      : displayStatus === "Pending"
      ? "bg-orange-50 text-orange-600"
      : "bg-gray-100 text-gray-500";

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden transition duration-150 hover:shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-4 p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <ServiceIcon />
          <div>
            <div className="text-sm font-semibold text-slate-900">{serviceName}</div>
            <div className="text-[12px] text-slate-500">{category}</div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4 text-sm text-slate-700">
          <div className="hidden sm:block">{totalItems} item{totalItems === 1 ? "" : "s"}</div>
          <div className="hidden sm:block">{formatDate(created)}</div>
          <div className="text-right">
            <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${statusClass}`}>
              {displayStatus}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {open ? (
              <ChevronDown size={18} className="text-slate-500" />
            ) : (
              <ChevronRight size={18} className="text-slate-500" />
            )}
          </div>
        </div>
      </button>

      {open && (
        <div className="border-t border-slate-200 bg-slate-50 p-4 space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-900">Requested Items</div>
              <div className="text-xs text-slate-500">Expand each request to review included service items.</div>
            </div>
            <div className="text-sm text-slate-600">
              Total amount: <span className="font-semibold text-slate-900">${totalAmount}</span>
            </div>
          </div>

          <div className="grid gap-3">
            {items.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-600">
                No item details available.
              </div>
            ) : (
              items.map((item, index) => {
                const itemName =
                  item.service?.name ||
                  item.serviceVariant?.service?.name ||
                  `Item ${index + 1}`;
                const itemCategory =
                  item.service?.category ||
                  item.serviceVariant?.service?.category ||
                  "General";
                const unitPrice = item.unitPriceSnap != null ? `$${item.unitPriceSnap}` : "—";
                const lineTotal = item.lineTotal != null ? `$${item.lineTotal}` : "—";

                return (
                  <div
                    key={item.id ?? `${itemName}-${index}`}
                    className="grid gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:grid-cols-[1.8fr_0.8fr_0.8fr]"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{itemName}</div>
                      <div className="text-[12px] text-slate-500">{itemCategory}</div>
                    </div>
                    <div className="text-sm text-right text-slate-700">
                      <div>{unitPrice}</div>
                      <div className="text-slate-500 text-xs">Subtotal: {lineTotal}</div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="text-sm text-slate-500">Request created on {formatDate(created)}</div>
            <IconButton onClick={() => console.log("view", service.id || service._id)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceListItem;
