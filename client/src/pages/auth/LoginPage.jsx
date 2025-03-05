import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import Navbar from '@/components/elements/navbar'
import { useAuth } from '@/hooks/useAuth'

function LoginPage() {
  const navigate = useNavigate()
  const { formData, error, handleChange, handleLogin } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    await handleLogin(navigate)
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-slate-400 flex flex-col items-center gap-2 border border-slate-900 p-6 rounded-2xl w-full max-w-md mx-4">
          <div className="text-2xl font-bold mb-4">
            <h1>Inicio de sesión</h1>
          </div>

          {error && (
            <div className="w-full p-3 mb-4 text-sm text-red-500 bg-red-200 rounded-lg">
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
              className="w-full mt-2 bg-slate-500 hover:bg-slate-600"
            >
              Acceder
            </Button>
          </form>
          <p className="text-center text-sm mt-2">
            ¿No tienes cuenta?
            <button
              type="button"
              onClick={() => navigate('/auth/register')}
              className="text-blue-600 hover:text-blue-700"
            >
              Crea una
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage