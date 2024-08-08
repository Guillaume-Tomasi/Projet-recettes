const multer = require('multer');
const fs = require('fs');
const dir = './images';

// Création du dossier images si inexistant

fs.access(dir, (error) => {
   if (error) {
      fs.mkdir(dir, (error) => {
         if (error) {
            console.log(error);
         } else {
            console.log('Dossier "images" créé !');
         }
      });
   } else {
      console.log('Dossier "images" présent !');
   }
});

const MIME_TYPES = {
   'image/jpg': 'jpg',
   'image/jpeg': 'jpg',
   'image/png': 'png'
};

const storage = multer.diskStorage({
   destination: (req, file, callback) => {
      callback(null, 'images');
   },
   filename: (req, file, callback) => {
      const name = file.originalname.split('.')[0].split(' ').join('_');
      const extension = MIME_TYPES[file.mimetype];
      callback(null, name + Date.now() + '.' + extension);
   }
});

module.exports = multer({ storage: storage }).single('image');