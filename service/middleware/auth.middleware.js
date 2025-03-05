const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/constants');
const { getUser } = require('../src/services/auth.service');

// Middleware para la validacion del usuario y creacion del token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await getUser(decoded.userId);

    if (!user) {
      return res.status(403).json({ error: 'Usuario no encontrado' });
    }

    // Agregamos la información del usuario al request
    req.user = {
      userId: user.id,
      email: user.email,
      username: user.username
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    }
    return res.status(403).json({ error: 'Token inválido' });
  }
};


module.exports = {
  authenticateToken,
};