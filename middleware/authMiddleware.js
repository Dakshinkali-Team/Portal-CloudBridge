module.exports = (req, res, next) => {
  // Dummy auth (expand later with JWT)
  console.log("Auth checked");
  next();
};