const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');
const { JWT_SECRET } = require('../../config/constants');

class AuthController {
  // Registro de usuario
  async register(req, res) {
    try {
      const { email, password, username } = req.body;

      // Validación de campos requeridos
      if (!email || !password || !username) {
        return res.status(400).json({ 
          success: false, 
          error: 'Todos los campos son requeridos' 
        });
      }

      // Verificar si el usuario ya existe
      // Por email
      const existingEmail = await authService.getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ 
          success: false, 
          error: 'El email ya está registrado' 
        });
      }
      // Por username
      const existingUsername = await authService.getUserByUsername(username);
      if (existingUsername) {
        return res.status(400).json({ 
          success: false, 
          error: 'El nombre de usuario ya está asignado' 
        });
      }

      // Hashear la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Crear el usuario
      const userData = {
        email: email,
        password: hashedPassword,
        username: username,
      };

      const newUser = await authService.createUser(userData);

      // Eliminar la contraseña del objeto de respuesta
      const { password: _, ...userResponse } = newUser;

      res.status(201).json({
        success: true,
        user: userResponse
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Inicio de sesión
  async login(req, res) {
    try {
      const { email, password } = req.body;
  
      // Validación de campos requeridos
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email y contraseña son requeridos'
        });
      }
  
      // Buscar el usuario
      const user = await authService.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Credenciales inválidas'
        });
      }
  
      // Validar contraseña
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          error: 'Credenciales inválidas'
        });
      }
  
      // Generar JWT token
      const token = jwt.sign(
        { 
          userId: user._id,
          email: user.email
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
  
      // Actualizar último login
      user.last_login = new Date();
      await user.save();
  
      // Preparar objeto de usuario sin datos sensibles
      const userResponse = {
        _id: user._id,
        username: user.username,
        email: user.email,
        created_at: user.created_at,
        last_login: user.last_login
      };
  
      return res.status(200).json({
        success: true,
        token,
        user: userResponse
      });
  
    } catch (error) {
      console.error('Error en login:', error);
      return res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  }

  // Listar usuarios por grupo
  async listUsersByGroup (req, res) {
    try {
      const { groupId } = req.params;
      const users = await authService.getUsersByGroup(groupId);
      res.status(200).json({ success: true, users });
    } catch (error) {
      console.error('Error al obtener usuarios por grupo:', error);
      res.status(500).json({ success: false, error: 'Error al obtener usuarios por grupo' });
    }
  }
}

module.exports = new AuthController();