import prisma from "./src/config/prisma.js";

async function main() {
  console.log("Measuring query performance comparing query vs join...");

  // Warm-up query
  await prisma.$queryRaw`SELECT 1`;

  // Standard query (default strategy is "query" in Prisma unless relationJoins preview feature is enabled, 
  // wait! In Prisma 5.10+, once previewFeatures=["relationJoins"] is enabled, the default is STILL "query", 
  // but we can pass relationLoadStrategy: "join" or "query" to choose!)
  
  // Strategy: query
  const startQuery = performance.now();
  const resQuery = await prisma.serviceRequest.findMany({
    take: 10,
    relationLoadStrategy: "query",
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
  console.log(`[query strategy] Fetched ${resQuery.length} requests in ${(performance.now() - startQuery).toFixed(2)}ms`);

  // Strategy: join
  const startJoin = performance.now();
  const resJoin = await prisma.serviceRequest.findMany({
    take: 10,
    relationLoadStrategy: "join",
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
  console.log(`[join strategy] Fetched ${resJoin.length} requests in ${(performance.now() - startJoin).toFixed(2)}ms`);

  await prisma.$disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
