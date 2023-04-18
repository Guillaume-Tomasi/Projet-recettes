const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const recipeSchema = mongoose.Schema({
   userId: { type: String, required: true },
   name: { type: String, required: true, minlength: 2, maxlength: 30, unique: true },
   ingredients: [{ type: String, required: true }],
   image: { type: String, default: 'http://localhost:5500/Frontend/images/Page ingredients/default.jpg' }
});



recipeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Recipe', recipeSchema);