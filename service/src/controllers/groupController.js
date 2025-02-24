const groupService = require('../services/group.service');

class GroupController {
  // Crear un grupo
  async create(req, res) {
    try {
      const { nameGroup, description } = req.body;
      const creatorId = req.user.userId;

      if (!nameGroup || !description) {
        return res.status(400).json({ 
          success: false, 
          error: 'Todos los campos son requeridos' 
        });
      }

      const group = await groupService.createGroup({ 
        name_group: nameGroup, 
        description: description, 
        creator_id: creatorId
      });

      res.status(201).json({ success: true, group });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Listar grupos creados por el usuario
  async listGroupsByCreator(req, res) {
    try {
      const creatorId = req.user.userId;
      const groups = await groupService.getGroupsByCreator(creatorId);
      res.status(200).json({ success: true, groups });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Listar grupos asignados al usuario
  async listGroupsByUser(req, res) {
    try {
      const userId = req.user.userId;
      const group = await groupService.getGroupsByUser(userId);
      if (!group) {
        return res.status(200).json({ 
          success: false, 
          error: 'El usuario no tiene un grupo asignado' 
        });
      }
      res.status(200).json({ success: true, group });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Inscribirse a un grupo
  async enroll(req, res) {
    try {
      const { code } = req.body;
      const userId = req.user.userId;

      if (!code) {
        return res.status(400).json({ 
          success: false, 
          error: 'Se requiere el código del grupo' 
        });
      }

      const group = await groupService.enroll({ 
        group_id: code,
        user_id: userId
      });

      res.status(201).json({ success: true, group });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Eliminar un grupo
  async delete(req, res) {
    try {
      const { groupId } = req.body;
      const creatorId = req.user.userId;

      if (!groupId) {
        return res.status(400).json({ 
          success: false, 
          error: 'Se requiere el ID del grupo' 
        });
      }

      const isCreator = await groupService.validateCreator(groupId, creatorId);
      if (!isCreator) {
        return res.status(400).json({ 
          success: false, 
          error: 'Solo el creador del grupo puede eliminarlo' 
        });
      }

      const deletedGroup = await groupService.deleteGroup(groupId);
      res.status(200).json({ success: true, group: deletedGroup });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = new GroupController();