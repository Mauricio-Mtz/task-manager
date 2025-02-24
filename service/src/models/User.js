const mongoose = require('mongoose');
const connectDB = require('../../config/mongo.config');

// Definir el esquema de la colección "users"
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  last_login: { type: Date, default: Date.now },
  groups: { type: [String], default: [] },
  created_at: { type: Date, default: Date.now }
});

// Crear un campo virtual "id" basado en _id
UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Configurar el esquema para incluir virtuals al convertir a JSON
UserSchema.set('toJSON', { virtuals: true });

module.exports = connectDB.model('User', UserSchema);
