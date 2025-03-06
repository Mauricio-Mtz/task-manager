const mongoose = require('mongoose');

// Conexión a la base de datos
const mongoDb = mongoose.createConnection('mongodb+srv://2022371199:BTEU4sBy1MLTAXjm@task-manager.1z4y8.mongodb.net/?retryWrites=true&w=majority&appName=task-manager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// En caso de que la conexion sea erronea
mongoDb.on('error', (error) => {
    console.error('Error de conexión MongoDB:', error);
});

// En caso de que la conexion sea exitosa
mongoDb.once('open', () => {
    console.info('Conexión MongoDB lista');
});

module.exports = mongoDb;