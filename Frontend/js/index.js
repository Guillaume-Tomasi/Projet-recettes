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
      const recipes = data.recipes;
      const blocSection = document.querySelector('.bloc-section-1');

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
         const walk = (x - startX) * 2;
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

// const getAllUsers = async () => {
//    try {
//       const response = await fetch('http://localhost:3000/api/user');
//       const data = await response.json();
//       document.querySelector('#bloc-qty-users > .bg-qty > p').textContent = data.length;
//    } catch (err) {
//       console.error('Error fetching users:', err);
//    }
// };

getAllIngredients();
getAllRecipes();
// getAllUsers();