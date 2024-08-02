const Recipe = require('../models/Recipe');

exports.createRecipe = (req, res, next) => {
   const { name, ingredients, type, steps } = req.body;
   let imagepath = 'http://localhost:5500/Frontend/images/Page recettes/default.jpg'; // Chemin par défaut

   if (req.file) {
      imagepath = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
   }

   const recipe = new Recipe({
      name,
      type,
      ingredients,
      steps,
      image: imagepath
   });

   recipe.save()
      .then(() => res.status(201).json({ message: 'recette créée !' }))
      .catch(error => res.status(400).json({ error }));
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

