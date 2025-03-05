const taskService = require('../services/task.service');

class TaskController {
  // Crear una tarea
  async create(req, res) {
    console.log('req.body', req.body); 
    try {
      const { nameTask, description, deadLine, status, category, groupId = null, personalUserId = null } = req.body;
      const defaultUserId = req.user.userId;
      let userId = defaultUserId;
      
      if (personalUserId) {
        userId = personalUserId;
      }

      if (!nameTask || !description || !deadLine || !status || !category) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }

      const task = await taskService.createTask(
        { 
          name_task: nameTask, 
          description: description, 
          dead_line: deadLine, 
          status: status, 
          category :category },
        userId,
        groupId
      );

      res.status(201).json({ success: true, task });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Listar tareas creadas por el usuario
  async listTasksByUser(req, res) {
    try {
      const userId = req.user.userId;
      const tasks = await taskService.getTasksByUser(userId);
      res.status(200).json({ success: true, tasks });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Listar tareas por grupo
  async listTasksByGroup(req, res) {
    try {
      const { groupId } = req.params;
      if (!groupId) {
        return res.status(400).json({ message: 'El ID del grupo es requerido' });
      }

      const tasks = await taskService.getTasksByGroup(groupId);
      return res.status(200).json({ success: true, tasks });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  
  // Eliminar una tarea
  async delete(req, res) {
    try {
      const { taskId } = req.params;
      const userId = req.user.userId; // ID del usuario autenticado
  
      const task = await taskService.getTaskById(taskId);
      if (!task) {
        return res.status(404).json({ success: false, error: 'Tarea no encontrada' });
      }
  
      // Verificar que el usuario sea el creador de la tarea antes de eliminarla
      if (task.user_id !== userId) {
        return res.status(403).json({ success: false, error: 'No tienes permiso para eliminar esta tarea' });
      }
  
      await taskService.deleteTask(taskId);
  
      res.status(200).json({ success: true, message: 'Tarea eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Actualizar el estado de una tarea
  async updateStatus(req, res) {
    try {
      const { taskId } = req.params;
      const { status } = req.body;
      const userId = req.user.userId; // ID del usuario autenticado
  
      if (!taskId || !status) {
        return res.status(400).json({ success: false, error: 'El ID de la tarea y el nuevo estado son requeridos' });
      }
  
      // Obtener la tarea para verificar si el usuario es el creador
      const task = await taskService.getTaskById(taskId);
      if (!task) {
        return res.status(404).json({ success: false, error: 'Tarea no encontrada' });
      }
  
      // Verificar si el usuario tiene permisos para actualizar
      if (task.user_id !== userId) {
        return res.status(403).json({ success: false, error: 'No tienes permiso para actualizar esta tarea' });
      }
  
      // Actualizar el estado de la tarea
      await taskService.updateTask(taskId, { status });
  
      res.status(200).json({ success: true, message: 'Estado de la tarea actualizado correctamente' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }  
}

module.exports = new TaskController();