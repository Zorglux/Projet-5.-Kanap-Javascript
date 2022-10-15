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
  let localStorage = getItemsFromLocalStorage()

  // creation des élements
  for (let i=0; localStorage[i]; i++){
    let donneesApi = await getDataById(localStorage[i].identifiant)
    const placement = document.getElementById("cart__items")

    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.setAttribute("data-id", `${localStorage[i].identifiant}`)
    article.setAttribute("data-color", `${localStorage[i].couleur}`)
    article.innerHTML =
     ` <div class="cart__item__img">
     <img src="${donneesApi.imageUrl}" alt="${donneesApi.altTxt}">
   </div>
   <div class="cart__item__content">
     <div class="cart__item__content__description">
       <h2>${donneesApi.name}</h2>
       <p>${localStorage[i].couleur}</p>
       <p>${donneesApi.price}</p>
     </div>
     <div class="cart__item__content__settings">
       <div class="cart__item__content__settings__quantity">
         <p>Qté : </p>
         <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localStorage[i].montant}">
       </div>
       <div class="cart__item__content__settings__delete">
         <p class="deleteItem">Supprimer</p>
       </div>
     </div>
   </div>`

    placement.appendChild(article)
  }
}

// ===================================================================
/* Actualisation du prix et du nombre d'articles total */ 
//==================================================================

function actualisation(){  /*(appelé tout en bas) */ 
  
 let place = document.getElementsByClassName("itemQuantity")

 console.log("me donne un tableauHTML,  j'ai mes elements : ", place)
 console.log("n'est pas un tableau?", place[0])

for (let i=0 ; i<place.length ; i++){
   console.log("succes")   /* = Il ne me rends rien */ 
 }

 // ========================================== 

 let placeA = document.querySelectorAll(".itemQuantity")
 
 console.log("me donne une NodeListe vite : ", placeA)
 
}




// ==============================================================









creerElements()
updatePriceQuantity()


actualisation() 
// j'appelle actualisation a la fin, donc mon HTML est deja créer