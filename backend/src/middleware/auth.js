import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log("cookies", req.cookies)
  
  const token = req.cookies?.token
  if (!token) {
    return res.status(401).json({ status: 401, message: "Unauthorized: No token provided." })
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    req.userId = decoded.userId
    next()
  } catch (err) {
    console.error("Token verification failed:", err)
    return res.status(401).json({ status: 401, message: "Unauthorized: Invalid token." })
  }
}