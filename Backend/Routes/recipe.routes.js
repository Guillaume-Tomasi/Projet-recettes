const express = require('express');
// const router = require('express').Router();
const router = express.Router();
const multer = require('../middleware/multer-config');
const recipeCtrl = require('../controllers/recipe.controller');

router.post('/', multer, recipeCtrl.createRecipe);
router.get('/:id', recipeCtrl.getRecipe);
router.get('/', recipeCtrl.getAllRecipes);

module.exports = router;