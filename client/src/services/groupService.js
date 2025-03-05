import { apiClient } from '../config/api';

export const groupService = {
  // Obtener grupos en los que está inscrito el usuario
  getUserGroups: async () => {
    return apiClient.get('/groups/listGroupsByUser');
  },

  // Obtener grupos creados por el usuario
  getCreatedGroups: async () => {
    return apiClient.get('/groups/listGroupsByCreator');
  },

  // Crear un nuevo grupo
  createGroup: async (nameGroup, description, creatorId) => {
    return apiClient.post('/groups/create', {
      nameGroup,
      description,
      creatorId
    });
  },

  // Inscribirse en un grupo
  enrollGroup: async (code) => {
    return apiClient.post('/groups/enroll', { code });
  },

  // Eliminar un grupo
  deleteGroup: async (groupId) => {
    return apiClient.delete('/groups/delete', {
      data: { groupId }
    });
  }
};