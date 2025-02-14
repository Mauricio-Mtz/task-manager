/* eslint-disable react/prop-types */
import Navbar from '@/components/elements/navbar'

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/*Componente para la navegación superior de la aplicación*/}
      <Navbar />
      <main className="container mx-auto px-4 pt-20 pb-16">
        {/*Aqui irá todo el contenido del landing*/}
        {children}
      </main>
    </div>
  )
}