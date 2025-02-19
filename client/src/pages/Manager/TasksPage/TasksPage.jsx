import Sidebar from '@/components/elements/Sidebar'
import Navbar from '@/components/elements/navbar'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import TaskModal from './TaskModal'

//Pagina de tareas
function TasksPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState(null)

  // Función flecha para la obtención de todas las tareas
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/getTasks',{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
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

  // Función flecha para la creación de tareas nuevas
  const handleTaskSubmit = async (taskData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/createTask', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData),
      })
      const data = await response.json()

      if (response.ok) {
        // Actualizar la lista de tareas después de crear una nueva
        await fetchTasks()
        setModalOpen(false)
      } else {
        setError(data.error || 'Error al crear la tarea')
      }
    } catch (error) {
      setError('Error de conexión al crear tarea')
      console.error('Error:', error)
    }
  }

  // Función flecha para la eliminación de tareas
  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/deleteTask/${taskId}`,{
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      const data = await response.json()

      if (response.ok) {
        // Actualizar la lista de tareas después de eliminar una tarea
        await fetchTasks()
      } else {
        setError(data.error || 'Error al eliminar la tarea')
      }
    } catch (error) {
      setError('Error de conexión al eliminar tarea')
      console.error('Error:', error)
    }
  }

  // Formatear la fecha almacenada a un formato mas natural
  const formatDate = (dateString) => {
    if (!dateString) return 'No disponible'
    const date = new Date(dateString)
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Hook para el renderizado de las tareas
  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen pt-16">
        <Sidebar />
        <div className="flex-1 p-8 relative">
          <h1 className="text-3xl text-center font-bold text-slate-400 mb-6">
            Tareas
          </h1>
          {/* Lista de tareas */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <Card key={task.id} className="bg-slate-400">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>{task.name_task}</CardTitle>
                  <button
                    className="bg-red-500 hover:bg-red-600 p-1 rounded-md"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <Trash className="h-4 w-4 text-muted-foreground" />
                  </button>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">
                      Fecha límite: {formatDate(task.dead_line)}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        task.status === 'done'
                          ? 'bg-green-500'
                          : task.status === 'in_progress'
                          ? 'bg-yellow-500'
                          : 'bg-slate-500'
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {error && (
            <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          {/* Botón flotante */}
          <Button
            className="fixed bottom-8 right-8 rounded-full w-12 h-12 shadow-lg bg-slate-600"
            onClick={() => setModalOpen(true)}
          >
            <Plus className="h-6 w-6" />
          </Button>

          {/* Modal de tarea */}
          <TaskModal
            open={modalOpen}
            onOpenChange={setModalOpen}
            onSubmit={handleTaskSubmit}
          />
        </div>
      </div>
    </div>
  )
}
export default TasksPage