const jwt=require('jsonwebtoken');
require('dotenv').config()

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401); // If no token, return 401 Unauthorized
    
    jwt.verify(token, 'abcdef', (err, user) => {
      if (err) return res.sendStatus(403); // If token is invalid, return 403 Forbidden
      req.user = user;
      next(); // Proceed to the next middleware or route handler
    });
  }
  
  module.exports = authenticateToken;