import { useState, useEffect } from 'react'

// Hook personalizado para gestionar las funciones de tareas.
export const useTasks = (groupId) => {
  // Estado para almacenar las tareas.
  const [tasks, setTasks] = useState([])
  // Estado para manejar errores en las solicitudes.
  const [error, setError] = useState(null)

  // Obtiene la lista de tareas del usuario o del grupo si se proporciona un groupId.
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token')
      let url = 'http://localhost:3000/tasks/listTasksByUser'
      if (groupId) {
        url = `http://localhost:3000/tasks/listTasksByGroup/${groupId}`
      }
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()

      if (response.ok) {
        setTasks(data.tasks)
      } else {
        setError(data.error || 'Error al obtener las tareas')
      }
    } catch (error) {
      setError('Error de conexión al obtener tareas')
      console.error('Error:', error)
    }
  }

  // Crea una nueva tarea con la información proporcionada.
  const createTask = async (taskData) => {
    console.log('taskData', taskData)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:3000/tasks/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nameTask: taskData.name_task,
          description: taskData.description,
          deadLine: taskData.dead_line,
          status: taskData.status,
          category: taskData.category,
          personalUserId: taskData.user_id,
          groupId: groupId,
        }),
      })
      const data = await response.json()

      if (response.ok) {
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

  // Elimina una tarea según su ID.
  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `http://localhost:3000/tasks/delete/${taskId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (response.ok) {
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

  // Actualiza el estado de una tarea según su ID.
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `http://localhost:3000/tasks/updateStatus/${taskId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        }
      )

      const data = await response.json()

      if (response.ok) {
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

  // Ejecuta fetchTasks cuando cambia el groupId para actualizar las tareas.
  useEffect(() => {
    fetchTasks()
  }, [groupId])

  // Retorna la lista de tareas, errores y funciones para crear, eliminar y actualizar tareas.
  return {
    tasks,
    error,
    createTask,
    deleteTask,
    updateTaskStatus,
    fetchTasks,
  }
}
