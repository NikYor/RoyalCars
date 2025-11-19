import { loadConfig } from "../config/configLoader.js"
import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const config = loadConfig();
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader;
  if (!token) return res.status(401).json({ message: 'Липсва токен за достъп' });

  jwt.verify(token, config.jwt_secret, (err, user) => {
    if (err) return res.status(403).json({ message: 'Невалиден токен' });

    req.user = user; // { id, email, role }
    next();
  });
}
