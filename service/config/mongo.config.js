const mongoose = require('mongoose');

// Conexión a la base de datos
const mongoDb = mongoose.createConnection('mongodb://localhost:27017/task_manager', {
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