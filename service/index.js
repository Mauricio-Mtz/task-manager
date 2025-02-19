const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const app = express()
const port = 3000
const JWT_SECRET = '1224'

// Middleware
app.use(cors())
app.use(express.json())

// Importar funciones creadas de Firebase
const {
  createUser,
  verifyUser,
  updateLastLogin,
  createTask,
  getTasks,
  deleteTask,
} = require('./db.js')

// Middleware de autenticación - permite validar el token, si es correcto y si todavía es válido
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado' })
    }
    req.user = user
    next()
  })
}

// Rutas públicas (no requieren autenticación)
// Ruta para registrar un usuario
app.post('/register', async (req, res) => {
  try {
    const { email, password, username } = req.body

    if (!email || !password || !username) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userData = {
      email,
      password: hashedPassword,
      username,
      last_login: new Date().toISOString(),
    }

    const newUser = await createUser(userData)
    res.status(201).json({ success: true, user: newUser })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Ruta para iniciar sesión con una cuenta previamente registrada
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' })
    }

    const user = await verifyUser(email)

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(401).json({ error: 'Contraseña inválida' })
    }

    await updateLastLogin(user.id)

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '10m',
    })

    res.json({
      success: true,
      token,
      user: {
        email: user.email,
        username: user.username,
        last_login: user.last_login,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Rutas protegidas (requieren autenticación)
// Ruta para obtener todas las tareas
app.get('/getTasks', authenticateToken, async (req, res) => {
  try {
    const tasks = await getTasks()
    res.status(200).json({ success: true, tasks: tasks })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Ruta para crear una tarea
app.post('/createTask', authenticateToken, async (req, res) => {
  try {
    const { name_task, description, dead_line, status, category } = req.body

    if (!name_task || !description || !dead_line || !status || !category) {
      return res.status(400).json({ error: 'Ingrese todos los datos' })
    }

    const task = {
      name_task,
      description,
      dead_line,
      status,
      category,
    }

    const newTask = await createTask(task)
    res.status(201).json({ success: true, user: newTask })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Ruta para la eliminacion de las tareas
app.delete('/deleteTask/:taskId', authenticateToken, async (req, res) => {
  try {
    const { taskId } = req.params
    
    const result = await deleteTask(taskId)
    res.status(200).json({ success: result.success })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})