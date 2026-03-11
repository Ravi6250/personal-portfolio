const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // --- DEBUGGING LOGS ---
  console.log('--- Auth Middleware Triggered ---');
  console.log('Request Headers:', req.headers);
  // ------------------------

  // 1. Get token from the header
  const token = req.header('x-auth-token');
  console.log('Token from header:', token); // Log the token found

  // 2. Check if no token exists
  if (!token) {
    console.log('Authorization Denied: No token found.');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // 3. Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    console.log('Authorization Success: Token is valid.');
    next();
  } catch (err) {
    console.log('Authorization Denied: Token is not valid.');
    res.status(401).json({ message: 'Token is not valid' });
  }
};