const getRecipes = async () => {
   await fetch('http://localhost:3000/api/recipe')
      .then(res => res.json())
      .then(data => {
         const recipes = data.recipes.map(recipe => {
            return {
               id: recipe._id,
               name: recipe.name,
               image: recipe.image,
            };
         });

         for (let i = 0; i < recipes.length; i++) {
            let recipeCard = `<a href="./recette-individuelle.html?id=${recipes[i].id}" class="card-recipe-link">
                    <div class="card-recipe">
                        <div class="card-recipe-img">
                            <img src="${recipes[i].image}" alt="recette" />
                        </div>
                        <div class="card-recipe-body">
                            <p>${recipes[i].name}</p>
                        </div>
                    </div>
                </a>`;

            document.getElementById('card-recipe-bloc').insertAdjacentHTML('afterbegin', recipeCard);
         }
      })
      .catch(err => console.log(err));
};
getRecipes();

const newRecipeLink = document.querySelector('.add button');

newRecipeLink.addEventListener('click', () => {
   window.location = './nouvelle_recette.html';
});

const searchRecipes = () => {
   const searchValue = searchInput.value.toLowerCase();
   const cards = document.querySelectorAll('.card-recipe-link');

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