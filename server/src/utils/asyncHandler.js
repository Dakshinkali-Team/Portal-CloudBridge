export const asyncHandler = (handler) => (req, res, next) => //higher-order function that takes in a controller function (handler) and returns a new function that wraps the handler in a try-catch block
  Promise.resolve(handler(req, res, next)).catch(next); //execute the controller function and catch any error, then pass it to the next middleware (error handler)
