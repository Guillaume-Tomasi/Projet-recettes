const express = require('express');
require('dotenv').config({ path: './config/.env' });
require('./config/dbConfig');
// const path = require('path');
const cors = require('cors');

const userRoutes = require('./routes/user.routes');
const ingredientRoutes = require('./routes/ingredient.routes');
// const likeRoutes = require('./routes/like.routes');

const app = express();
app.use(express.json());

app.use(cors(
   {
      credentials: true,
      origin: true,
   }
));

// Routes
// app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', userRoutes);
app.use('/api/ingredient', ingredientRoutes);
// app.use('/api/like', likeRoutes);

module.exports = app;