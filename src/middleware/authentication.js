const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('No token provided');
    return res.status(401).send("Unauthenticated")
  };
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, name } = decoded;
    req.user = { userId, name };
    next();
  } catch (error) {
    console.log('Not authed to access this route');
    throw new Error();
  }
};

module.exports = authenticationMiddleware;
