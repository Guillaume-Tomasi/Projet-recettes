
const blocAddIngredients = document.querySelector('.bloc-add-ingredients');
const blocAddIngredientPage = document.querySelector('#bloc-add-ingredient-page');
const addIngredientPage = document.querySelector('#add-ingredient-page');
const quitIcon = document.querySelector('.quit-icon-img');
const inputNameIngredient = document.querySelector('#ingredient');
const suggestionsContainer = document.querySelector('#suggestions');
const qtyInput = document.querySelector('#qty');
const unitySelect = document.querySelector('#unity');
const addIngredientBtn = document.querySelector('.add-new-ingredient');
const form = document.querySelector('.bloc-new-ingredient');
const submitNewIngredients = document.getElementById('submit-new-ingredients');
const blocIngredients = document.getElementById('bloc-added-ingredients');
const stepsList = document.getElementById('steps-list');

let allIngredients = [];
let addedIngredients = [];
let ingredientsCount = `Ingrédients (${addedIngredients.length})`;

const updateIngredientsCount = () => {
   const blocIngredientsText = document.querySelector('#bloc-ingredients > p');
   blocIngredientsText.innerHTML = '';
   blocIngredientsText.innerHTML = ingredientsCount;
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
   const filteredIngredients = allIngredients.filter(ingredient => ingredient.name.toLowerCase().startsWith(searchText.toLowerCase()));

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
            <input type="text" name="ingredient" id="ingredient-added-${index}" class="ingredient-added" value="${ingredient.name}" disabled />
         </div>
         <div class="add-qty-ingredient">
            <label for="qty-added-${index}">Quantité</label>
            <input type="number" name="quantity" id="qty-added-${index}" class="qty-added" inputmode="decimal" min="0.1" step="1" max="1000" value="${ingredient.quantity}" disabled />
         </div>
         <div class="add-unity-ingredient">
            <label for="unity-added-${index}">Unité</label>
            <select name="unity" id="unity-added-${index}" class="unity-added" disabled>
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
               <svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
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
            <img src="${ingredientImg}" alt="${ingredient.name}"/>
         </div>
         <div class="ingredient-detail">
            <div class="ingredient-name">${ingredient.name}</div>
            <div class="ingredient-quantity">${ingredient.quantity}${ingredient.unit}</div>
         </div>
         <div class="delete-ingredient" id="delete-ingredient-${index}">
            <svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
               <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
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

blocAddIngredients.addEventListener('click', (event) => {
   blocAddIngredientPage.style.display = "block";
   addIngredientPage.style.display = "block";
   document.body.style.pointerEvents = 'none';
   addIngredientPage.style.pointerEvents = 'auto';

   addIngredientPage.querySelectorAll('*').forEach(child => {
      child.style.pointerEvents = 'auto';
   });

   setTimeout(() => {
      addIngredientPage.style.left = "0";
   }, 10);

   quitIcon.addEventListener('click', () => {
      addIngredientPage.style.left = "-40vw";

      setTimeout(() => {
         addIngredientPage.style.display = "none";
         blocAddIngredientPage.style.display = "none";
         document.body.style.pointerEvents = 'auto';
      }, 500);
   });

   addIngredientBtn.addEventListener('click', (e) => {
      e.preventDefault();
      let errorMessage = {};

      if (inputNameIngredient.value === '' || (inputNameIngredient.value !== '' && !allIngredients.some(ingredient => ingredient.name.toLowerCase() === inputNameIngredient.value.toLowerCase()))) {
         errorMessage.name = "Veuillez entrer un ingrédient valide.";
      }

      if (addedIngredients.some(ingredient => ingredient.name.toLowerCase() === inputNameIngredient.value.toLowerCase())) {
         errorMessage.name = "Ingrédient déjà ajouté.";
      }

      if (qtyInput.value.trim() === '') {
         errorMessage.qty = "Veuillez entrer une quantité.";
      } else {
         const quantity = parseFloat(qtyInput.value);
         if (quantity <= 0) {
            errorMessage.qty = "La quantité doit être supérieure à zéro.";
         }
      }

      if (unitySelect.value === '') {
         errorMessage.unity = "Veuillez sélectionner une unité.";
      }

      if (!isValidInput(inputNameIngredient.value)) {
         errorMessage.ingredientSecurity = "Ingrédient invalide.";
      }

      const errorElements = document.querySelectorAll('.error-message');
      errorElements.forEach(element => {
         element.remove();
      });

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
      updateIngredients();
      updateBlocIngredients();
      addIngredientPage.style.left = "-40vw";

      setTimeout(() => {
         addIngredientPage.style.display = "none";
         blocAddIngredientPage.style.display = "none";
         document.body.style.pointerEvents = 'auto';
      }, 500);
   }
})

const blocAddSteps = document.querySelector('.bloc-add-steps');
const blocAddStepPage = document.querySelector('#bloc-add-step-page');
const addStepPage = document.querySelector('#add-step-page');
const submitNewStepBtn = document.getElementById('submit-new-step');
const blocSteps = document.getElementById('bloc-added-steps');
const submitStepsBtn = document.getElementById('submit-new-step-btn');

let addedStep = [];
let stepCount = `Etapes (${addedStep.length})`;
let blocNewStepText = `<div class="bloc-new-step" id="bloc-new-step">
   <div class="add-description">
      <h3 class="title-step" id="title-step-description">Description de l'étape 1</h3>
      <span class="characters-count">0/400</span>
      <textarea name="description" id="description-0" class="description" cols="30" rows="6" maxlength="400" placeholder="Préchauffer le four..."></textarea>
   </div>
   <div class="select-ingredients">
      <h3 class="title-step" id="title-step-ingredients">Ingrédients pour l'étape 1</h3>
      <div id="ingredients-step-0" class="ingredients-step"></div>
   </div>
   <button type="button" class="add-new-step">
      <div class="add-new-step-icon">
         <svg class="add-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
         </svg>
      </div>
      <span>Ajouter</span>
   </button>
</div>`;

const deleteStep = (event) => {
   event.preventDefault();
   const button = event.target.closest('.delete-new-step');
   const index = parseInt(button.id.split('-')[3]);
   addedStep.splice(index, 1);
   updateSteps();
   numberOfSteps();
   updateIngredientsForSteps();
   stepCount = `Etapes (${addedStep.length})`;
   updateStepsCount();
}

const updateStepsCount = () => {
   const blocStepText = document.querySelector('#bloc-steps > p');
   blocStepText.innerHTML = '';
   blocStepText.innerHTML = stepCount;
}

updateStepsCount();

const numberOfSteps = () => {
   document.getElementById('title-step-description').innerHTML = `Description de l'étape ${addedStep.length + 1}`;
   document.getElementById('title-step-ingredients').innerHTML = `Ingrédients pour l'étape ${addedStep.length + 1}`;
   document.querySelector(`#bloc-new-step .description`).value = '';
   document.querySelector('#bloc-new-step .characters-count').textContent = '0/400'; blocSteps;
}

const updateCharacterCount = (id) => {
   const descriptionTextarea = document.getElementById(`description-step-${id}`);
   if (descriptionTextarea) {
      const charactersCountSpan = descriptionTextarea.parentElement.querySelector('.characters-count');
      const currentCount = descriptionTextarea.value.length;
      charactersCountSpan.textContent = `${currentCount}/400`;
   }
};

const updateIngredientsForSteps = () => {
   const ingredientSteps = document.querySelectorAll('.ingredients-step');
   const ingredientAddStep = document.querySelector('#bloc-new-step .ingredients-step');
   const textAreaAddStep = document.querySelector('#bloc-new-step .description');

   ingredientSteps.forEach(ingredientStep => {
      ingredientStep.innerHTML = '';
   })

   let ingredientImg = null;

   addedIngredients.forEach((ingredient) => {
      for (let i of allIngredients) {
         if (i.name === ingredient.name) {
            ingredientImg = i.image;
         }
      }

      let ingredientsForSteps = `<div class="select-ingredient-step">
         <label for="${ingredient.name}-${addedStep.length}">
            <input type="checkbox" name="${ingredient.name}" id="${ingredient.name}-${addedStep.length}" />
            <span class="custom-checkbox"></span>
            <div class="custom-checkbox-checked">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
               </svg>
            </div>
            <div class="img-ingredient-step">
               <img src="${ingredientImg}" alt="${ingredient.name}"/>
            </div>
            ${ingredient.name}
         </label>
      </div>`;
      ingredientAddStep.insertAdjacentHTML('beforeend', ingredientsForSteps);

      addedStep.forEach((step, index) => {
         const ingredientStepAdded = document.getElementById(`ingredients-step-${index}`);

         let ingredientsForSteps = `<div class="select-ingredient-step">
            <label for="${ingredient.name}-${index}">
               <input type="checkbox" name="${ingredient.name}" id="${ingredient.name}-${index}" ${step.ingredients.includes(ingredient.name) ? 'checked' : ''} disabled/>
               <span class="custom-checkbox"></span>
               <div class="custom-checkbox-checked">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" >
                     <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                  </svg>
               </div>
               <div class="img-ingredient-step">
                  <img src="${ingredientImg}" alt="${ingredient.name}"/>
               </div>
               ${ingredient.name}
            </label>
         </div>`;
         ingredientStepAdded.insertAdjacentHTML('beforeend', ingredientsForSteps);
      })
   });

   ingredientAddStep.id = `ingredients-step-${addedStep.length}`;
   textAreaAddStep.id = `description-step-${addedStep.length}`;
   textAreaAddStep.addEventListener('input', () => updateCharacterCount(addedStep.length));
   addedStep.forEach((step, index) => {
      let textAreaAddedStep = document.getElementById(`description-step-${index}`)
      if (textAreaAddedStep) {
         textAreaAddedStep.addEventListener('input', () => updateCharacterCount(index));
      }
   })
}

const updateSteps = () => {
   document.querySelectorAll('.bloc-added-step').forEach(bloc => {
      bloc.remove();
   });

   addedStep.forEach((step, index) => {
      let blocStepText = `<div class="bloc-new-step bloc-added-step" id="bloc-new-step-${index}">
         <div class="add-description">
            <h3 class="title-step">Description de l'étape ${index + 1}</h3>
            <span class="characters-count">${step.description.length}/400</span>
            <textarea name="description-step-${index}" id="description-step-${index}" class="description" cols="30" rows="6" maxlength="400" placeholder="Préchauffer le four..." disabled>${step.description}</textarea>
         </div>
         <div class="select-ingredients">
            <h3 class="title-step">Ingrédients pour l'étape ${index + 1}</h3>
            <div id="ingredients-step-${index}" class="ingredients-step"></div>
         </div>
         <button type="button" id="delete-new-step-${index}" class="delete-new-step">
            <div class="delete-new-step-icon">
               <svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
            </div>
            <span>Supprimer</span>
         </button>
      </div>`
      document.getElementById('bloc-new-step').insertAdjacentHTML('beforebegin', blocStepText);

      document.querySelectorAll('.delete-new-step').forEach(button => {
         button.removeEventListener('click', deleteStep);
         button.addEventListener('click', deleteStep);
      });
   });
}

const updateBlocSteps = () => {
   blocSteps.innerHTML = '';
   addedStep.forEach((step, index) => {
      let selectedStepText = `<div class="bloc-selected-steps" id="bloc-selected-steps-${index}">
         <div class="step-detail">
            <div class="step-index">Étape ${index + 1}</div>
            <div class="step-description">${step.description}</div>
         </div>
      </div>`;
      blocSteps.insertAdjacentHTML('beforeend', selectedStepText);
      stepCount = `Etapes (${addedStep.length})`;
      updateStepsCount();
   })
}

const closeAddStepPage = () => {
   const blocNewStep = document.getElementById('bloc-new-step');
   addStepPage.style.left = "-40vw";
   setTimeout(() => {
      addStepPage.style.display = "none";
      blocAddStepPage.style.display = "none";
      document.body.style.pointerEvents = 'auto';
      blocNewStep.remove();
   }, 500);
};

blocAddSteps.addEventListener('click', () => {
   blocAddStepPage.style.display = "block";
   addStepPage.style.display = "block";
   document.body.style.pointerEvents = 'none';
   addStepPage.style.pointerEvents = 'auto';
   addStepPage.querySelectorAll('*').forEach(child => {
      child.style.pointerEvents = 'auto';
   });

   setTimeout(() => {
      addStepPage.style.left = "0";
   }, 10);

   document.querySelector('#add-step-header .quit-icon').addEventListener('click', closeAddStepPage);
   stepsList.insertAdjacentHTML('beforeend', blocNewStepText);

   updateSteps();
   numberOfSteps();
   updateIngredientsForSteps();

   const addNewStepBtn = document.querySelector('.add-new-step');
   const descriptionStep = document.querySelector(`#bloc-new-step .description`);

   addNewStepBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('.step-err-message').innerHTML = '';
      const newStep = {
         description: descriptionStep.value.trim(),
         ingredients: []
      };
      document.querySelectorAll(`#bloc-new-step input[type="checkbox"]:checked`).forEach(checkbox => {
         newStep.ingredients.push(checkbox.name);
      });

      if (descriptionStep.value && descriptionStep.value.length >= 10) {
         addedStep.push(newStep);
         updateSteps();
         updateIngredientsForSteps();
         numberOfSteps();
      } else {
         document.querySelector('.step-err-message').innerHTML = 'Veuillez entrer un description contenant au moins 10 caractères.';
      }
   });
})

submitStepsBtn.addEventListener('click', (e) => {
   e.preventDefault();
   closeAddStepPage();
   updateBlocSteps();
})

const addPhotoBtn = document.getElementById('submit-photo-btn');
const addPhotoInput = document.getElementById('add-photo-input');
const photoRecipeImg = document.querySelector('#photo-recipe img');
const MAX_IMAGE_SIZE_MB = 5;

addPhotoInput.addEventListener('change', (e) => {
   e.preventDefault();
   const file = addPhotoInput.files[0];

   if (file) {
      if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
         alert("L'image est trop volumineuse. Veuillez sélectionner une image de taille inférieure à " + MAX_IMAGE_SIZE_MB + " MB.");
         addPhotoInput.value = '';
         return;
      }

      const reader = new FileReader();

      reader.onload = (event) => {
         event.preventDefault();
         photoRecipeImg.src = event.target.result;
      };
      reader.readAsDataURL(file);
   }
});

addPhotoBtn.addEventListener('click', (e) => {
   e.preventDefault();
   addPhotoInput.click();
})

const addNewRecipe = async (formData) => {
   try {
      const response = await fetch('http://localhost:3000/api/recipe', {
         method: 'POST',
         body: formData,
         mode: 'cors',
      });

      if (response.ok) {
         console.log("Recette ajoutée");
         window.location.href = 'http://127.0.0.1:5500/Frontend/recettes.html';

      } else {
         const data = await response.json();
         console.log(data);

      }
   } catch (error) {
      console.log(error);
   }
}

const submitRecipeBtn = document.getElementById('submit-recipe-btn');
let formData;

const verifForm = async () => {
   const recipeNameValue = document.querySelector('#recipe-name').value;
   const typeInput = document.querySelector('input[name="type"]:checked');
   document.querySelectorAll('.err-message').forEach(errMsg => errMsg.innerHTML = '');

   try {
      const response = await fetch('http://localhost:3000/api/recipe');
      const data = await response.json();
      const recipeExists = data.recipes.some(recipe => recipe.name.toLowerCase() === recipeNameValue.toLowerCase());

      if (recipeExists) document.querySelector('#bloc-title > .err-message').innerHTML = `'${recipeNameValue}' existe déjà dans la base de données`;

      if (!recipeNameValue) {
         document.querySelector('#bloc-title > .err-message').innerHTML = 'Veuillez entrer un nom de recette';
      } else if (recipeNameValue.length > 0 && recipeNameValue.length < 2 || recipeNameValue.length > 30) {
         document.querySelector('#bloc-title > .err-message').innerHTML = 'Veuillez entrer un nom contenant entre 2 et 30 caractères';
      }

      if (!typeInput) {
         document.querySelector('#bloc-type > .err-message').innerHTML = 'Veuillez selectionner le type de recette';
      }

      if (addedIngredients.length < 2) {
         document.querySelector('#bloc-ingredients > .err-message').innerHTML = 'Vous devez ajouter au moins 2 ingrédients';
      }

      if (addedStep.length < 2) {
         document.querySelector('#bloc-steps > .err-message').innerHTML = 'Vous devez ajouter au moins 2 étapes';
      }

      if (!recipeExists && recipeNameValue && (recipeNameValue.length >= 2 && recipeNameValue.length <= 30) && typeInput && addedIngredients.length >= 2 && addedStep.length >= 2) {
         formData = new FormData();
         formData.append('name', recipeNameValue);
         formData.append('type', typeInput.value);
         formData.append('ingredients', JSON.stringify(addedIngredients));
         formData.append('steps', JSON.stringify(addedStep));
         if (addPhotoInput.files[0]) {
            formData.append('image', addPhotoInput.files[0]);
         }
         return true;
      }

   } catch (error) {
      console.log(error);
      return false;
   }
};

submitRecipeBtn.addEventListener('click', async (e) => {
   e.preventDefault();

   const isFormValid = await verifForm();
   if (isFormValid) addNewRecipe(formData);
});