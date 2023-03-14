const router = require('express').Router();
const ingredientCtrl = require('../controllers/ingredient.controller');

router.post('/', ingredientCtrl.createIngredient)
router.get('/:id', ingredientCtrl.getIngredient);
router.get('/', ingredientCtrl.getAllIngredients);

module.exports = router;