const errorMassage = data => {
  const errorContainar = document.getElementById('error-containar');
    errorContainar.textContent = '';
    const div = document.createElement('div');
    div.classList.add('error');
    div.className = "bg-danger w-25 mx-auto mt-5 text-white text-center p-3"
    div.innerHTML = `<h1>${data}</h1>`;
    errorContainar.appendChild(div);
}


const getLoadApi = () => {
    const inputField = document.getElementById('input-field');
    const inputFieldText = inputField.value;
    inputField.value = '';
    const inputLength = inputFieldText.length;
    const errorContainar = document.getElementById('error-containar');
  if (inputFieldText == '') {
      const massage = "Your search box empty...Please search anything";
      errorMassage(massage);
  }
  else {
    if (inputLength == 1) {
        errorContainar.textContent = '';
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputFieldText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayMeals(data.meals))
    }
    else {
        errorContainar.textContent = '';
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputFieldText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayMeals(data.meals))
    }
  }
}

const displayMeals = (meals) => {
  const mealContainar = document.getElementById('meals-containar');
  mealContainar.textContent = '';
    if (meals == null) {
      const massage = "Couldn't find this food";
      errorMassage(massage);
  }
    else {
      meals.forEach(meal => {

        const div = document.createElement('div');
        div.classList.add("meals-area");
        div.style.width = "25%";
        div.innerHTML = `
            <div class="col">
            <div onclick="loadMealsDetail(${meal.idMeal})" class="card">
              <img src="${meal.strMealThumb}" class="card-img-top image-fluid" alt="...">
              <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0,140)}</p>
              </div>
            </div>
          </div>
      `;
      mealContainar.appendChild(div);
        
        
    });
  }
}

const loadMealsDetail = mealId => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
      .then(res => res.json())
      .then(data => showMealsDetails(data.meals[0]))
}

const showMealsDetails = meal => {
  const mealsDetails = document.getElementById('meals-details');

  const div = document.createElement('div');
  mealsDetails.textContent ='';
  div.classList.add('detailsMeals');
  div.innerHTML = `
      <div class="card mx-auto" style="width: 18rem;">
      <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body p-3">
        <h5 class="card-title">${meal.strMeal}</h5>
        <ul>
            <li>Catagory:${meal.strCategory}</li>  
            <li>Area Of Food:${meal.strArea}</li>  
        </ul>
        <p class="card-text">${meal.strInstructions.slice(0,350)}</p>
        
        <a href="${meal.strYoutube}" class="btn btn-primary d-block" target=_blank>Video</a>
      </div>
    </div>
  `;
  mealsDetails.appendChild(div);
  window.scrollTo(0, 50);
}
