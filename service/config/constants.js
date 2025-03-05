// config/constants.js

module.exports = {
    // Configuración JWT
    JWT_SECRET: process.env.JWT_SECRET || '1224', // Idealmente debería venir de variables de entorno
    JWT_EXPIRES_IN: '10m',
  
    // Estados de las tareas
    TASK_STATUS: {
      TODO: 'TODO',
      IN_PROGRESS: 'IN_PROGRESS',
      DONE: 'DONE'
    },
  
    // Categorías de tareas
    TASK_CATEGORIES: {
      WORK: 'WORK',
      PERSONAL: 'PERSONAL',
      SHOPPING: 'SHOPPING',
      OTHERS: 'OTHERS'
    },
  
    // Roles de usuario en grupos
    GROUP_ROLES: {
      CREATOR: 'CREATOR',
      MEMBER: 'MEMBER'
    },
  
    // Mensajes de error comunes
    ERROR_MESSAGES: {
      AUTH: {
        INVALID_CREDENTIALS: 'Email o contraseña incorrectos',
        USER_NOT_FOUND: 'Usuario no encontrado',
        EMAIL_IN_USE: 'El email ya está registrado',
        INVALID_TOKEN: 'Token inválido o expirado',
        TOKEN_REQUIRED: 'Token no proporcionado',
        FIELDS_REQUIRED: 'Todos los campos son requeridos'
      },
      TASK: {
        NOT_FOUND: 'Tarea no encontrada',
        UNAUTHORIZED: 'No tienes permisos para esta tarea',
        INVALID_STATUS: 'Estado de tarea inválido'
      },
      GROUP: {
        NOT_FOUND: 'Grupo no encontrado',
        UNAUTHORIZED: 'No tienes permisos para este grupo',
        ALREADY_MEMBER: 'El usuario ya es miembro del grupo'
      }
    },
  };