const blocAddIngredients = document.querySelector('.bloc-add-ingredients');
const addIngredientPage = document.querySelector('#add-ingredient-page');
const blocAddIngredientPage = document.querySelector('#bloc-add-ingredient-page');
const quitIcon = document.querySelector('#quit-icon');
const inputNameIngredient = document.querySelector('#ingredient');
const suggestionsContainer = document.querySelector('#suggestions');


let allIngredients = [];

const getIngredients = async () => {
   await fetch('http://localhost:3000/api/ingredient')
      .then(res => res.json())
      .then(data => {
         allIngredients = data.ingredients;
      })
      .catch(err => console.log(err))
};

const filterAndDisplaySuggestions = (searchText) => {

   suggestionsContainer.innerHTML = '';

   const filteredIngredients = allIngredients.filter(ingredient =>
      ingredient.name.toLowerCase().startsWith(searchText.toLowerCase())
   );

   filteredIngredients.forEach(ingredient => {
      let suggestionItem = `<li class="ingredient-suggestion">
               <div class="img-ingredient-suggestion">
                  <img
                     src="${ingredient.image}"
                     alt="${ingredient.name}"
                  />
               </div>
               <div class="name-ingredient-suggestion">${ingredient.name}</div>
            </li>`;

      suggestionsContainer.insertAdjacentHTML('beforeend', suggestionItem);
   });
}

inputNameIngredient.addEventListener('input', async () => {
   const searchText = inputNameIngredient.value.trim();

   if (allIngredients.length === 0) {
      await getIngredients();
   }

   filterAndDisplaySuggestions(searchText);

   if (searchText === '' || searchText !== '' && suggestionsContainer.children.length === 0) {

      suggestionsContainer.style.display = "none";
      return
   }

   suggestionsContainer.style.display = "flex";

});








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
