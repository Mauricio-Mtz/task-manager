import Sidebar from '@/components/elements/Sidebar'
import Navbar from '@/components/elements/navbar'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User } from 'lucide-react'
function DashboardPage() {
  const [userData, setUserData] = useState(null)
  useEffect(() => {
    // Obtener la información del usuario del localStorage
    const userDataStr = localStorage.getItem('user')
    if (userDataStr) {
      const parsedData = JSON.parse(userDataStr)
      setUserData(parsedData)
    }
  }, [])
  // Funcion flecha para formatear la fecha a un lenguaje mas común
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
  return (
    <div><Navbar /><div className="flex min-h-screen pt-16">
        <Sidebar /><div className="flex-1 p-8 relative">
          <h1 className="text-3xl text-center font-bold text-slate-400 mb-6">
            Dashboard
          </h1>
          {userData && (
            <Card className="bg-slate-400 mb-6">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Información del usuario
                </CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Usuario:</h2>
                  <h3 className="text-xl">{userData.username}</h3>
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Correo:</h2>
                  <h3 className="text-xl">{userData.email}</h3>
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Último acceso:</h2>
                  <h3 className="text-xl">
                    {formatDate(userData.last_login)}
                  </h3>
                </div>
              </CardContent>
            </Card>
          )}
          {!userData && (
            <div className="text-center text-gray-500">
              <p>No se encontró información del usuario</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default DashboardPage