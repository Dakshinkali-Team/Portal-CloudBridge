import prisma from "./src/config/prisma.js";

async function main() {
  console.log("Measuring query performance with warm-up...");

  // Warm-up query to establish connection
  const warmStart = performance.now();
  await prisma.$queryRaw`SELECT 1`;
  console.log(`Connection established in ${(performance.now() - warmStart).toFixed(2)}ms`);

  // Run counts twice
  for (let i = 1; i <= 2; i++) {
    const start = performance.now();
    const counts = await prisma.$transaction([
      prisma.serviceRequest.count({ where: { status: "APPROVED" } }),
      prisma.serviceRequest.count({ where: { status: "PENDING" } }),
      prisma.serviceRequest.count({ where: { status: "COMPLETED" } }),
    ]);
    console.log(`[Run ${i}] Counts:`, counts, `in ${(performance.now() - start).toFixed(2)}ms`);
  }

  // Run findMany with include twice
  for (let i = 1; i <= 2; i++) {
    const startRequests = performance.now();
    const requests = await prisma.serviceRequest.findMany({
      take: 10,
      include: {
        customer: true,
        reviewer: true,
        items: {
          include: {
            service: true,
            serviceVariant: {
              include: {
                attributes: true
              }
            }
          }
        }
      }
    });
    console.log(`[Run ${i}] Fetched ${requests.length} requests in ${(performance.now() - startRequests).toFixed(2)}ms`);
  }

  await prisma.$disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
