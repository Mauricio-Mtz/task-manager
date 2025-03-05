import { useState } from 'react'

// Hook personalizado para gestionar las funciones de autenticación
export const useAuth = () => {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
  })
  // Estado para manejar errores en las solicitudes
  const [error, setError] = useState('')

  // Función para actualizar los datos del formulario
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
    // Limpiar mensaje de error cuando el usuario empiece a escribir
    setError('')
  }

  // Función flecha para el inicio de sesión del usuario
  const handleLogin = async (navigate) => {
    // Validar campos vacíos
    if (!formData.email || !formData.password) {
      setError('Por favor, completa todos los campos')
      return
    }
    // Intentar hacer la petición al backend
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })
      const data = await response.json()

      if (response.ok) {
      // Inicio de sesion en caso de exito
        // Guardar el token en localStorage
        localStorage.setItem('token', data.token)
        // Guardar información del usuario si es necesario
        localStorage.setItem('user', JSON.stringify(data.user))
        // Guardar estado de login
        localStorage.setItem('isLoggedIn', 'true')
        // Redirigir al dashboard
        navigate('/manager/dashboard')
        return true
      } else {
        // Mostrar mensaje de error del servidor
        setError(data.error || 'Error al iniciar sesión')
        return false
      }
    } catch (error) {
      setError('Error de conexión. Intente nuevamente.')
      console.error('Error:', error)
      return false
    }
  }

  // Función flecha para el registro del usuario
  const handleRegister = async (navigate) => {
    // Validar que se ingresaron todos los datos
    if (!formData.email || !formData.password || !formData.username) {
      setError('Por favor, completa todos los campos')
      return false
    }
    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return false
    }
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, ingresa un correo electrónico válido')
      return false
    }
    // Validar longitud de la contraseña
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return false
    }
    // Intentar hacer la petición al backend
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: formData.username,
        }),
      })
      const data = await response.json()

      if (response.ok) {
        // Registro en caso de exito
        navigate('/auth/login')
        return true
      } else {
        // Mostrar mensaje de error del servidor
        setError(data.error || 'Error al registrar usuario')
        return false
      }
    } catch (error) {
      setError('Error de conexión. Intente nuevamente.')
      console.error('Error:', error)
      return false
    }
  }

  // Retorna los datos, errores y funciones para gestionar la autenticación
  return {
    formData,
    error,
    setFormData,
    handleChange,
    handleLogin,
    handleRegister,
  }
}