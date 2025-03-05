import { useState, useEffect } from 'react'
import { authService } from '../services/authService'

export const useUsers = ({ groupId }) => {
  // Estado para almacenar los usuarios asociados a un grupo
  const [usersByGroup, setUsersByGroup] = useState([])
  // Estado para manejar errores en las solicitudes
  const [error, setError] = useState(null)

  // Función para obtener los usuarios asociados a un grupo
  const fetchUsersByGroup = async () => {
    try {
      const data = await authService.getUsersByGroup(groupId)

      if (data.success) {
        setUsersByGroup(data.users)
      } else {
        setError(data.error || 'Error al obtener los usuarios')
      }
    } catch (error) {
      setError('Error de conexión al obtener usuarios')
      console.error('Error:', error)
    }
  }

  // Efecto para obtener los usuarios cuando el componente se monta o cambia el groupId
  useEffect(() => {
    if (groupId) {
      fetchUsersByGroup()
    }
  }, [groupId])

  return {
    usersByGroup,
    error,
    fetchUsersByGroup,
  }
}