const blocAddIngredients = document.querySelector('.bloc-add-ingredients');
const addIngredientPage = document.querySelector('#add-ingredient-page');
const blocAddIngredientPage = document.querySelector('#bloc-add-ingredient-page');
const quitIcon = document.querySelector('#quit-icon');
const inputNameIngredient = document.querySelector('#ingredient');


// let allIngredients = [];

const getIngredients = async () => {
   await fetch('http://localhost:3000/api/ingredient')
      .then(res => res.json())
      .then(data => {
         const ingredients = data.ingredients.map(ingredient => {
            return {
               name: ingredient.name,
               image: ingredient.image,

            }
         });
         for (let i = 0; i < ingredients.length; i++) {
            // console.log(ingredients[i].image);
            let suggestionList = `<ul id="suggestions">
   <li class="ingredient-suggestion">
      <div class="img-ingredient-suggestion">
         <img
            src="${ingredients[i].image}"
            alt="${ingredients[i].name}"
         />
      </div>
      <div class="name-ingredient-suggestion">${ingredients[i].name}</div>
   </li>
</ul>`;

            document.querySelector('.add-name-ingredient').insertAdjacentHTML('beforeend', suggestionList);
         }
      })
      .catch(err => console.log(err))
};

inputNameIngredient.addEventListener('focus', () => {
   getIngredients();
})





// Ajout du bloc "Ajouter un ingrédient"

blocAddIngredients.addEventListener('click', (event) => {
   // Afficher la page d'ajout d'ingrédients
   blocAddIngredientPage.style.display = "block";
   addIngredientPage.style.display = "block";

   // Désactiver les interactions pour tous les autres éléments
   document.body.style.pointerEvents = 'none';

   // Activer les interactions pour la page d'ajout d'ingrédients
   addIngredientPage.style.pointerEvents = 'auto';
   addIngredientPage.querySelectorAll('*').forEach(child => {
      child.style.pointerEvents = 'auto';
   });

   setTimeout(() => { // Utilisation d'un délai pour déclencher la transition après le changement de display
      addIngredientPage.style.left = "0";
   }, 10);

});

// Suppression du bloc "Ajouter un ingrédient"

quitIcon.addEventListener('click', () => {

   addIngredientPage.style.left = "-40vw";
   setTimeout(() => { // Utilisation d'un délai pour déclencher la transition après le changement de display
      addIngredientPage.style.display = "none";
      blocAddIngredientPage.style.display = "none";
      document.body.style.pointerEvents = 'auto';
   }, 500);

});
