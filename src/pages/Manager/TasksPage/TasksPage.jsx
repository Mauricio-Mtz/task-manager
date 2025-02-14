import Sidebar from '@/components/elements/Sidebar'
import Navbar from '@/components/elements/navbar'

//Pagina de tareas
function TasksPage() {
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen">
        {/*Componente sidebar para navegacion en dashboard*/}
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Tareas
          </h1>
        </div>
      </div>
    </div>
  )
}

export default TasksPage
