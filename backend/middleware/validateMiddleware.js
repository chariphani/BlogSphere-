export const requireFields =
  (...fields) =>
  (req, res, next) => {
    const missing = fields.filter(
      (field) => !String(req.body[field] ?? "").trim(),
    );
    if (missing.length)
      return res
        .status(400)
        .json({ message: `Required fields: ${missing.join(", ")}` });
    next();
  };
