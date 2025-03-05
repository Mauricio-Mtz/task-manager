import { apiClient } from '../config/api';

export const taskService = {
  // Obtener tareas del usuario
  getUserTasks: async () => {
    return apiClient.get('/tasks/listTasksByUser');
  },

  // Obtener tareas de un grupo
  getGroupTasks: async (groupId) => {
    return apiClient.get(`/tasks/listTasksByGroup/${groupId}`);
  },

  // Crear una nueva tarea
  createTask: async (taskData) => {
    return apiClient.post('/tasks/create', {
      nameTask: taskData.name_task,
      description: taskData.description,
      deadLine: taskData.dead_line,
      status: taskData.status,
      category: taskData.category,
      personalUserId: taskData.user_id,
      groupId: taskData.group_id
    });
  },

  // Eliminar una tarea
  deleteTask: async (taskId) => {
    return apiClient.delete(`/tasks/delete/${taskId}`);
  },

  // Actualizar estado de una tarea
  updateTaskStatus: async (taskId, newStatus) => {
    return apiClient.put(`/tasks/updateStatus/${taskId}`, {
      status: newStatus
    });
  }
};