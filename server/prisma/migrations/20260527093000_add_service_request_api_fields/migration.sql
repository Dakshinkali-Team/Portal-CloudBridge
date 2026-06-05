-- Additive schema changes for customer/admin request APIs.
ALTER TABLE "Service"
ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;

ALTER TABLE "ServiceRequest"
ADD COLUMN "notes" TEXT,
ADD COLUMN "responseMessage" TEXT,
ADD COLUMN "estimatedDate" TIMESTAMP(3),
ALTER COLUMN "status" SET DEFAULT 'PENDING';

ALTER TABLE "RequestItem"
ADD COLUMN "quantity" INTEGER NOT NULL DEFAULT 1;

CREATE INDEX "Service_category_isActive_idx" ON "Service"("category", "isActive");
CREATE INDEX "ServiceVariant_serviceId_idx" ON "ServiceVariant"("serviceId");
CREATE INDEX "VariantAttribute_serviceVariantId_idx" ON "VariantAttribute"("serviceVariantId");
CREATE INDEX "ServiceRequest_customerId_createdAt_idx" ON "ServiceRequest"("customerId", "createdAt");
CREATE INDEX "ServiceRequest_status_createdAt_idx" ON "ServiceRequest"("status", "createdAt");
CREATE INDEX "ServiceRequest_reviewerId_idx" ON "ServiceRequest"("reviewerId");
CREATE INDEX "RequestItem_requestId_idx" ON "RequestItem"("requestId");
CREATE INDEX "RequestItem_serviceId_idx" ON "RequestItem"("serviceId");
CREATE INDEX "RequestItem_serviceVariantId_idx" ON "RequestItem"("serviceVariantId");
