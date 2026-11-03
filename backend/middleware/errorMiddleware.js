export const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};
export const errorHandler = (err, _req, res, _next) => {
  let status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  if (err.name === "CastError") status = 404;
  if (err.code === 11000) {
    status = 409;
    err.message = "An account with this email already exists";
  }
  res.status(status).json({ message: err.message || "Server error" });
};
