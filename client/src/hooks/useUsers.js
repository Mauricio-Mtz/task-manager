import { useState, useEffect } from 'react'

// Hook personalizado para gestionar las funciones de usuarios
export const useUsers = ({ groupId }) => {
  // Estado para almacenar los usuarios asociados a un grupo
  const [usersByGroup, setUsersByGroup] = useState([])
  // Estado para manejar errores en las solicitudes
  const [error, setError] = useState(null)

  // Función para obtener los usuarios asociados a un grupo desde la API
  const fetchUsersByGroup = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `http://localhost:3000/auth/listUsersByGroup/${groupId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await response.json()

      // Verifica si la respuesta es exitosa y actualiza el estado
      if (response.ok) {
        if (data.success) {
          setUsersByGroup(data.users)
        } else {
          setError(data.error || 'Error al obtener los usuarios')
        }
      } else {
        setError(data.error || 'Error al obtener los usuarios')
      }
    } catch (error) {
      setError('Error de conexión al obtener usuarios')
      console.error('Error:', error)
    }
  }

  // Efecto para obtener los usuarios cuando el componente se monta
  useEffect(() => {
    fetchUsersByGroup()
  }, [])

  // Retorna la lista de usuarios, errores y la función para recargar los datos
  return {
    usersByGroup,
    error,
    fetchUsersByGroup,
  }
}
