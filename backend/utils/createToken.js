import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set JWT as an HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    // 1. MUST be true for Render (HTTPS). Change from 'development' check to true.
    secure: true,
    // 2. MUST be "none" to allow Vercel to send the cookie to Render.
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return token;
};

export default generateToken;
