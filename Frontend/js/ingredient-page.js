// const Uid = localStorage.getItem('userId');


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

           <!-- <div class="input-div"> 
              <label for="image">image:</label>
              <input type="file" id="image" name="image" />
              <div id="img-errorMsg"></div>
            </div> -->

            <input type="submit" value="Ajouter" class="addIngredientBtn" />
          </form>
        </div>
        <div id="exit-addIngredient">
          <i class="fa-solid fa-arrow-left"></i>
        </div>
        <div id="errorMsg"></div>
      </div>
    </section>`;

const addIngredient = async () => {
   let userId = localStorage.getItem('userId');
   let name = document.getElementById("name").value;
   const ingredientData = { userId, name };

   await fetch('http://localhost:3000/api/ingredient', {
      method: 'POST',
      headers: {
         "Accept": "application/json",
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(ingredientData)
   })
      .then(res => {
         if (res.ok) {
            document.querySelector('.form').remove();
            document.getElementById('errorMsg').textContent = "";
            document.querySelector('.title').insertAdjacentHTML("afterend", addedIngredient);
            setTimeout(() => {
               window.location.reload();
            }, 2000);
         } else {
            return res.json();
         }
      })
      .then(data => {
         if (data.message) {
            document.getElementById('errorMsg').textContent = data.message;
            console.log(data);
         }
      })
      .catch(error => {
         console.log(error);
      })
}

const addIngredientLink = document.querySelector('.add');

addIngredientLink.addEventListener('click', () => {
   document.querySelector('header').insertAdjacentHTML("beforebegin", addIngredientText);
   document.body.style.overflow = "hidden";
   const addBtn = document.querySelector('.addIngredientBtn');

   addBtn.addEventListener('click', (e) => {
      e.preventDefault();
      addIngredient();
   })


   const exitAddIngredient = document.getElementById('exit-addIngredient');

   exitAddIngredient.addEventListener('click', () => {
      document.getElementById('modal-page').remove();
      document.body.style.overflow = "visible";
   });
})

