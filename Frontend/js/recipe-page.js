let params = new URLSearchParams(document.location.search);
let id = params.get("id");

let recipe = [];
let ingredientDetails = [];

// Récupération de la recette

const getRecipe = async () => {
   try {
      const response = await fetch(`http://localhost:3000/api/recipe/${id}`);
      if (!response.ok) {
         throw new Error(`Une erreur s'est produite ! Status: ${response.status}`);
      }
      const data = await response.json();

      if (data.ingredients && data.steps && data.ingredients.length > 0 && data.steps.length > 0) {
         data.ingredients = JSON.parse(data.ingredients[0]);
         data.steps = JSON.parse(data.steps[0]);
      }

      recipe = data;
   } catch (error) {
      console.error('Erreur de récupération de la recette:', error);
   }
};

const getIngredients = async (ingredientRecipe) => {
   try {
      const response = await fetch(`http://localhost:3000/api/ingredient`);
      if (!response.ok) {
         throw new Error(`Une erreur s'est produite ! Status: ${response.status}`);
      }
      const data = await response.json();

      data.ingredients.forEach(ingredient => {
         if (ingredient.name === ingredientRecipe) {
            ingredientDetails.push(ingredient);
         }
      })





   } catch (error) {
      console.error("Ereur de récupération de l'ingrédient:", error);
   }
}

const recipeDisplay = async () => {
   ingredientDetails = [];
   await getRecipe();

   document.title = recipe.name;
   document.querySelector('h1').innerText = recipe.name;
   document.querySelector('.type').innerText = recipe.type;
   document.getElementById('section-img').innerHTML = `<img
            src="${recipe.image}"
   alt = "image de la recette : '${recipe.name}'"
   class="recipe-photo"
      /> `;

   // ingredients
   for (let ingredient of recipe.ingredients) {
      await getIngredients(ingredient.name);

      for (let i = 0; i < ingredientDetails.length; i++) {
         if (ingredient.name === ingredientDetails[i].name) {
            document.querySelector('.ingredients').insertAdjacentHTML("afterbegin", `<li class="ingredient-item">
              <img
                src="${ingredientDetails[i].image}"
                alt="${ingredient.name}"
              />
              <span>${ingredient.quantity} ${ingredient.unit} de ${ingredient.name}</span>
            </li>`);
         };
      };

   };

   recipe.steps.forEach((step, index) => {
      document.querySelector('.steps').insertAdjacentHTML('beforeend', `<li class="step-item">
            <div class="step-group">
              <div class="step-number">${index + 1}</div>
              ${step.description}
            </div>
            <div class="step-ingredients" id="step-ingredients-${index}"></div>
          </li>`);

      for (let ingredient of step.ingredients) {
         console.log(ingredient);
         // await getIngredients(ingredient.name);
         let ingredientIndex = document.getElementById(`step-ingredients-${index}`);

         for (let i = 0; i < ingredientDetails.length; i++) {
            if (ingredient === ingredientDetails[i].name) {
               document.getElementById(`step-ingredients-${index}`).insertAdjacentHTML("beforeend", `<img
                src="${ingredientDetails[i].image}"
                alt="${ingredient}"
              />`);
            };
         };

      };
   });
};

recipeDisplay();