const mongoose = require("mongoose");


mongoose.set('strictQuery', false);

mongoose.connect(process.env.DB_CONNECT,
   {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log('Connexion à MongoDB réussie !'))
   .catch((err) => console.log('Connexion à MongoDB échouée !' + err));
;
