const mongoose = require('mongoose');
const connectDB = require('../../config/mongo.config');

// Definir el esquema de la colección "groups"
const GroupSchema = new mongoose.Schema({
  name_group: { type: String, required: true },
  description: { type: String, required: true },
  creator_id: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

// Crear un campo virtual "id" basado en _id
GroupSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Configurar el esquema para incluir virtuals al convertir a JSON
GroupSchema.set('toJSON', { virtuals: true });

module.exports = connectDB.model('Group', GroupSchema);