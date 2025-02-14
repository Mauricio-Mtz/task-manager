import { Link } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'

function LandingPage() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center max-w-6xl mx-auto">
        {/* Seccion para describir la aplicación */}
        <section className="w-full space-y-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Bienvenido a<span className="text-gray-600"> Task Manager</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Task Manager es una aplicación diseñada para ayudarte a organizar
            y gestionar tus tareas diarias de manera eficiente.
          </p>

          <div>
            <Link
              to="/login"
              className="inline-block px-8 py-4 text-lg bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
            >
              Comenzar ahora
            </Link>
          </div>

          {/* Seccion para mostrar algunas caracteristicas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 text-center">
              <h3 className="font-semibold text-lg text-gray-900">
                Fácil de Usar
              </h3>
              <p className="text-gray-600 mt-2">
                Interfaz intuitiva y amigable
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 text-center">
              <h3 className="font-semibold text-lg text-gray-900">
                Todo en un Lugar
              </h3>
              <p className="text-gray-600 mt-2">
                Centraliza todas tus tareas
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 text-center">
              <h3 className="font-semibold text-lg text-gray-900">
                Sin Complicaciones
              </h3>
              <p className="text-gray-600 mt-2">
                Organiza tus tareas con un clic
              </p>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}

export default LandingPage