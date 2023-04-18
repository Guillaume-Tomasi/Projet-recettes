const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Inscription utilisateur

exports.signup = (req, res, next) => {

   const { pseudo, email, password } = req.body;
   if (!pseudo || !email || !password) {
      return res.status(400).json({ message: "Veuillez remplir tous les champs obligatoires" });
   }

   if (pseudo.length < 3) {
      return res.status(400).json({ message: "Le pseudo doit avoir au moins 3 caractères" });
   }

   if (pseudo.length > 30) {
      return res.status(400).json({ message: "Le pseudo ne doit pas dépasser 30 caractères" });
   }

   if (password.length < 6) {
      return res.status(400).json({ message: "le mot de passe doit contenir au moins 6 caractères" })
   }

   User.findOne({ email })
      .then(user => {
         if (user) {
            return res.status(400).json({ message: "L'email est déjà utilisé" });
         }
         User.findOne({ pseudo })
            .then(user => {
               if (user) {
                  return res.status(400).json({ message: "Le pseudo est déjà utilisé" });
               }
               bcrypt.hash(password, 10)
                  .then(hash => {
                     const user = new User({
                        pseudo,
                        email,
                        password: hash
                     });
                     user.save()
                        .then(() => res.status(201).json({ message: 'Inscription réussie !' }))
                        .catch(error => res.status(400).json({ message: "Les informations saisies sont incorrectes" }));
                  })
                  .catch(error => res.status(500).json({ error: "Erreur interne du serveur" }));
            })
            .catch(error => res.status(500).json({ error: "Erreur interne du serveur" }));
      })
      .catch(error => res.status(500).json({ error: "Erreur interne du serveur" }));
};

// Connexion utilisateur

exports.login = (req, res, next) => {
   User.findOne({ email: req.body.email })
      .then(user => {
         if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
         }
         bcrypt.compare(req.body.password, user.password)
            .then(valid => {
               if (!valid) {
                  return res.status(401).json({ error: 'Mot de passe incorrect !' });
               }
               const token = jwt.sign(
                  { userId: user._id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '72h' }
               );
               res.status(200).json({
                  userId: user._id,
                  token: token
               });
            })
            .catch(error => res.status(500).json({ error }))
      })
      .catch(error => res.status(500).json({ error }));
};

exports.logout = (req, res, next) => {
   res.status(200).json({ message: "Déconnexion réussie !" });
};