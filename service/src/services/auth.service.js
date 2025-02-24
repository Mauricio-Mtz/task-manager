const User = require('../models/User')

class AuthService {
  // Función para obtener un usuario por email
  async getUserByEmail(email) {
    try {
      return await User.findOne({ email })
    } catch (error) {
      throw new Error('Error al obtener usuario: ' + error.message)
    }
  }

  // Función para obtener un usuario por username
  async getUserByUsername(username) {
    try {
      return await User.findOne({ username })
    } catch (error) {
      throw new Error('Error al obtener usuario: ' + error.message)
    }
  }

  // Función para obtener un usuario por id
  async getUser(userId) {
    try {
      return await User.findById(userId)
    } catch (error) {
      throw new Error('Error al obtener usuario: ' + error.message)
    }
  }

  // Función para crear un usuario
  async createUser(userData) {
    try {
      console.log(userData)
      const user = new User(userData)
      console.log(user)
      return await user.save()
    } catch (error) {
      throw new Error('Error al crear usuario: ' + error.message)
    }
  }

  // Función para actualizar el último login de un usuario
  async updateLastLogin(userId) {
    try {
      await User.findByIdAndUpdate(userId, { last_login: new Date() })
      return true
    } catch (error) {
      throw new Error('Error al actualizar último login: ' + error.message)
    }
  }

  // Función para obtener usuarios por grupo
  async getUsersByGroup(groupId) {
    try {
      const users = await User.find({ groups: { $in: [groupId] } })
      return users
    } catch (error) {
      throw new Error('Error al obtener usuarios por grupo: ' + error.message)
    }
  }  
}

module.exports = new AuthService()
