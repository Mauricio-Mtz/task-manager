const Group = require('../models/Group')
const User = require('../models/User')

class GroupService {
  // Función para crear un grupo
  async createGroup(groupData) {
    try {
      const group = new Group(groupData)
      return await group.save()
    } catch (error) {
      throw new Error('Error al crear grupo: ' + error.message)
    }
  }

  // Función para obtener los grupos de un creador
  async getGroupsByCreator(creatorId) {
    try {
      return await Group.find({ creator_id: creatorId })
    } catch (error) {
      throw new Error('Error al obtener grupos: ' + error.message)
    }
  }

  // Función para obtener los grupos de un usuario
  async getGroupsByUser(userId) {
    try {
      const user = await User.findById(userId);
      if (!user || !user.groups || user.groups.length === 0) {
        return null; // El usuario no tiene grupos
      }
      
      // Buscar todos los grupos a los que pertenece el usuario
      return await Group.find({ _id: { $in: user.groups } });
    } catch (error) {
      throw new Error('Error al obtener los grupos del usuario: ' + error.message);
    }
  }  

  // Función para validar si un usuario es el creador de un grupo
  async validateCreator(groupId, creatorId) {
    try {
      const group = await Group.findOne({
        _id: groupId,
        creator_id: creatorId,
      })
      return !!group
    } catch (error) {
      throw new Error('Error al obtener grupo: ' + error.message)
    }
  }

  // Función para inscribir un usuario en un grupo
  async enroll({ group_id, user_id }) {
    try {
      return await User.findByIdAndUpdate(
        user_id,
        { $addToSet: { groups: group_id } },
        { new: true }
      )
    } catch (error) {
      throw new Error('Error al inscribir usuario en grupo: ' + error.message)
    }
  }

  // Función para eliminar un grupo
  async deleteGroup(groupId) {
    try {
      return await Group.deleteOne({ _id: groupId })
    } catch (error) {
      throw new Error('Error al eliminar grupo: ' + error.message)
    }
  }
}

module.exports = new GroupService()
