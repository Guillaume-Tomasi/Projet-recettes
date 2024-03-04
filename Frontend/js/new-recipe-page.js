const blocAddIngredients = document.querySelector('.bloc-add-ingredients');
const blocAddIngredientPage = document.querySelector('#bloc-add-ingredient-page');
const addIngredientPage = document.querySelector('#add-ingredient-page');
const quitIcon = document.querySelector('.quit-icon');
const inputNameIngredient = document.querySelector('#ingredient');
const suggestionsContainer = document.querySelector('#suggestions');
const qtyInput = document.querySelector('#qty');
const unitySelect = document.querySelector('#unity');
const addIngredientBtn = document.querySelector('.add-new-ingredient');
const form = document.querySelector('.bloc-new-ingredient');
const submitNewIngredients = document.getElementById('submit-new-ingredients');
const blocIngredients = document.getElementById('bloc-added-ingredients');


let allIngredients = [];
let addedIngredients = [];
let ingredientsCount = `Ingrédients (${addedIngredients.length})`;



// Ingrédients

const updateIngredientsCount = () => {
   const blocIngredientsText = document.querySelector('#bloc-ingredients > p');
   blocIngredientsText.innerHTML = '';
   blocIngredientsText.innerHTML = ingredientsCount;
   // blocIngredientsText.insertAdjacentHTML('afterbegin', ingredientsCount);

}

updateIngredientsCount();

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


function isValidInput(input) {
   const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
   if (specialCharsRegex.test(input)) {
      return false;
   }
   return true;
};


const updateIngredients = () => {
   document.querySelectorAll('.bloc-new-ingredient-added').forEach(bloc => {
      bloc.remove();
   })
   addedIngredients.forEach((ingredient, index) => {
      let ingredientAddedText = `<div class="bloc-new-ingredient-added" id="ingredient-${index}">
            <div class="add-name-ingredient">
              <label for="ingredient-added-${index}">Ingrédient</label>
               <input
                type="text"
                name="ingredient"
                id="ingredient-added-${index}"
                class="ingredient-added"
                value="${ingredient.name}"
                disabled
              />
            </div>
            <div class="add-qty-ingredient">
              <label for="qty-added-${index}">Quantité</label>
              <input
                type="number"
                name="quantity"
                id="qty-added-${index}"
                class="qty-added"
                inputmode="decimal"
                min="0.1"
                step="1"
                max="1000"
                value="${ingredient.quantity}"
              />
            </div>
            <div class="add-unity-ingredient">
              <label for="unity-added-${index}">Unité</label>
              <select name="unity" id="unity-added-${index}" class="unity-added">
               <option value="" ${ingredient.unit === '' ? 'selected' : ''}>Choisir</option>
       <option value="g" ${ingredient.unit === 'g' ? 'selected' : ''}>g</option>
       <option value="mg" ${ingredient.unit === 'mg' ? 'selected' : ''}>mg</option>
       <option value="kg" ${ingredient.unit === 'kg' ? 'selected' : ''}>kg</option>
       <option value="cl" ${ingredient.unit === 'cl' ? 'selected' : ''}>cl</option>
       <option value="ml" ${ingredient.unit === 'ml' ? 'selected' : ''}>ml</option>
       <option value="L" ${unitySelect.value === 'L' ? 'selected' : ''}>L</option>
       <option value="Cuillère à café" ${ingredient.unit === 'Cuillère à café' ? 'selected' : ''}>Cuillère à café</option>
       <option value="Cuillère à soupe" ${ingredient.unit === 'Cuillère à soupe' ? 'selected' : ''}>Cuillère à soupe</option>
       <option value="Pincée" ${ingredient.unit === 'Pincée' ? 'selected' : ''}>Pincée</option>
              </select>
            </div>
            <div class="delete-new-ingredient" id="delete-new-ingredient-${index}">
              <div class="delete-new-ingredient-icon">
                <svg
                  class="delete-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512">
                  <path
                    d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                  />
                </svg>
              </div>
              <span>Supprimer</span>
            </div>
          </div>`;
      form.insertAdjacentHTML('beforebegin', ingredientAddedText);
   });
   document.querySelectorAll('.delete-new-ingredient').forEach(button => {
      button.removeEventListener('click', deleteNewIngredient);
      button.addEventListener('click', deleteNewIngredient);
   });
}


const deleteNewIngredient = (event) => {
   const button = event.target.closest('.delete-new-ingredient');
   const index = parseInt(button.id.split('-')[3]);
   addedIngredients.splice(index, 1);
   updateIngredients();
}

const updateBlocIngredients = () => {
   blocIngredients.innerHTML = '';
   let ingredientImg = null;

   addedIngredients.forEach((ingredient, index) => {
      for (let i of allIngredients) {
         if (i.name === ingredient.name) {
            ingredientImg = i.image;
         }
      }

      let addIngredientInBlocText = `<div class="bloc-selected-ingredients" id="bloc-selected-ingredients-${index}">
              <div class="img-ingredient">
                <img
                  src="${ingredientImg}"
                  alt="${ingredient.name}"
                />
              </div>
              <div class="ingredient-detail">
                <div class="ingredient-name">${ingredient.name}</div>
                <div class="ingredient-quantity">${ingredient.quantity}${ingredient.unit}</div>
              </div>
              <div class="delete-ingredient" id="delete-ingredient-${index}">
                <svg
                  class="delete-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                  />
                </svg>
              </div>
            </div>
            <div class="border-bottom-ingredient" id="border-bottom-${index}"></div>`
      blocIngredients.insertAdjacentHTML('beforeend', addIngredientInBlocText);

      if (index === addedIngredients.length - 1) {
         document.getElementById(`border-bottom-${index}`).remove();
      };
      ingredientsCount = `Ingrédients (${addedIngredients.length})`;
      updateIngredientsCount();

   });
   document.querySelectorAll('.delete-ingredient').forEach(button => {
      button.removeEventListener('click', deleteIngredient);
      button.addEventListener('click', deleteIngredient);
   });
}

const deleteIngredient = (event) => {
   const button = event.target.closest('.delete-ingredient');
   const index = parseInt(button.id.split('-')[2]);
   addedIngredients.splice(index, 1);
   updateBlocIngredients();
   ingredientsCount = `Ingrédients (${addedIngredients.length})`;
   updateIngredientsCount();
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

suggestionsContainer.addEventListener('click', (event) => {
   const clickedSuggestion = event.target.closest('.ingredient-suggestion');
   if (clickedSuggestion) {
      const suggestionText = clickedSuggestion.querySelector('.name-ingredient-suggestion').textContent;
      inputNameIngredient.value = suggestionText;
      suggestionsContainer.style.display = "none";
   }
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

   // Suppression du bloc "Ajouter un ingrédient"
   quitIcon.addEventListener('click', () => {

      addIngredientPage.style.left = "-40vw";
      setTimeout(() => { // Utilisation d'un délai pour déclencher la transition après le changement de display
         addIngredientPage.style.display = "none";
         blocAddIngredientPage.style.display = "none";
         document.body.style.pointerEvents = 'auto';
      }, 500);
   });

   // Ajout ingredient
   addIngredientBtn.addEventListener('click', (e) => {
      e.preventDefault();
      let errorMessage = {};

      // Vérifier si le champ d'ingrédient est vide ou si l'ingrédient n'est pas dans la liste
      if (inputNameIngredient.value === '' || (inputNameIngredient.value !== '' && !allIngredients.some(ingredient => ingredient.name.toLowerCase() === inputNameIngredient.value.toLowerCase()))) {
         errorMessage.name = "Veuillez entrer un ingrédient valide.";
         // inputNameIngredient.style.border = '1px solid rgba(188, 71, 73, 1)';
      }

      // Vérifier si l'ingrédient est déjà ajouté
      if (addedIngredients.some(ingredient => ingredient.name.toLowerCase() === inputNameIngredient.value.toLowerCase())) {
         errorMessage.name = "Ingrédient déjà ajouté.";
      }

      // Vérifier si le champ de quantité est vide
      if (qtyInput.value.trim() === '') {
         errorMessage.qty = "Veuillez entrer une quantité.";
      } else {
         // Vérifier si la quantité est dans une plage valide (supérieure à zéro, par exemple)
         const quantity = parseFloat(qtyInput.value);
         if (quantity <= 0) {
            errorMessage.qty = "La quantité doit être supérieure à zéro.";
         }
      }

      // Vérifier si le champ d'unité n'est pas sélectionné
      if (unitySelect.value === '') {
         errorMessage.unity = "Veuillez sélectionner une unité.";
      }

      // Validation de sécurité pour le champ d'ingrédient
      if (!isValidInput(inputNameIngredient.value)) {
         errorMessage.ingredientSecurity = "Ingrédient invalide.";
      }

      // Supprimer les messages d'erreur précédents
      const errorElements = document.querySelectorAll('.error-message');
      errorElements.forEach(element => {
         element.remove();
      });

      // Afficher les messages d'erreur s'il y en a
      if (Object.keys(errorMessage).length !== 0) {
         Object.keys(errorMessage).forEach(key => {
            const errorElement = document.createElement('span');
            errorElement.classList.add('error-message');
            errorElement.textContent = errorMessage[key];
            const correspondingDiv = document.querySelector(`.bloc-new-ingredient > .add-${key}-ingredient`);
            correspondingDiv.appendChild(errorElement);
         });
      } else {

         const newIngredient = {
            name: inputNameIngredient.value.trim(),
            quantity: parseFloat(qtyInput.value),
            unit: unitySelect.value
         };

         addedIngredients.push(newIngredient);

         inputNameIngredient.value = '';
         qtyInput.value = '';
         unitySelect.value = '';
         suggestionsContainer.style.display = "none";
         errorMessage = {};

         updateIngredients();
      }
   });
   updateIngredients();
});


submitNewIngredients.addEventListener('click', () => {
   const errorMsgSubmitIngredient = document.getElementById('error-message-submit-ingredient');
   if (addedIngredients.length < 2) {
      let errorMessage = '<span id="error-message-submit-ingredient">Veuillez ajouter au moins 2 ingrédients.</span>';
      if (errorMsgSubmitIngredient) {
         errorMsgSubmitIngredient.remove();
      }
      submitNewIngredients.insertAdjacentHTML('afterend', errorMessage);
   }
   else {
      if (errorMsgSubmitIngredient) {
         errorMsgSubmitIngredient.remove();
      }
      updateBlocIngredients();

      addIngredientPage.style.left = "-40vw";
      setTimeout(() => {
         addIngredientPage.style.display = "none";
         blocAddIngredientPage.style.display = "none";
         document.body.style.pointerEvents = 'auto';
      }, 500);

   }
})









// Etapes

const blocAddSteps = document.querySelector('.bloc-add-steps');
const blocAddStepPage = document.querySelector('#bloc-add-step-page');
const addStepPage = document.querySelector('#add-step-page');

// Fonction pour fermer la page d'ajout d'étapes
const closeAddStepPage = () => {
   addStepPage.style.left = "-40vw";
   setTimeout(() => { // Utilisation d'un délai pour déclencher la transition après le changement de display
      addStepPage.style.display = "none";
      blocAddStepPage.style.display = "none";
      document.body.style.pointerEvents = 'auto';
   }, 500);
};

blocAddSteps.addEventListener('click', () => {
   // Afficher la page d'ajout d'étapes
   blocAddStepPage.style.display = "block";
   addStepPage.style.display = "block";

   // Désactiver les interactions pour tous les autres éléments
   document.body.style.pointerEvents = 'none';

   // Activer les interactions pour la page d'ajout d'étapes
   addStepPage.style.pointerEvents = 'auto';
   addStepPage.querySelectorAll('*').forEach(child => {
      child.style.pointerEvents = 'auto';
   });

   setTimeout(() => {
      addStepPage.style.left = "0";
   }, 10);

   document.querySelector('#add-step-header .quit-icon').addEventListener('click', closeAddStepPage);
})