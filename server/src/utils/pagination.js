export const buildPaginationMeta = (page, limit, total) => ({
  total,
  page,
  limit,
  totalPages: total === 0 ? 0 : Math.ceil(total / limit),
});
