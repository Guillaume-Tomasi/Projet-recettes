const User = require('../models/User');

// Récupération d'un utilisateur

exports.getUser = (req, res, next) => {
   User.findOne({ _id: req.params.id }).select('-password')
      .then(user => {
         if (!user) {
            return res.status(404).json({ message: "Cet utilisateur n'existe pas" })
         }
         return res.status(200).json(user);
      })
   // .catch(error => res.status(500).json({ error }));
}

// Récupération de tous les utilisateurs 

exports.getAllUsers = (req, res, next) => {
   User.find().select('-password')
      .then(users => {
         if (!users.length) {
            return res.status(404).json({ message: "Aucun utilisateur dans la base de données" })
         }
         return res.status(200).json(users);
      })

      .catch(error => res.status(500).json({ error }));
}

