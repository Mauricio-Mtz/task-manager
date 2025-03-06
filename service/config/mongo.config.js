const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://2022371199:BTEU4sBy1MLTAXjm@task-manager.1z4y8.mongodb.net/?retryWrites=true&w=majority&appName=task-manager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    tls: true
})
.then(() => console.info('Conexión MongoDB lista'))
.catch(error => console.error('Error de conexión MongoDB:', error));

module.exports = mongoose.connection;