const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ingredientSchema = mongoose.Schema({
   // userId: { type: String, required: true },
   name: { type: String, required: true, minlength: 2, maxlength: 15, unique: true },
   image: { type: String }
});

ingredientSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Ingredient', ingredientSchema);