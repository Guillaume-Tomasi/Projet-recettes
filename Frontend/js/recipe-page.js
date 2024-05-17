
let addRecipeText = `<section id="modal-page">
      <div class="modal-bloc">
        <div class="title">Ajouter un ingrédienhh</div>
        <div class="form">
          <form>
            <div class="input-div">
              <label for="name">Nom :</label>
              <input type="text" id="name" name="name" required />
              <div id="name-errorMsg"></div>
            </div>

            <div class="input-div">
              <label for="name">Ingrédient :</label>
              <button class="addIngredientBtn">Ajouter un ingrédient<button/>
              <div id="name-errorMsg"></div>
            </div>

            <input type="submit" value="Ajouter" class="addIngredientBtn" />
          </form>
        </div>
        <div id="exit-addIngredient">
          <i class="fa-solid fa-arrow-left"></i>
        </div>
        <div id="errorMsg"></div>
      </div>
    </section>`






const getRecipes = async () => {
   await fetch('http://localhost:3000/api/recipe')
      .then(res => res.json())
      .then(data => {
         const recipes = data.recipes.map(recipe => {
            return {
               name: recipe.name,
               image: recipe.image,

            }
         });
         for (let i = 0; i < recipes.length; i++) {
            let recipeCard = `<div class="card-recipe">
   <div class="card-recipe-img">
      <img src="${recipes[i].image}" alt="recette" />
   </div>
   <div class="card-recipe-body">
      <p>${recipes[i].name}</p>
   </div>
</div>`;

            document.getElementById('card-recipe-bloc').insertAdjacentHTML('afterbegin', recipeCard)
         }
      })
      .catch(err => console.log(err))
};
getRecipes();

const searchRecipes = () => {
   const searchValue = searchInput.value.toLowerCase();
   const cards = document.querySelectorAll('.card-recipe');

   cards.forEach(card => {
      const name = card.querySelector('.card-recipe-body p').textContent.toLowerCase();
      if (name.includes(searchValue)) {
         card.style.display = 'block';
      } else {
         card.style.display = 'none';
      }
   });
};
const searchInput = document.getElementById('search-item');
searchInput.addEventListener('input', searchRecipes);








