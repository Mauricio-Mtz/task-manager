import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Navbar from '@/components/elements/navbar'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  // Usuario hardcodeado
  const validUser = {
    email: 'mauri@gmail.com',
    password: 'ABcd12!"'
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
    // Limpiar mensaje de error cuando el usuario empiece a escribir
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    
    // Validar campos vacíos
    if (!formData.email || !formData.password) {
      setError('Por favor, completa todos los campos')
      return
    }

    // Validar credenciales
    if (formData.email === validUser.email && formData.password === validUser.password) {
      // Simular guardado de sesión
      localStorage.setItem('isLoggedIn', 'true')
      // Redirigir al dashboard
      navigate('/manager/dashboard')
    } else {
      setError('Credenciales incorrectas')
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-2 border p-6 rounded-2xl w-full max-w-md mx-4">
          <div className="text-2xl font-bold mb-4">
            <h1>Inicio de sesión</h1>
          </div>

          {error && (
            <div className="w-full p-3 mb-4 text-sm text-red-500 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium">
                Correo:
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="correo@correo.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium">
                Contraseña:
              </label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                value={formData.password}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <Button 
              type="submit" 
              variant="default"
              className="w-full mt-2"
            >
              Acceder
            </Button>
          </form>

          <div className="mt-4 text-sm text-gray-500">
            Usuario de prueba: test@test.com / 123456
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage