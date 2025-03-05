const Task = require('../models/Task');

class TaskService {
  // Funcion para crear una tarea
  async createTask(taskData, userId, groupId = null) {
    try {
      const task = new Task({
        ...taskData,
        user_id: userId,
        group_id: groupId
      });
      await task.save();
      return task;
    } catch (error) {
      throw new Error('Error al crear tarea: ' + error.message);
    }
  }

  // Funcion para obtener todas las tareas de un usuario
  async getTasksByUser(userId) {
    try {
      return await Task.find({ user_id: userId, group_id: null });
    } catch (error) {
      throw new Error('Error al obtener tareas: ' + error.message);
    }
  }  

  // Funcion para obtener todas las tareas de un grupo
  async getTasksByGroup(groupId) {
    try {
      return await Task.find({ group_id: groupId });
    } catch (error) {
      throw new Error('Error al obtener tareas del grupo: ' + error.message);
    }
  }

  // Funcion para obtener una tarea por su id
  async getTaskById(taskId) {
    try {
      return await Task.findById(taskId);
    } catch (error) {
      throw new Error('Error al obtener tarea: ' + error.message);
    }
  }

  // Funcion para actualizar una tarea
  async updateTask(taskId, updateData) {
    try {
      return await Task.findByIdAndUpdate(taskId, updateData, { new: true });
    } catch (error) {
      throw new Error('Error al actualizar tarea: ' + error.message);
    }
  }

  // Funcion para eliminar una tarea
  async deleteTask(taskId) {
    try {
      return await Task.findByIdAndDelete(taskId);
    } catch (error) {
      throw new Error('Error al eliminar tarea: ' + error.message);
    }
  }
}

module.exports = new TaskService();
