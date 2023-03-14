const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');

describe('Auth', () => {

   // Connexion à la base de données avant les tests

   beforeAll(() => {
      mongoose.connect(process.env.DB_CONNECT, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
   });

   // Déconnexion de la base de données après les tests

   afterAll(async () => {
      await mongoose.connection.close();
   });

   // Suppression de tous les utilisateurs et création d'un nouvel utilisateur avant chaque test, 

   beforeEach(async () => {
      await User.deleteMany({});
      let user = new User({
         pseudo: 'testUser',
         email: 'test@test.com',
         password: await bcrypt.hash('password', 10),
      });
      await user.save();
   });

   // Tests de la fonction d'inscription

   describe('/signup', () => {

      it('should return 201 if user is created', async () => {
         let response = await request(app)
            .post('/api/user/signup')
            .send({
               pseudo: 'newUser',
               email: 'newuser@test.com',
               password: 'passwordtest',
            })
            .expect(201);
         expect(response.body.message).toBe('Utilisateur créé !');
      });

      it('should return 400 if pseudo is missing', async () => {
         const res = await request(app)
            .post('/api/user/signup')
            .send({
               email: 'newuser@test.com',
               password: 'newpassword'
            })
            .expect(400);
         expect(res.body.message).toEqual("Veuillez remplir tous les champs obligatoires");
      });

      it('should return 400 if pseudo already exists', async () => {
         const res = await request(app)
            .post('/api/user/signup')
            .send({
               pseudo: 'testUser',
               email: 'testemail@test.com',
               password: 'existingpassword'
            })
            .expect(400);
         expect(res.body.message).toEqual("Le pseudo est déjà utilisé");
      });

      it('should return 400 if pseudo is too short', async () => {
         const res = await request(app)
            .post('/api/user/signup')
            .send({
               pseudo: 'f',
               email: 'testemail@test.com',
               password: 'existingpassword'
            })
            .expect(400);
         expect(res.body.message).toEqual("Le pseudo doit avoir au moins 3 caractères");
      });

      it('should return 400 if pseudo is too long', async () => {
         const res = await request(app)
            .post('/api/user/signup')
            .send({
               pseudo: 'sdlfkjsdlfksdkjnvckjsdlksdlfknvljnsdljnsdlvnsldjvnlsdjvnljsdnvljsdnvln',
               email: 'testemail@test.com',
               password: 'existingpassword'
            })
            .expect(400);
         expect(res.body.message).toEqual("Le pseudo ne doit pas dépasser 30 caractères");
      });


      it('should return 400 if email already exists', async () => {
         const res = await request(app)
            .post('/api/user/signup')
            .send({
               pseudo: 'existinguser',
               email: 'test@test.com',
               password: 'existingpassword'
            })
            .expect(400);
         expect(res.body.message).toEqual("L'email est déjà utilisé");
      });

      it('should return 400 if email is invalid', async () => {
         const res = await request(app)
            .post('/api/user/signup')
            .send({
               pseudo: 'existinguser',
               email: 'invalidEmail.fr',
               password: 'existingpassword'
            })
            .expect(400);
         expect(res.body.message).toEqual("Les informations saisies sont incorrectes");
      });

      it('should return 400 if email is missing', async () => {
         const res = await request(app)
            .post('/api/user/signup')
            .send({
               pseudo: 'existinguser',
               password: 'existingpassword'
            })
            .expect(400);
         expect(res.body.message).toEqual("Veuillez remplir tous les champs obligatoires");
      });


      it('should return 400 if password is missing', async () => {
         const res = await request(app)
            .post('/api/user/signup')
            .send({
               pseudo: 'existinguser',
               email: 'testemail@test.com',
            })
            .expect(400);
         expect(res.body.message).toEqual("Veuillez remplir tous les champs obligatoires");
      });

      it('should return 400 if password is too short', async () => {
         const res = await request(app)
            .post('/api/user/signup')
            .send({
               pseudo: 'testuser1',
               email: 'testemail@test.com',
               password: 'short'
            })
            .expect(400);
         expect(res.body.message).toEqual("le mot de passe doit avoir au moins 6 caractères");
      });
   });

   // Test de la fonction de connexion

   describe('/login', () => {

      it('should return 401 if user is not found', async () => {
         let response = await request(app)
            .post('/api/user/login')
            .send({
               email: 'nonexistentuser@test.com',
               password: 'password',
            })
            .expect(401);
         expect(response.body.error).toBe('Utilisateur non trouvé !');
      });

      it('should return 401 if password is incorrect', async () => {
         let response = await request(app)
            .post('/api/user/login')
            .send({
               email: 'test@test.com',
               password: 'wrongpassword',
            })
            .expect(401);
         expect(response.body.error).toBe('Mot de passe incorrect !');
      });

      it('should return 200 with user ID and token if login is successful', async () => {
         let response = await request(app)
            .post('/api/user/login')
            .send({
               email: 'test@test.com',
               password: 'password',
            })
            .expect(200);
         expect(response.body.userId).toBeDefined();
         expect(response.body.token).toBeDefined();
      });
   })
})
