const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/auth.routes');
const taskRoutes = require('./src/routes/task.routes');
const groupRoutes = require('./src/routes/group.routes');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Servicios principales
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/groups', groupRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});