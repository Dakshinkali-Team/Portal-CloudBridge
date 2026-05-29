import { X } from "lucide-react";
import StatusBadge from "./StatusBadge";

const formatDate = (d) => {
  if (!d) return "—";
  try {
    const dt = new Date(d);
    return isNaN(dt.getTime()) ? d : dt.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch (e) {
    return e;
  }
};

const ServiceRequestDetailModal = ({ isOpen, onClose, request }) => {
  if (!isOpen || !request) return null;

  const items = Array.isArray(request.items) ? request.items : [];
  const customerName = request.customer?.name || "Unknown";
  const customerEmail = request.customer?.email || "—";
  const totalAmount = request.totalAmount ?? 0;
  const createdDate = formatDate(request.createdAt);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Service Request #{request.id}
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Requested by {customerName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-6 py-4 space-y-6">
          {/* Request Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-medium mb-1">Customer</div>
              <div className="text-sm font-semibold text-slate-900">{customerName}</div>
              <div className="text-xs text-slate-500 mt-1">{customerEmail}</div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-medium mb-1">Request Date</div>
              <div className="text-sm font-semibold text-slate-900">{createdDate}</div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-medium mb-1">Status</div>
              <StatusBadge status={request.status} />
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500 font-medium mb-1">Total Amount</div>
              <div className="text-sm font-semibold text-slate-900">${totalAmount.toFixed(2)}</div>
            </div>
          </div>

          {/* Notes */}
          {request.notes && (
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="text-xs text-blue-600 font-medium mb-1">Customer Notes</div>
              <div className="text-sm text-blue-900">{request.notes}</div>
            </div>
          )}

          {/* Service Items */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Requested Services ({items.length} item{items.length === 1 ? "" : "s"})
            </h3>

            {items.length === 0 ? (
              <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 text-center text-sm text-slate-600">
                No service items in this request.
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item, index) => {
                  const serviceName = item.service?.name || item.serviceVariant?.service?.name || `Item ${index + 1}`;
                  const serviceCategory = item.service?.category || item.serviceVariant?.service?.category || "—";
                  const variantInfo = item.serviceVariant
                    ? `${item.serviceVariant.basePrice ? `$${item.serviceVariant.basePrice}` : "—"}${item.serviceVariant.billingInterval ? `/${item.serviceVariant.billingInterval}` : ""}`
                    : "—";
                  const quantity = item.quantity ?? 1;
                  const unitPrice = item.unitPriceSnap ?? 0;
                  const lineTotal = item.lineTotal ?? quantity * unitPrice;
                  const attributes = item.serviceVariant?.attributes || [];

                  return (
                    <div
                      key={item.id ?? `item-${index}`}
                      className="p-4 rounded-lg border border-slate-200 bg-white hover:shadow-sm transition-shadow"
                    >
                      {/* Item Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900">{serviceName}</h4>
                          <p className="text-xs text-slate-500 mt-0.5">{serviceCategory}</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
                          Qty: {quantity}
                        </span>
                      </div>

                      {/* Pricing */}
                      <div className="grid grid-cols-3 gap-3 mb-3 py-2 border-y border-slate-100 text-xs">
                        <div>
                          <div className="text-slate-500 font-medium mb-0.5">Unit Price</div>
                          <div className="font-semibold text-slate-900">${unitPrice.toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-slate-500 font-medium mb-0.5">Quantity</div>
                          <div className="font-semibold text-slate-900">{quantity}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-slate-500 font-medium mb-0.5">Line Total</div>
                          <div className="font-semibold text-slate-900">${lineTotal.toFixed(2)}</div>
                        </div>
                      </div>

                      {/* Variant/Billing Info */}
                      <div className="text-xs">
                        <div className="text-slate-500 font-medium mb-1">Billing</div>
                        <div className="text-slate-700">{variantInfo}</div>
                      </div>

                      {/* Attributes */}
                      {attributes.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-100">
                          <div className="text-xs text-slate-500 font-medium mb-2">Specifications</div>
                          <div className="grid grid-cols-2 gap-2">
                            {attributes.map((attr, i) => (
                              <div key={i} className="text-xs">
                                <span className="text-slate-500">{attr.key}:</span>
                                <span className="ml-1 font-medium text-slate-700">
                                  {attr.valueText || attr.valueNumber} {attr.unit || ""}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Response Info */}
          {request.responseMessage && (
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="text-xs text-emerald-600 font-medium mb-1">Admin Response</div>
              <div className="text-sm text-emerald-900">{request.responseMessage}</div>
              {request.estimatedDate && (
                <div className="text-xs text-emerald-700 mt-2">
                  Estimated completion: {formatDate(request.estimatedDate)}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestDetailModal;
