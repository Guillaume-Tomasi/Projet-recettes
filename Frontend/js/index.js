// Affichage inscription

const signupLink = document.getElementById('signup-link');
const loginLink = document.getElementById('login-link');
const emailRegExp = /[a-zA-Z0-9]+[@]{1}[a-zA-Z0-9]+[.]{1}[a-z]{2,5}/;




let validSignup = `<div class="validate-signup"><p>Inscription réussie !</p></div>`;

let signupText = `<section id="auth">
      <div class="auth-bloc">
      <div class="title">Inscription</div>
      <div class="form">
      <form>
      <div class="input-div">
      <label for="pseudo">Pseudo:</label>
            <input type="text" id="pseudo" name="pseudo" required />
            <div id="pseudo-errorMsg"></div>
            </div>

           <div class="input-div">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <div id="email-errorMsg"></div>
            </div>

            <div class="input-div">
            <label for="password">Mot de passe:</label>
            <input type="password" id="password" name="password" required />
            <div id="password-errorMsg"></div>
            </div>

            <input type="submit" value="Incription" class="signupBtn" />
          </form>
        </div>
        <div id="exit-signup"><i class="fa-solid fa-arrow-left"></i></div>
        <div id="errorMsg"></div>
      </div>
    </section>`;





let loginText = `<section id="auth">
      <div class="auth-bloc">
      <div class="title">Connexion</div>
      <div class="form">
      <form>

           <div class="input-div">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <div id="email-errorMsg"></div>
            </div>

            <div class="input-div">
            <label for="password">Mot de passe:</label>
            <input type="password" id="password" name="password" required />
            <div id="password-errorMsg"></div>
            </div>

            <input type="submit" value="Connexion" class="loginBtn" />
          </form>
        </div>
        <div id="exit-login"><i class="fa-solid fa-arrow-left"></i></div>
        <div id="errorMsg"></div>
      </div>
    </section>`;




const logUser = async () => {
   // Récupérer les valeurs des champs de formulaire
   const email = document.getElementById("email").value;
   const password = document.getElementById("password").value;

   // Créer un objet contenant les données de l'utilisateur
   const userData = { email, password };

   // Envoyer les données via une requête POST à l'API backend
   await fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      headers: {
         "Accept": "application/json",
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
   })
      .then(res => {
         return res.json();

      })
      .then(data => {
         if (data.error) document.getElementById('errorMsg').textContent = data.error;
         else {
            localStorage.setItem('id', data.userId);
            localStorage.setItem('token', data.token);
            location.reload();
         }
      })
      .catch(error => {
         console.log(error);
      })
}

// Fonction Inscription utilisateur

const signUser = async () => {
   // Récupérer les valeurs des champs de formulaire
   let pseudo = document.getElementById("pseudo").value;
   let email = document.getElementById("email").value;
   let password = document.getElementById("password").value;

   // Créer un objet contenant les données de l'utilisateur
   const userData = { pseudo, email, password };

   // Envoyer les données via une requête POST à l'API backend
   await fetch('http://localhost:3000/api/user/signup', {
      method: 'POST',
      headers: {
         "Accept": "application/json",
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
   })
      .then(res => {
         if (res.ok) {
            // document.getElementById('auth').remove();
            document.querySelector('.form').remove();
            document.getElementById('errorMsg').textContent = "";
            document.querySelector('.title').insertAdjacentHTML("afterend", validSignup);
            // document.querySelector('header').insertAdjacentHTML("beforebegin", validSignup);
         } else {
            return res.json();
         }
      })
      .then(data => {
         if (data.message)
            document.getElementById('errorMsg').textContent = data.message;

      })
      .catch(error => {
         console.log(error);
      })
}




loginLink.addEventListener('click', () => {
   document.querySelector('header').insertAdjacentHTML("beforebegin", loginText);
   // document.querySelector('body').style.overflow = "hidden";

   const exitLogin = document.getElementById('exit-login');
   const loginBtn = document.querySelector('.loginBtn');

   if (loginBtn) {
      document.body.style.overflow = "hidden";

      email.addEventListener('blur', () => {
         if (email.value == "") document.getElementById('email-errorMsg').textContent = "Email obligatoire";

         else if (!emailRegExp.test(email.value)) document.getElementById('email-errorMsg').textContent = "Email invalide";

         else document.getElementById('email-errorMsg').textContent = "";
      })

      password.addEventListener('blur', () => {
         if (password.value == "") document.getElementById('password-errorMsg').textContent = "Mot de passe obligatoire";

         else document.getElementById('password-errorMsg').textContent = "";

      })



      loginBtn.addEventListener('click', (e) => {
         e.preventDefault();
         logUser();
      });
   }

   exitLogin.addEventListener('click', () => {
      document.getElementById('auth').remove();
      document.body.style.overflow = "visible";
   });
})




// Affichage / Gestion des erreurs inscription

if (signupLink) {
   signupLink.addEventListener('click', () => {
      // document.querySelector('#auth').remove();
      document.querySelector('header').insertAdjacentHTML("beforebegin", signupText);

      const exitSignup = document.getElementById('exit-signup');
      const signupBtn = document.querySelector('.signupBtn');

      if (signupBtn) {
         document.body.style.overflow = "hidden";

         pseudo.addEventListener('blur', () => {

            if (pseudo.value == "") document.getElementById('pseudo-errorMsg').textContent = "Pseudo obligatoire";

            else if (!/^(?=[a-zA-Z0-9]{3,30}$)(?=(.*[a-zA-Z]){3,})[a-zA-Z0-9]*$/.test(pseudo.value)) document.getElementById('pseudo-errorMsg').textContent = "Le pseudo doit être compris entre 3 et 30 caractères alphanumériques, et doit contenir au moins 3 lettres";

            else document.getElementById('pseudo-errorMsg').textContent = "";
         })

         email.addEventListener('blur', () => {
            if (email.value == "") document.getElementById('email-errorMsg').textContent = "Email obligatoire";

            else if (!emailRegExp.test(email.value)) document.getElementById('email-errorMsg').textContent = "Email invalide";

            else document.getElementById('email-errorMsg').textContent = "";
         })

         password.addEventListener('blur', () => {
            if (password.value == "") document.getElementById('password-errorMsg').textContent = "Mot de passe obligatoire";

            else if (password.value.length < 6) document.getElementById('password-errorMsg').textContent = "le mot de passe doit contenir au moins 6 caractères";

            else document.getElementById('password-errorMsg').textContent = "";

         })


         signupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            signUser();
         });
      }

      exitSignup.addEventListener('click', () => {
         document.getElementById('auth').remove();
         document.body.style.overflow = "visible";

      });
   });
}














