import rateLimit from "express-rate-limit";

const defaultHandler = (req, res) => {
  return res.status(429).json({
    success: false,
    message: "Too many requests. Please try again later.",
    errors: [],
  });
};

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    return (
      req.path === "/auth/login" ||
      req.path === "/auth/register" ||
      req.path === "/auth/guest"
    );
  },
  handler: defaultHandler,
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 15,
  standardHeaders: true,
  legacyHeaders: false,
  handler: defaultHandler,
});

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: defaultHandler,
});

export const guestLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: defaultHandler,
});