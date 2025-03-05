const mongoose = require('mongoose');
const connectDB = require('../../config/mongo.config');

// Definir el esquema de la colección "tasks"
const TaskSchema = new mongoose.Schema({
  name_task: { type: String, required: true },
  description: { type: String, required: true },
  dead_line: { type: Date, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true },
  user_id: { type: String, required: true },
  group_id: { type: String },
  created_at: { type: Date, default: Date.now }
});

// Crear un campo virtual "id" basado en _id
TaskSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Configurar el esquema para incluir virtuals al convertir a JSON
TaskSchema.set('toJSON', { virtuals: true });

module.exports = connectDB.model('Task', TaskSchema);