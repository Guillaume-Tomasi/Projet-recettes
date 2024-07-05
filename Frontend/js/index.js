// const Uid = localStorage.getItem('userId');

// if (!Uid || Uid === null) {
//    // Affichage inscription
//    let signupLinkTxt = `<li><a href="#" id="signup-link">Inscription</a></li>`;
//    let loginLinkTxt = `<li><a href="#" id="login-link">Connexion</a></li>`;

//    document.querySelector('#menu ul').insertAdjacentHTML("beforeend", signupLinkTxt);
//    document.querySelector('#menu ul').insertAdjacentHTML("beforeend", loginLinkTxt);

//    const signupLink = document.getElementById('signup-link');
//    const loginLink = document.getElementById('login-link');
//    const emailRegExp = /[a-zA-Z0-9]+[@]{1}[a-zA-Z0-9]+[.]{1}[a-z]{2,5}/;

//    let validSignup = `<div class="validateItem"><p>Inscription réussie !</p></div>`;

//    let signupText = `<section id="modal-page"> 
//       <div class="modal-bloc">
//       <div class="title">Inscription</div>
//       <div class="form">
//       <form>
//       <div class="input-div">
//       <label for="pseudo">Pseudo:</label>
//             <input type="text" id="pseudo" name="pseudo" required />
//             <div id="pseudo-errorMsg"></div>
//             </div>

//            <div class="input-div">
//             <label for="email">Email:</label>
//             <input type="email" id="email" name="email" required />
//             <div id="email-errorMsg"></div>
//             </div>

//             <div class="input-div">
//             <label for="password">Mot de passe:</label>
//             <input type="password" id="password" name="password" required />
//             <div id="password-errorMsg"></div>
//             </div>

//             <input type="submit" value="Incription" class="signupBtn" />
//           </form>
//         </div>
//         <div id="exit-signup"><i class="fa-solid fa-arrow-left"></i></div>
//         <div id="errorMsg"></div>
//       </div>
//     </section>`;

//    let loginText = `<section id="modal-page">
//       <div class="modal-bloc">
//       <div class="title">Connexion</div>
//       <div class="form">
//       <form>

//            <div class="input-div">
//             <label for="email">Email:</label>
//             <input type="email" id="email" name="email" required />
//             <div id="email-errorMsg"></div>
//             </div>

//             <div class="input-div">
//             <label for="password">Mot de passe:</label>
//             <input type="password" id="password" name="password" required />
//             <div id="password-errorMsg"></div>
//             </div>

//             <input type="submit" value="Connexion" class="loginBtn" />
//           </form>
//         </div>
//         <div id="exit-login"><i class="fa-solid fa-arrow-left"></i></div>
//         <div id="errorMsg"></div>
//       </div>
//     </section>`;

//    const logUser = async () => {

//       const email = document.getElementById("email").value;
//       const password = document.getElementById("password").value;
//       const userData = { email, password };

//       await fetch('http://localhost:3000/api/user/login', {
//          method: 'POST',
//          headers: {
//             "Accept": "application/json",
//             'Content-Type': 'application/json'
//          },
//          body: JSON.stringify(userData),
//       })
//          .then(res => {
//             return res.json();
//          })
//          .then(data => {
//             if (data.error) document.getElementById('errorMsg').textContent = data.error;
//             else {
//                localStorage.setItem('userId', data.userId);
//                localStorage.setItem('token', data.token);
//                location.reload();
//             }
//          })
//          .catch(error => {
//             console.log(error);
//          })
//    }

//    // Fonction Inscription utilisateur

//    const signUser = async () => {

//       let pseudo = document.getElementById("pseudo").value;
//       let email = document.getElementById("email").value;
//       let password = document.getElementById("password").value;
//       const userData = { pseudo, email, password };

//       await fetch('http://localhost:3000/api/user/signup', {
//          method: 'POST',
//          headers: {
//             "Accept": "application/json",
//             'Content-Type': 'application/json'
//          },
//          body: JSON.stringify(userData)
//       })
//          .then(res => {
//             if (res.ok) {
//                document.querySelector('.form').remove();
//                document.getElementById('errorMsg').textContent = "";
//                document.querySelector('.title').insertAdjacentHTML("afterend", validSignup);
//             } else {
//                return res.json();
//             }
//          })
//          .then(data => {
//             if (data.message) {
//                document.getElementById('errorMsg').textContent = data.message;
//             }
//          })
//          .catch(error => {
//             console.log(error);
//          })
//    }

//    loginLink.addEventListener('click', () => {
//       document.querySelector('header').insertAdjacentHTML("beforebegin", loginText);

//       const exitLogin = document.getElementById('exit-login');
//       const loginBtn = document.querySelector('.loginBtn');

//       if (loginBtn) {
//          document.body.style.overflow = "hidden";

//          email.addEventListener('blur', () => {
//             if (email.value == "") {
//                document.getElementById('email-errorMsg').textContent = "Email obligatoire";
//             }
//             else if (!emailRegExp.test(email.value)) {
//                document.getElementById('email-errorMsg').textContent = "Email invalide";
//             }
//             else {
//                document.getElementById('email-errorMsg').textContent = "";
//             }
//          })

//          password.addEventListener('blur', () => {
//             if (password.value == "") {
//                document.getElementById('password-errorMsg').textContent = "Mot de passe obligatoire";
//             }
//             else {
//                document.getElementById('password-errorMsg').textContent = "";
//             }
//          })

//          loginBtn.addEventListener('click', (e) => {
//             e.preventDefault();
//             logUser();
//          });
//       }

//       exitLogin.addEventListener('click', () => {
//          document.getElementById('modal-page').remove();
//          document.body.style.overflow = "visible";
//       });
//    })

//    // Affichage / Gestion des erreurs inscription

//    if (signupLink) {
//       signupLink.addEventListener('click', () => {

//          document.querySelector('header').insertAdjacentHTML("beforebegin", signupText);

//          const exitSignup = document.getElementById('exit-signup');
//          const signupBtn = document.querySelector('.signupBtn');

//          if (signupBtn) {
//             document.body.style.overflow = "hidden";

//             pseudo.addEventListener('blur', () => {

//                if (pseudo.value == "") {
//                   document.getElementById('pseudo-errorMsg').textContent = "Pseudo obligatoire";
//                }
//                else if (!/^(?=[a-zA-Z0-9]{3,30}$)(?=(.*[a-zA-Z]){3,})[a-zA-Z0-9]*$/.test(pseudo.value)) {
//                   document.getElementById('pseudo-errorMsg').textContent = "Le pseudo doit être compris entre 3 et 30 caractères alphanumériques, et doit contenir au moins 3 lettres";
//                }
//                else {
//                   document.getElementById('pseudo-errorMsg').textContent = "";
//                }
//             })

//             email.addEventListener('blur', () => {
//                if (email.value == "") {
//                   document.getElementById('email-errorMsg').textContent = "Email obligatoire";
//                }
//                else if (!emailRegExp.test(email.value)) {
//                   document.getElementById('email-errorMsg').textContent = "Email invalide";
//                }
//                else {
//                   document.getElementById('email-errorMsg').textContent = "";
//                }
//             })

//             password.addEventListener('blur', () => {
//                if (password.value == "") {
//                   document.getElementById('password-errorMsg').textContent = "Mot de passe obligatoire";
//                }
//                else if (password.value.length < 6) {
//                   document.getElementById('password-errorMsg').textContent = "le mot de passe doit contenir au moins 6 caractères";
//                }
//                else {
//                   document.getElementById('password-errorMsg').textContent = "";
//                }
//             })

//             signupBtn.addEventListener('click', (e) => {

//                e.preventDefault();
//                signUser();
//             });
//          }

//          exitSignup.addEventListener('click', () => {

//             document.getElementById('modal-page').remove();
//             document.body.style.overflow = "visible";
//          });
//       });
//    }
// }

// else {
//    let logoutLinkTxt = `<li><a href="#" id="logout-link">Déconnexion</a></li>`;

//    document.querySelector('#menu ul').insertAdjacentHTML("beforeend", logoutLinkTxt);
//    const logoutLink = document.getElementById('logout-link');

//    const logoutUser = async () => {
//       const userId = localStorage.getItem('userId');
//       const token = localStorage.getItem('token');

//       if (!token || !userId) return;

//       await fetch(`http://localhost:3000/api/user/logout`, {
//          method: 'POST',
//          headers: {
//             "Authorization": `Bearer ${token}`
//          }
//       })
//          .then(res => {
//             if (res.ok) {

//                localStorage.removeItem('userId');
//                localStorage.removeItem('token');
//                location.reload();
//             } else {
//                throw new Error('Logout failed');
//             }
//          })
//          .catch(error => {
//             console.log(error);
//          });
//    };
//    if (logoutLink) {
//       logoutLink.addEventListener('click', () => {
//          logoutUser();
//          location.reload();
//       })
//    }



// }

{/* <a href="./recette-individuelle.html?id=${recipe._id}">
   <button>Voir</button>
</a> */}



// window.addEventListener('scroll', () => {
//    const logo = document.getElementById('logo');
//    const links = document.querySelector('nav > ul');

//    if (window.scrollY > 100) {
//       menu.classList.add('scrolled');
//    } else {
//       menu.classList.remove('scrolled');
//    }

// })

// const burgerMenu = document.querySelector('.header-burger');
// const quitIconMenu = document.querySelector('.quit-icon');
// const mobileMenu = document.querySelector('.mobile-menu');

// function toggleBurgerMenu() {
//    if (window.innerWidth > 768) {
//       burgerMenu.classList.remove('show');
//    } else if (!mobileMenu.classList.contains('open')) {
//       burgerMenu.classList.add('show');
//    }
// }

// burgerMenu.addEventListener('click', (e) => {
//    e.stopPropagation();
//    mobileMenu.classList.add('open');
//    burgerMenu.classList.remove('show');
// });

// quitIconMenu.addEventListener('click', () => {
//    mobileMenu.classList.remove('open');
//    setTimeout(() => {
//       burgerMenu.classList.add('show');
//    }, 300);
// });

// document.addEventListener('click', (e) => {
//    if (mobileMenu.classList.contains('open') && !mobileMenu.contains(e.target) && e.target !== mobileMenu && e.target !== burgerMenu) {
//       const clickEvent = new Event('click');
//       quitIconMenu.dispatchEvent(clickEvent);
//       // console.log('ITSOKER');
//    }
// });

// window.addEventListener('resize', toggleBurgerMenu);


// toggleBurgerMenu();

// Affichage stats site

const getAllIngredients = async () => {
   try {
      const response = await fetch('http://localhost:3000/api/ingredient');
      const data = await response.json();

      document.querySelector('#bloc-qty-ingredients > .bg-qty > p').textContent = data.ingredients.length;
   } catch (err) {
      console.error('Error fetching ingredients:', err);
   }
};

let cardWidth;
let cardMargin;
const getAllRecipes = async () => {
   try {
      const response = await fetch('http://localhost:3000/api/recipe');
      const data = await response.json();

      // const recipes = data.recipes.slice(-3);
      const recipes = data.recipes;

      const blocSection = document.querySelector('.bloc-section-1');

      // blocSection.innerHTML = '';

      recipes.forEach((recipe, index) => {

         let recipeCard = `<div id="card-${index}" class="bloc-card">
            <div class="bloc-recipe">
              <div id="recipe-${index}"class="card">
                <div class="card-img">
                  <img src="${recipe.image}" />
                </div>
                <div class="card-body">
                  <p>${recipe.name}</p>
                </div>
              </div>
            </div>
            
          </div>`;
         document.querySelector('.bloc-section-1').insertAdjacentHTML('afterbegin', recipeCard);
         document.getElementById(`recipe-${index}`).style.cursor = "pointer";
         document.getElementById(`recipe-${index}`).addEventListener('click', () => {
            window.location = `./recette-individuelle.html?id=${recipe._id}`;
         })

         const cards = document.querySelectorAll('.card');

         cards.forEach(card => {
            cardWidth = card.offsetWidth;
            const cardStyle = getComputedStyle(card);
            cardMargin = parseInt(cardStyle.marginLeft) + parseInt(cardStyle.marginRight);
         })

      });

      // Handle touch events for horizontal scrolling on touch devices
      let isDown = false;
      let startX;
      let scrollLeft;

      blocSection.addEventListener('touchstart', (e) => {
         isDown = true;
         startX = e.touches[0].pageX - blocSection.offsetLeft;
         scrollLeft = blocSection.scrollLeft;
      });

      blocSection.addEventListener('touchmove', (e) => {
         if (!isDown) return;
         e.preventDefault();
         const x = e.touches[0].pageX - blocSection.offsetLeft;
         const walk = (x - startX) * 2; // Adjust the multiplier as needed
         blocSection.scrollLeft = scrollLeft - walk;
      });

      blocSection.addEventListener('touchend', () => {
         isDown = false;
      });

      blocSection.addEventListener('touchcancel', () => {
         isDown = false;
      });


      document.querySelector('#bloc-qty-recipes > .bg-qty > p').textContent = data.recipes.length;

      document.getElementById('next').addEventListener('click', () => {
         blocSection.scrollBy({ left: cardWidth + cardMargin, behavior: 'smooth' });
      });

      document.getElementById('prev').addEventListener('click', () => {
         blocSection.scrollBy({ left: -(cardWidth + cardMargin), behavior: 'smooth' });
      });

   } catch (err) {
      console.error('Error fetching recipes:', err);
   }
};



const getAllUsers = async () => {
   try {
      const response = await fetch('http://localhost:3000/api/user');
      const data = await response.json();

      document.querySelector('#bloc-qty-users > .bg-qty > p').textContent = data.length;
   } catch (err) {
      console.error('Error fetching users:', err);
   }
};

getAllIngredients();
getAllRecipes();
getAllUsers();








