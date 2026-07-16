import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    // Split the header into scheme and token
    const [scheme, token] = authHeader.split(" ");

    // Accept both Bearer and JWT
    if (!["Bearer", "JWT"].includes(scheme) || !token) {
      return res.status(401).json({
        message:
          "Invalid authorization format. Use Bearer <token> or JWT <token>.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECURITY_KEY || "Hy Buddy!");

    // Attach user data to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};
