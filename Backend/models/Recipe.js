const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const recipeSchema = mongoose.Schema({
   name: { type: String, required: true, minlength: 2, maxlength: 30, unique: true },
   ingredients: [{ type: String, required: true }],
   image: { type: String },
   type: { type: String, required: true },
   steps: [{ type: String, required: true }]
});

recipeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Recipe', recipeSchema);

