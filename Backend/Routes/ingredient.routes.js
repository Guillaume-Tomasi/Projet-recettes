const router = require('express').Router();
const multer = require('../middleware/multer-config');
const ingredientCtrl = require('../controllers/ingredient.controller');

router.post('/', multer, ingredientCtrl.createIngredient)
router.get('/:id', ingredientCtrl.getIngredient);
router.get('/', ingredientCtrl.getAllIngredients);
router.delete('/:id', ingredientCtrl.deleteIngredient);

module.exports = router;