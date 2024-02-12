const blocAddIngredients = document.querySelector('.bloc-add-ingredients');
const addIngredientPage = document.querySelector('#add-ingredient-page');
const blocAddIngredientPage = document.querySelector('#bloc-add-ingredient-page');
const quitIcon = document.querySelector('#quit-icon');



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
      // window.getComputedStyle(addIngredientPage).opacity;
   }, 10);

});

quitIcon.addEventListener('click', () => {

   addIngredientPage.style.left = "-40vw";
   setTimeout(() => { // Utilisation d'un délai pour déclencher la transition après le changement de display
      addIngredientPage.style.display = "none";
      blocAddIngredientPage.style.display = "none";
      document.body.style.pointerEvents = 'auto';
   }, 500);

});
