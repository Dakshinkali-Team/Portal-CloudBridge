-- Speeds up customer service-list filtering and dashboard activity sorting.
CREATE INDEX "ServiceRequest_customerId_status_createdAt_idx"
ON "ServiceRequest"("customerId", "status", "createdAt");

CREATE INDEX "ServiceRequest_customerId_updatedAt_idx"
ON "ServiceRequest"("customerId", "updatedAt");
