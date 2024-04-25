const Recipe = require('../models/Recipe');

exports.createRecipe = (req, res, next) => {
   const { name, ingredients } = req.body;
   const recipe = new Recipe({
      // userId: req.body.userId,
      name,
      ingredients
   });
   recipe.save()
      .then(() => res.status(201).json({ message: 'recette créée !' }))
      .catch(error => res.status(400).json({ message: "Les informations saisies sont incorrectes" }));
}
exports.getRecipe = (req, res, next) => {
   Recipe.findOne({ _id: req.params.id })
      .then(recipe => { return res.status(200).json(recipe) })
      .catch(err => res.status(404).json({ err }))
}
exports.getAllRecipes = (req, res, next) => {
   Recipe.find()
      .then(recipes => res.status(200).json({ recipes }))
      .catch(err => res.status(404).json({ err }))
}
