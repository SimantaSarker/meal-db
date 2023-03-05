const loadMeals = (searchText) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
};
const displayMeals = (meals) => {
  console.log(meals);
  const mealsContainer = document.getElementById("meals-container");
  mealsContainer.innerHTML = "";
  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("col");
    mealDiv.innerHTML = `
    <div class="card">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional
    content. This content is a little bit longer.</p>

      <button type="button" class="btn btn-primary" data-bs-toggle="modal"          data-bs-target="#mealDeatils" onclick="loadMealDetail(${meal.idMeal})">
    Details
    </button>
  </div>
  </div>
    `;
    mealsContainer.appendChild(mealDiv);
  });
};

const searchMeals = () => {
  const searchText = document.getElementById("search-field").value;
  console.log(searchText);
  loadMeals(searchText);
  document.getElementById("search-field").value = "";
};
loadMeals("value");

const loadMealDetail = (idMeal) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetail(data.meals[0]));
};

const displayMealDetail = (meal) => {
  document.getElementById("mealDetailsLabel").innerText = meal.strMeal;
  const mealDetailsBody = document.getElementById("mealDetailsBody");
  mealDetailsBody.innerHTML = `
  <img src="${meal.strMealThumb}" class="img-fluid">
  <h5> <bold>CateGory:</bold> ${meal.strMeal}</h5>
  <h5> Area: ${meal.strArea} </h5>
  <p> Instructions: ${meal.strInstructions} </p>
  <p> <strong> Youtube</strong> :  ${meal.strYoutube} </p>
  `;
};
