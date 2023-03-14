const Ingredient = require('../models/Ingredient')

exports.createIngredient = (req, res, next) => {
   const ingredient = new Ingredient({
      userId: req.body.userId,
      name: req.body.name
   });
   ingredient.save()
      .then(() => res.status(201).json({ message: 'ingrédient créé !' }))
      .catch(error => res.status(400).json({ message: "Les informations saisies sont incorrectes" }));
};

exports.getIngredient = (req, res, next) => {
   Ingredient.findOne({ _id: req.params.id })
      .then(ingredient => { return res.status(200).json(ingredient) })
      .catch(err => res.status(404).json({ err }))
}

exports.getAllIngredients = (req, res, next) => {
   Ingredient.find()
      .then(ingredients => res.status(200).json({ ingredients }))
      .catch(err => res.status(404).json({ err }))
}