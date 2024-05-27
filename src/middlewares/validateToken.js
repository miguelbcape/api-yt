import jwt from 'jsonwebtoken';
import { PASSWORD } from '../libs/config.js';

export const authRequire = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: 'unauthorized' });

  jwt.verify(token, PASSWORD, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};
