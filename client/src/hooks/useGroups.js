import { useState, useEffect } from 'react'

// Hook personalizado para gestionar las funciones de grupos
export const useGroups = () => {
  // Estado para almacenar los grupos en los que el usuario está inscrito
  const [userGroups, setUserGroups] = useState([])
  // Estado para almacenar los grupos creados por el usuario
  const [createdGroups, setCreatedGroups] = useState([])
  // Estado para manejar errores en las solicitudes
  const [error, setError] = useState(null)

  // Función para obtener los grupos en los que el usuario está inscrito
  const fetchUserGroups = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        'http://localhost:3000/groups/listGroupsByUser',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await response.json()

      if (response.ok) {
        if (data.success) {
          setUserGroups(data.group) // Almacena los grupos en el estado
        } else {
          setError(data.error || 'Error al obtener los grupos')
        }
      } else {
        setError(data.error || 'Error al obtener los grupos')
      }
    } catch (error) {
      setError('Error de conexión al obtener grupos')
      console.error('Error:', error)
    }
  }

  // Función para obtener los grupos creados por el usuario
  const fetchCreatedGroups = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        'http://localhost:3000/groups/listGroupsByCreator',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await response.json()

      if (response.ok) {
        setCreatedGroups(data.groups) // Almacena los grupos creados en el estado
      } else {
        setError(data.error || 'Error al obtener los grupos')
      }
    } catch (error) {
      setError('Error de conexión al obtener grupos')
      console.error('Error:', error)
    }
  }

  // Función para crear un nuevo grupo
  const handleGroupSubmit = async (groupData) => {
    try {
      const userStr = localStorage.getItem('user')
      const user = JSON.parse(userStr)
      const token = localStorage.getItem('token')

      const response = await fetch('http://localhost:3000/groups/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nameGroup: groupData.name_group,
          description: groupData.description,
          creatorId: user._id, // ID del usuario creador
        }),
      })
      const data = await response.json()

      if (response.ok) {
        await fetchCreatedGroups() // Actualiza la lista de grupos creados
        return true
      } else {
        setError(data.error || 'Error al crear el grupo')
        return false
      }
    } catch (error) {
      setError('Error de conexión al crear grupo')
      console.error('Error:', error)
      return false
    }
  }

  // Función para inscribirse en un grupo usando un código de invitación
  const handleEnrollGroup = async (enrollData) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:3000/groups/enroll', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: enrollData.code // Código del grupo
        })
      })

      const data = await response.json()

      if (response.ok) {
        await fetchUserGroups() // Actualiza la lista de grupos en los que está el usuario
        return true
      } else {
        setError(data.error || 'Error al enrolar en el grupo')
        return false
      }
    } catch (error) {
      setError('Error de conexión al enrolar en el grupo')
      console.error('Error:', error)
      return false
    }
  }

  // Función para eliminar un grupo creado por el usuario
  const handleDeleteGroup = async (groupId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3000/groups/delete`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupId, // ID del grupo a eliminar
        }),
      })

      const data = await response.json()

      if (response.ok) {
        await fetchCreatedGroups() // Actualiza la lista de grupos creados
        return true
      } else {
        setError(data.error || 'Error al eliminar el grupo')
        return false
      }
    } catch (error) {
      setError('Error de conexión al eliminar grupo')
      console.error('Error:', error)
      return false
    }
  }

  // Efecto que carga los grupos creados y los grupos del usuario al montar el componente
  useEffect(() => {
    fetchCreatedGroups()
    fetchUserGroups()
  }, [])

  // Retorna los grupos del usuario, los grupos creados, errores y funciones para gestionar los grupos
  return {
    userGroups,
    createdGroups,
    error,
    handleGroupSubmit,
    handleEnrollGroup,
    handleDeleteGroup,
  }
}
