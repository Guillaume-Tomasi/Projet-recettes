const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ingredientSchema = mongoose.Schema({
   userId: { type: String, required: true },
   name: { type: String, required: true, minlength: 2, maxlength: 30, unique: true },
   image: { type: String, default: 'http://localhost:5500/Frontend/images/Page ingredients/default.jpg' }
});

ingredientSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Ingredient', ingredientSchema);