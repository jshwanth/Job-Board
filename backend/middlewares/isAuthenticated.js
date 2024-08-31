import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // Retrieve token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    // Attach user ID to request object
    req.id = decoded.userID;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({
      message: "Internal server error during authentication",
      success: false,
    });
  }
};

export default isAuthenticated;
