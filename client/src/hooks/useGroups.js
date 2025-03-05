import { useState, useEffect } from 'react'
import { groupService } from '../services/groupService'

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
      const data = await groupService.getUserGroups()

      if (data.success) {
        setUserGroups(data.group)
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
      const data = await groupService.getCreatedGroups()

      if (data.groups) {
        setCreatedGroups(data.groups)
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

      const data = await groupService.createGroup(
        groupData.name_group,
        groupData.description,
        user._id
      )

      if (data.success) {
        await fetchCreatedGroups()
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
      const data = await groupService.enrollGroup(enrollData.code)

      if (data.success) {
        await fetchUserGroups()
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
      const data = await groupService.deleteGroup(groupId)

      if (data.success) {
        await fetchCreatedGroups()
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

  return {
    userGroups,
    createdGroups,
    error,
    handleGroupSubmit,
    handleEnrollGroup,
    handleDeleteGroup,
  }
}
