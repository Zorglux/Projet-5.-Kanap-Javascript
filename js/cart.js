async function apiParId(id) {
  let url = `http://localhost:3000/api/products/${id}`

  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}
// ============================================

function rameneLocalStorage() {
  return JSON.parse(localStorage.getItem("panier"));
}
// =============================================

async function actualisationQuantitee() {
  let localStorage = rameneLocalStorage();
  let prix = 0;
  let quantitee = 0;

  // Calcul du prix du panier
  for (let i = 0; localStorage[i]; i++) {
    let donneesApi = await apiParId(localStorage[i].identifiant);
    prix += parseInt(localStorage[i].montant) * parseInt(donneesApi.price);
    quantitee += parseInt(localStorage[i].montant);

  }
  // On les ajoutes au dom 
  document.getElementById('totalPrice').textContent = `${prix}`
  document.getElementById('totalQuantity').textContent = `${quantitee}`
}
// ==========================================================

async function creerElements(){
  let localObjet = rameneLocalStorage()

  // creation des élements
  for (let i=0; localObjet[i]; i++){
    let donneesApi = await apiParId(localObjet[i].identifiant)
    const placement = document.getElementById("cart__items")

    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.setAttribute("data-id", `${localObjet[i].id}`)
    article.setAttribute("data-color", `${localObjet[i].couleur}`)
    article.innerHTML =
     ` <div class="cart__item__img">
     <img src="${donneesApi.imageUrl}" alt="${donneesApi.altTxt}">
   </div>
   <div class="cart__item__content">
     <div class="cart__item__content__description">
       <h2>${donneesApi.name}</h2>
       <p>${localObjet[i].couleur}</p>
       <p>${donneesApi.price}</p>
     </div>
     <div class="cart__item__content__settings">
       <div class="cart__item__content__settings__quantity">
         <p>Qté : </p>
         <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localObjet[i].montant}">
       </div>
       <div class="cart__item__content__settings__delete">
         <p class="deleteItem">Supprimer</p>
       </div>
     </div>
   </div>`

    placement.appendChild(article)

    // ===================================================================
/* Calcul du prix et du nombre d'articles total */ 
//==================================================================
    let placementInput = article.getElementsByClassName('itemQuantity');

    placementInput[0].addEventListener('change', (e) => {
      actualisationLocalStorage(e, localObjet[i].id, localObjet[i].color);
    });
    
    

    async function actualisationLocalStorage(q, id, color) {
      let local = rameneLocalStorage();
      let idLocal = [];
      let index;
      // error handling
      if (q.target.value <= 0)
        return -1;
      // ----- On mets l'index dans notre tableau ----- //
      for (let i = 0; local[i]; i++) {
        if (local[i].id == id && local[i].color == color)
          index = i;
        idLocal.push(local[i].id);
      }
    
      // ----- change the value of the quantity and push it to localStorage ----- //
      local[index].montant = q.target.value;
      localStorage.setItem("panier", JSON.stringify(local));

      // ----- On remets a jour le total ----- //

              actualisationQuantitee()
            }

            function suppression(){
              let boutonSupprimer =  article.getElementsByClassName("deleteItem")
              let idParBouton = boutonSupprimer[0].closest("article").getAttribute("data-id")
              let articleDuBouton = boutonSupprimer[0].closest("article")
              
              boutonSupprimer[0].addEventListener("click", function(){
                let local = rameneLocalStorage();
               
                let localSupprime =  local.filter(function(local) {
                  return local.id != idParBouton ;
                });
                localStorage.setItem("panier", JSON.stringify(localSupprime));
                
               actualisationQuantitee()
               articleDuBouton.remove()
              
              })
            }
            suppression()
            
           
    }
}











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
actualisationQuantitee()
validationFormulaire()