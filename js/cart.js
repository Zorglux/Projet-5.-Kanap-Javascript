async function getDataById(id) {
  let url = `http://localhost:3000/api/products/${id}`

  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}
// ============================================

function getItemsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("panier"));
}
// =============================================

async function updatePriceQuantity() {
  let localStorage = getItemsFromLocalStorage();
  let price = 0;
  let quantity = 0;

  // Calcul du prix du panier
  for (let i = 0; localStorage[i]; i++) {
    let data = await getDataById(localStorage[i].identifiant);
    price += parseInt(localStorage[i].montant) * parseInt(data.price);
    quantity += parseInt(localStorage[i].montant);

  }
  // Add Price & Quantity
  document.getElementById('totalPrice').textContent = `${price}`
  document.getElementById('totalQuantity').textContent = `${quantity}`
}
// ==========================================================

async function creerElements(){
  let localStorageItem = getItemsFromLocalStorage()

  // creation des élements
  for (let i=0; localStorageItem[i]; i++){
    let donneesApi = await getDataById(localStorageItem[i].identifiant)
    const placement = document.getElementById("cart__items")

    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.setAttribute("data-id", `${localStorageItem[i].identifiant}`)
    article.setAttribute("data-color", `${localStorageItem[i].couleur}`)
    article.innerHTML =
     ` <div class="cart__item__img">
     <img src="${donneesApi.imageUrl}" alt="${donneesApi.altTxt}">
   </div>
   <div class="cart__item__content">
     <div class="cart__item__content__description">
       <h2>${donneesApi.name}</h2>
       <p>${localStorageItem[i].couleur}</p>
       <p>${donneesApi.price}</p>
     </div>
     <div class="cart__item__content__settings">
       <div class="cart__item__content__settings__quantity">
         <p>Qté : </p>
         <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localStorageItem[i].montant}">
       </div>
       <div class="cart__item__content__settings__delete">
         <p class="deleteItem">Supprimer</p>
       </div>
     </div>
   </div>`

    placement.appendChild(article)

    let qtyInput = article.getElementsByClassName('itemQuantity');
      console.log("n'est pas un tableau?", qtyInput[0])
      qtyInput[0].addEventListener('change', (e) => {
        updateQtyLocalStorage(e, localStorageItem[i].id, localStorageItem[i].color);
      });
      
      /**
       * @param  {HTMLElement} q
       * @param  {string} id
       * @param  {string} color
       * update localStorage when a quantity change is triggered
       */
      async function updateQtyLocalStorage(q, id, color) {
        let array = getItemsFromLocalStorage();
        let idArray = [];
        let index;
        // error handling
        if (q.target.value <= 0)
          return -1;
        // ----- get the index of our item in our array ----- //
        for (let i = 0; array[i]; i++) {
          if (array[i].id == id && array[i].color == color)
            index = i;
          idArray.push(array[i].id);
        }
      
        // ----- change the value of the quantity and push it to localStorage ----- //
        array[index].montant = q.target.value;
        localStorage.setItem("panier", JSON.stringify(array));
        // ----- Update our innerHtml ----- //
        let quantityHTML = document.querySelector(`[data-id="${localStorageItem[i].identifiant}"][data-color="${localStorageItem[i].couleur}"] [class="cart__item__content__settings__quantity"]`);
        console.log(quantityHTML)
        quantityHTML.firstElementChild.textContent = `Qté : ${q.target.value}`
      
        let priceHTML = document.querySelector(`[data-id="${localStorageItem[i].identifiant}"][data-color="${localStorageItem[i].couleur}"] [class="cart__item__content__description"]`)
        let temp = await getDataById(localStorageItem[i].identifiant);
        priceHTML.lastChild.textContent = `${q.target.value * temp.price} €`
        
        
        const az = document.getElementById("totalPrice")
        az.innerText = `${q.target.value * temp.price} €`
        updatePriceQuantity()
      }
  }
}

// ===================================================================
/* Actualisation du prix et du nombre d'articles total */ 
//==================================================================


// ==============================================================
/* VALIDATION DU FORMULAIRE */ 

function validationFormulaire(){
const formulaire = document.getElementById("order")

const prenom = document.getElementById("firstName")
const nom = document.getElementById("lastName")
const addresse = document.getElementById("address")
const ville = document.getElementById("city")
const email = document.getElementById("email")

const error = document.getElementById("firstNameErrorMsg")
const error2 = document.getElementById("lastNameErrorMsg")
const error3= document.getElementById("addressErrorMsg")
const error4 = document.getElementById("cityErrorMsg")
const error5 = document.getElementById("emailErrorMsg")
// =================================================

formulaire.addEventListener("click", function(){
  if (prenom.value == '' || prenom.value == null){

    error.innerText = "Veuillez renseigner votre prénom" 
  }else{
    error.remove()
  }
})

// ===========

formulaire.addEventListener("click", function(){
  if (nom.value == '' || nom.value == null){

    error2.innerText = "Veuillez renseigner votre nom de famille" 
  }else{
    error2.remove()
  }
})

// ==========

formulaire.addEventListener("click", function(){
  if (addresse.value == '' || addresse.value == null){

    error3.innerText = "Veuillez renseigner votre adresse" 
  }else{
    error3.remove()
  }
})

// ==========

formulaire.addEventListener("click", function(){
  if (ville.value == '' || ville.value == null){

    error4.innerText = "Veuillez renseigner votre ville" 
  }else{
    error4.remove()
  }
})
 
// ==========

formulaire.addEventListener("click", function(){
  if (email.value == '' || email.value == null){

    error5.innerText = "Veuillez renseigner votre email" 
  }else{
    error5.remove()
  }
})
}


// ==================================================
creerElements()
updatePriceQuantity()
validationFormulaire()