export const buildPaginationMeta = (page, limit, total) => ({      //function to build pagination metadata for API responses, takes in the current page number, limit of items per page, and total number of items
  total,
  page,
  limit,
  totalPages: total === 0 ? 0 : Math.ceil(total / limit), //calculate total pages based on total items and limit, if total is 0, set totalPages to 0 to avoid division by zero
});
