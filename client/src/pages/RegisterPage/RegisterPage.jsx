import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Navbar from '@/components/elements/navbar';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    // Limpiar mensaje de error cuando el usuario empiece a escribir
    setError('');
  };

  // Función flecha para el registro del usuario
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validar que se ingresaron todos los datos
    if (!formData.email || !formData.password || !formData.username) {
      setError('Por favor, completa todos los campos');
      return;
    }
    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, ingresa un correo electrónico válido');
      return;
    }
    // Validar longitud de la contraseña
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    // Intentar hacer la petición al backend
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: formData.username,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        // Registro en caso de exito
        navigate('/login');
      } else {
        // Mostrar mensaje de error del servidor
        setError(data.error || 'Error al registrar usuario');
      }
    } catch (error) {
      setError('Error de conexión. Intente nuevamente.');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-slate-400 flex flex-col items-center gap-2 border border-slate-900 p-6 rounded-2xl w-full max-w-md mx-4">
          <div className="text-2xl font-bold mb-4">
            <h1>Registro de Usuario</h1>
          </div>

          {error && (
            <div className="w-full p-3 mb-4 text-sm text-red-500 bg-red-200 rounded-lg">
              {error}
            </div>
          )}

          <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label htmlFor="username" className="text-sm font-medium">
                Nombre de usuario:
              </label>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="Ingresa tu nombre de usuario"
                value={formData.username}
                onChange={handleChange}
                className="w-full"
              />
            </div>

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

            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirmar Contraseña:
              </label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirma tu contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              variant="default"
              className="w-full mt-2 bg-slate-500 hover:bg-slate-600"
            >
              Registrarse
            </Button>

            <p className="text-center text-sm mt-2">
                ¿Ya tienes cuenta?
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-blue-600 hover:text-blue-700"
              >
                Inicia sesión
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;