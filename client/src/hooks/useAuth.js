import { useState } from 'react'
import { authService } from '../services/authService'

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

  // Función para el inicio de sesión del usuario
  const handleLogin = async (navigate) => {
    // Validar campos vacíos
    if (!formData.email || !formData.password) {
      setError('Por favor, completa todos los campos')
      return false
    }

    try {
      // Llamada al servicio de autenticación
      const data = await authService.login(formData.email, formData.password)

      if (data.token) {
        // Inicio de sesión en caso de éxito
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('isLoggedIn', 'true')
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

  // Función para el registro del usuario
  const handleRegister = async (navigate) => {
    console.log(formData)
    // Validar que se ingresaron todos los datos
    if (!formData.email || !formData.password || !formData.username || !formData.type) {
      setError('Por favor, completa todos los campos')
      return false
    }
    // Validar que los typos de usuarios sean los correctos
    if (formData.type !== 'user' && formData.type !== 'creator') {
        setError('Tipo de cuenta inválido')
        return false
    }
    
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

    try {
      // Llamada al servicio de registro
      const data = await authService.register(
        formData.email,
        formData.password,
        formData.username,
        formData.type
      )

      if (data.success) {
        // Registro en caso de éxito
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

  return {
    formData,
    error,
    setFormData,
    handleChange,
    handleLogin,
    handleRegister,
  }
}
