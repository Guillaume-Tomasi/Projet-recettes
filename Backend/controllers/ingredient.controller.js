const Ingredient = require('../models/Ingredient')

exports.createIngredient = (req, res, next) => {
   let imagepath = 'http://localhost:5500/Frontend/images/Page ingredients/default.jpg';
   if (req.file) {
      imagepath = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
   }

   const ingredient = new Ingredient({
      name: req.body.name,
      image: imagepath
   });

   ingredient.save()
      .then(() => res.status(201).json({ message: 'ingrédient créé !' }))
      .catch(error => res.status(400).json({ error }));
};

exports.getIngredient = (req, res, next) => {
   Ingredient.findOne({ _id: req.params.id })
      .then(ingredient => { return res.status(200).json(ingredient) })
      .catch(err => res.status(404).json({ err }));
}

exports.getAllIngredients = (req, res, next) => {
   Ingredient.find()
      .then(ingredients => res.status(200).json({ ingredients }))
      .catch(err => res.status(404).json({ err }));
}

exports.deleteIngredient = (req, res, next) => {
   Ingredient.findByIdAndDelete({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Ingrédient supprimé !' }))
      .catch(error => res.status(400).json({ error }));
};