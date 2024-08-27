let addPhotoInput;

const getIngredients = async () => {
   await fetch('http://localhost:3000/api/ingredient')
      .then(res => res.json())
      .then(data => {
         const ingredients = data.ingredients.map(ingredient => {
            return {
               id: ingredient._id,
               name: ingredient.name,
               image: ingredient.image,
            };
         });

         for (let i = 0; i < ingredients.length; i++) {
            let ingredientCard = `<div id="card-ingredient-${ingredients[i].name}" class="card-ingredient">
               <div class="card-ingredient-img">
                  <img src="${ingredients[i].image}" alt="${ingredients[i].name}" />
               </div>
               <div class="card-ingredient-body">
                  <p>${ingredients[i].name}</p>
               </div>
               <div  id="delete-${ingredients[i].name}" class="delete-ingredient-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                  </svg>
               </div>
            </div>`;

            document.getElementById('card-ingredient-bloc').insertAdjacentHTML('afterbegin', ingredientCard);

            document.getElementById(`delete-${ingredients[i].name}`).addEventListener('click', () => {

               fetch(`http://localhost:3000/api/ingredient/${ingredients[i].id}`, {
                  method: 'DELETE',
               })
                  .then(res => {
                     if (res.ok) {
                        document.getElementById(`card-ingredient-${ingredients[i].name}`).remove();
                     } else {
                        console.log(err);
                     }
                  })
                  .catch(error => console.log(err));
            });
         }
      })
      .catch(err => console.log(err));
};
getIngredients();

const searchIngredients = () => {
   const searchValue = searchInput.value.toLowerCase();
   const cards = document.querySelectorAll('.card-ingredient');

   cards.forEach(card => {
      const name = card.querySelector('.card-ingredient-body p').textContent.toLowerCase();
      if (name.includes(searchValue)) {
         card.style.display = 'flex';
      } else {
         card.style.display = 'none';
      }
   });
};

const searchInput = document.getElementById('search-item');
searchInput.addEventListener('input', searchIngredients);

let addedIngredient = `<div class="validateItem"><p>Ingrédient ajouté !</p></div>`;
let addIngredientText = `<form class="add-ingredient-form">
   <div class="input-div">
      <label for="name">Nom :</label>
      <input type="text" id="name" name="name" required />
      <div id="name-errorMsg"></div>
   </div>
   <div class="input-div">
      <label for="image">image:</label>
      <input type="file" accept="image/*" id="add-photo-input" />
      <div id="ingredient-img">
         <div id="photo-ingredient">
            <img src="/Frontend/images/Page recettes/photo-1543339308-43e59d6b73a6.jpg" alt="" />
         </div>
         <button type="button" id="submit-photo-btn">Ajouter</button>
      </div>
   </div>
   <input type="submit" value="Ajouter" class="addIngredientBtn" />
</form>`;

let formData;

const verifForm = async () => {
   const ingredientNameValue = document.querySelector('#name').value;
   const nameRegex = /^(?!.*(.)\1{2})(?=.*[a-zA-Z])[\w\s,.'-]{2,}$/;
   document.getElementById('name-errorMsg').innerHTML = '';

   try {
      const response = await fetch('http://localhost:3000/api/ingredient');
      const data = await response.json();

      const ingredientExists = data.ingredients.some(ingredient => ingredient.name.toLowerCase() === ingredientNameValue.toLowerCase());
      if (ingredientExists) document.getElementById('name-errorMsg').innerHTML = `'${ingredientNameValue}' existe déjà dans la base de données`;

      if (!ingredientNameValue) {
         document.getElementById('name-errorMsg').innerHTML = "Veuillez entrer un nom d'ingredient";
      } else if (ingredientNameValue.length > 0 && ingredientNameValue.length < 2 || ingredientNameValue.length > 15) {
         document.getElementById('name-errorMsg').innerHTML = "Veuillez entrer un nom contenant entre 2 et 15 caractères";
      } else if (!nameRegex.test(ingredientNameValue)) {
         document.getElementById('name-errorMsg').innerHTML = "Le nom de l'ingrédient contient des caractères invalides.";
      }

      if (!ingredientExists && nameRegex.test(ingredientNameValue) && ingredientNameValue && (ingredientNameValue.length >= 2 && ingredientNameValue.length <= 15)) {
         formData = new FormData();
         formData.append('name', ingredientNameValue);
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

const addNewIngredient = async (formData) => {
   try {
      const response = await fetch('http://localhost:3000/api/ingredient', {
         method: 'POST',
         body: formData,
         mode: 'cors',
      });

      if (response.ok) {
         console.log("ingredient ajouté");
         window.location.reload();
      } else {
         const data = await response.json();
         console.log(data);
      }
   } catch (error) {
      console.log(error);
   }
};

const addIngredientLink = document.querySelector('.add button');

addIngredientLink.addEventListener('click', () => {
   const addIngredientForm = document.querySelector('.add-ingredient-form');

   if (addIngredientForm) {
      return addIngredientForm.remove();
   }
   document.querySelector('.search').insertAdjacentHTML("beforeend", addIngredientText);
   const addBtn = document.querySelector('.addIngredientBtn');

   addPhotoInput = document.getElementById('add-photo-input');
   const photoIngredientImg = document.querySelector('#photo-ingredient img');
   const addPhotoBtn = document.getElementById('submit-photo-btn');
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
            photoIngredientImg.src = event.target.result;
         };

         reader.readAsDataURL(file);
      }
   });

   addPhotoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      addPhotoInput.click();
   });

   addBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const isFormValid = await verifForm();
      if (isFormValid) addNewIngredient(formData);
   });
});