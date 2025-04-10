const authMiddleware = (req, res, next) => {
  if (req.session.isAuthenticated) {
    return next();
  }
  return res.status(401).json({ error: 'Not authenticated' });
};

module.exports = authMiddleware;


