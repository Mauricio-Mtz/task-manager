import { useState, useEffect } from 'react'
import { taskService } from '../services/taskService'

export const useTasks = (groupId) => {
  // Estado para almacenar las tareas
  const [tasks, setTasks] = useState([])
  // Estado para manejar errores en las solicitudes
  const [error, setError] = useState(null)

  // Obtiene la lista de tareas del usuario o del grupo si se proporciona un groupId
  const fetchTasks = async () => {
    try {
      let data

      if (groupId) {
        data = await taskService.getGroupTasks(groupId)
      } else {
        data = await taskService.getUserTasks()
      }

      if (data.tasks) {
        setTasks(data.tasks)
      } else {
        setError(data.error || 'Error al obtener las tareas')
      }
    } catch (error) {
      setError('Error de conexión al obtener tareas')
      console.error('Error:', error)
    }
  }

  // Crea una nueva tarea con la información proporcionada
  const createTask = async (taskData) => {
    try {
      // Asegurarse de que groupId esté incluido en taskData
      const taskDataWithGroup = {
        ...taskData,
        group_id: groupId,
      }

      const data = await taskService.createTask(taskDataWithGroup)

      if (data.success) {
        await fetchTasks()
        return true
      } else {
        setError(data.error || 'Error al crear la tarea')
        return false
      }
    } catch (error) {
      setError('Error de conexión al crear tarea')
      console.error('Error:', error)
      return false
    }
  }

  // Elimina una tarea según su ID
  const deleteTask = async (taskId) => {
    try {
      const data = await taskService.deleteTask(taskId)

      if (data.success) {
        await fetchTasks()
        return true
      } else {
        setError(data.error || 'Error al eliminar la tarea')
        return false
      }
    } catch (error) {
      setError('Error de conexión al eliminar tarea')
      console.error('Error:', error)
      return false
    }
  }

  // Actualiza el estado de una tarea según su ID
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const data = await taskService.updateTaskStatus(taskId, newStatus)

      if (data.success) {
        // Actualizar el estado local para evitar una nueva petición
        const updatedTasks = tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
        setTasks(updatedTasks)
        return true
      } else {
        throw new Error(
          data.error || 'Error al actualizar el estado de la tarea'
        )
      }
    } catch (error) {
      console.error('Error en la actualización:', error)
      setError(error.message || 'Error de conexión al actualizar la tarea')
      return false
    }
  }

  // Ejecuta fetchTasks cuando cambia el groupId para actualizar las tareas
  useEffect(() => {
    fetchTasks()
  }, [groupId])

  return {
    tasks,
    error,
    createTask,
    deleteTask,
    updateTaskStatus,
    fetchTasks,
  }
}
