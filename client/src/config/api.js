// config/api.js
import axios from 'axios';

// Crear una instancia de Axios con configuración personalizada
export const apiClient = axios.create({
  baseURL: 'https://task-manager-service.vercel.app/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Configurar interceptor de solicitud
apiClient.interceptors.request.use(
  function (config) {
    // Añadir token de autenticación si está disponible
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Configurar interceptor de respuesta
apiClient.interceptors.response.use(
  function (response) {
    // Procesar respuesta exitosa
    return response.data; // Devuelve directamente los datos para evitar response.json()
  },
  function (error) {
    // Manejar errores comunes
    if (error.response) {
      // Errores con respuesta del servidor
      switch (error.response.status) {
        case 401:
          console.log('No autorizado - redirigiendo a login');
          localStorage.removeItem('token');
          // Aquí podrías redirigir al login o emitir un evento para notificar a otros componentes
          break;
        case 403:
          console.log('Acceso prohibido');
          break;
        // Otros casos según necesites
      }
      
      return Promise.reject({
        status: error.response.status,
        message: error.response.data.message || 'Error en la solicitud'
      });
    } else if (error.request) {
      // Error de conexión
      return Promise.reject({
        status: 0,
        message: 'No se pudo conectar con el servidor'
      });
    } else {
      return Promise.reject({
        status: 0,
        message: error.message
      });
    }
  }
);