const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')

// Inicializar Firebase Admin
const serviceAccount = require('./practica-desarrollo-web-firebase-adminsdk-fbsvc-5f7c2e1a32.json')
initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore()

// Funciones para usuarios
// Función que permite crear un usuario
exports.createUser = async (userData) => {
  try {
    const userRef = await db.collection('users').add(userData)
    return { id: userRef.id, ...userData }
  } catch (error) {
    throw new Error('Error al crear usuario: ' + error.message)
  }
}

// Función que permite verificar que exista el usaurio según el email 
exports.verifyUser = async (email) => {
  try {
    const usersRef = db.collection('users')
    const snapshot = await usersRef.where('email', '==', email).get()

    if (snapshot.empty) {
      return null
    }

    const doc = snapshot.docs[0]
    return { id: doc.id, ...doc.data() }
  } catch (error) {
    throw new Error('Error al verificar usuario: ' + error.message)
  }
}

// Función que permite actualizar el ultimo inicio de sesión de un usuario segun su id
exports.updateLastLogin = async (userId) => {
  try {
    await db.collection('users').doc(userId).update({
      last_login: new Date().toISOString(),
    })
  } catch (error) {
    throw new Error('Error al actualizar último login: ' + error.message)
  }
}

// Funciones para tareas
// Función que permite crear una tarea
exports.createTask = async (taskData) => {
  try {
    const taskRef = await db.collection('tasks').add(taskData)
    return { id: taskRef.id, ...taskData }
  } catch (error) {
    throw new Error('Error al crear tarea: ' + error.message)
  }
}

// Función que permite obtener todas las tareas registradas
exports.getTasks = async () => {
  try {
    const tasksRef = db.collection('tasks')
    const snapshot = await tasksRef.get()
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    throw new Error('Error al obtener tareas: ' + error.message)
  }
}

// Función que permite eliminar una tarea especifica
exports.deleteTask = async (taskId) => {
  try {
    await db.collection('tasks').doc(taskId).delete()
    return { success: true }
  } catch (error) {
    throw new Error('Error al eliminar tarea: ' + error.message)
  }
}