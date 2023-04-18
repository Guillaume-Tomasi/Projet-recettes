const router = require('express').Router();
const recipeCtrl = require('../controllers/recipe.controller');

router.post('/', recipeCtrl.createRecipe)
router.get('/:id', recipeCtrl.getRecipe);
router.get('/', recipeCtrl.getAllRecipes);

module.exports = router;