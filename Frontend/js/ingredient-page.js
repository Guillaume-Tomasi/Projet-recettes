// const Uid = localStorage.getItem('userId');

let addPhotoInput;
// Chargement des ingrédients de la page

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
            let ingredientCard = `<div class="card-ingredient">
            <div class="card-ingredient-img">
            <img src="${ingredients[i].image}" alt="ingrédient" />
            </div>
            <div class="card-ingredient-body">
            <p>${ingredients[i].name}</p>
            </div>
            </div>`;

            document.getElementById('card-ingredient-bloc').insertAdjacentHTML('afterbegin', ingredientCard)
         }
      })
      .catch(err => console.log(err))
};
getIngredients();



const searchIngredients = () => {
   const searchValue = searchInput.value.toLowerCase();
   const cards = document.querySelectorAll('.card-ingredient');

   cards.forEach(card => {
      const name = card.querySelector('.card-ingredient-body p').textContent.toLowerCase();
      if (name.includes(searchValue)) {
         card.style.display = 'block';
      } else {
         card.style.display = 'none';
      }
   });
};
const searchInput = document.getElementById('search-item');
searchInput.addEventListener('input', searchIngredients);


let addedIngredient = `<div class="validateItem"><p>Ingrédient ajouté !</p></div>`;
let addIngredientText = `<section id="modal-page">
      <div class="modal-bloc">
        <div class="title">Ajouter un ingrédient</div>
        <div class="form">
          <form>
            <div class="input-div">
              <label for="name">Nom :</label>
              <input type="text" id="name" name="name" required />
              <div id="name-errorMsg"></div>
            </div>

             <div class="input-div"> 
              <label for="image">image:</label>
              <input type="file" accept="image/*" id="add-photo-input" />
              <div id="recipe-img">
              <div id="photo-recipe">
              <img
                src="/Frontend/images/Page recettes/photo-1543339308-43e59d6b73a6.jpg"
                alt=""
              />
              </div>
              <button type="button" id="submit-photo-btn">Ajouter</button>
              </div>
              </div> 

            

            <input type="submit" value="Ajouter" class="addIngredientBtn" />
          </form>
        </div>
        <div id="exit-addIngredient">
          <i class="fa-solid fa-arrow-left"></i>
        </div>
        <div id="errorMsg"></div>
      </div>
    </section>`;

// const addIngredient = async () => {
//    let name = document.getElementById("name").value;
//    const ingredientData = { name };

//    await fetch('http://localhost:3000/api/ingredient', {
//       method: 'POST',
//       headers: {
//          "Accept": "application/json",
//          'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(ingredientData)
//    })
//       .then(res => {
//          if (res.ok) {
//             document.querySelector('.form').remove();
//             document.getElementById('errorMsg').textContent = "";
//             document.querySelector('.title').insertAdjacentHTML("afterend", addedIngredient);
//             setTimeout(() => {
//                window.location.reload();
//             }, 2000);
//          } else {
//             return res.json();
//          }
//       })
//       .then(data => {
//          if (data.message) {
//             document.getElementById('errorMsg').textContent = data.message;
//             console.log(data);
//          }
//       })
//       .catch(error => {
//          console.log(error);
//       })
// }

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

      // Verification nom ingredient
      if (!ingredientNameValue) {
         document.getElementById('name-errorMsg').innerHTML = "Veuillez entrer un nom d'ingredient";
      } else if (ingredientNameValue.length > 0 && ingredientNameValue.length < 2 || ingredientNameValue.length > 15) {
         document.getElementById('name-errorMsg').innerHTML = "Veuillez entrer un nom contenant entre 2 et 15 caractères";
      } else if (!nameRegex.test(ingredientNameValue)) {
         document.getElementById('name-errorMsg').innerHTML = "Le nom de l'ingrédient contient des caractères invalides."
      }

      if (!ingredientExists && nameRegex.test(ingredientNameValue) && ingredientNameValue && (ingredientNameValue.length >= 2 && ingredientNameValue.length <= 15)) {
         formData = new FormData();

         formData.append('name', ingredientNameValue);
         if (addPhotoInput.files[0]) {
            formData.append('image', addPhotoInput.files[0]);
         }
         return true;
      }
   }
   catch (error) {
      console.log(error);
      return false;
   }
}



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
}



const addIngredientLink = document.querySelector('.add');

addIngredientLink.addEventListener('click', () => {
   document.querySelector('header').insertAdjacentHTML("beforebegin", addIngredientText);
   document.body.style.overflow = "hidden";
   const addBtn = document.querySelector('.addIngredientBtn');


   addPhotoInput = document.getElementById('add-photo-input');
   const photoRecipeImg = document.querySelector('#photo-recipe img');
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
            photoRecipeImg.src = event.target.result;
         };

         reader.readAsDataURL(file);
      }

   });
   addPhotoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      addPhotoInput.click();
   })



   addBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const isFormValid = await verifForm();
      if (isFormValid) addNewIngredient(formData);
   })


   const exitAddIngredient = document.getElementById('exit-addIngredient');

   exitAddIngredient.addEventListener('click', () => {
      document.getElementById('modal-page').remove();
      document.body.style.overflow = "visible";
   });
})




