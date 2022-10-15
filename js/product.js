const futurId = new URLSearchParams(window.location.search)
const id = futurId.get("id")
const urlDeBase ="http://localhost:3000/api/products/"
/* ===================================================== */ 
fetch(urlDeBase+id)
.then ((response) => response.json())
.then ((donnees)  =>  creation(donnees))
/* ===================================================== */ 
function creation(donneesCanape){
 const nom = donneesCanape.name
 const imageUrl = donneesCanape.imageUrl
 const imageAlt = donneesCanape.altTxt
 const description = donneesCanape.description
 const prix = donneesCanape.price
 const couleurs = donneesCanape.colors


 creationNom(nom)
 creationImage(imageUrl, imageAlt)
 creationPrix(prix)
 creationDescription(description)
 creationCouleurs(couleurs)
}
/* ========================================================== */ 

function creationImage(url, alt){
document.querySelector(".item__img").
innerHTML = `<img src=${url} alt=${alt}>`
}

function creationNom(nom){
 document.getElementById("title").
 innerText = nom
}

function creationPrix(prix){
    document.getElementById("price").
    innerText = prix
}

function creationDescription(description){
    document.getElementById("description").
    innerText = description
}

function creationCouleurs(couleurs){
    const input = document.getElementById("colors")
    couleurs.map(couleur => {
    const option = document.createElement("option")
    option.value = couleur
    option.text = couleur
    input.appendChild(option)
    })
}
/* ========================================================== */ 
 //  MISE EN PLACE DU LOCALSTORAGE 
/* ========================================================== */

const bouton = document.getElementById("addToCart")
bouton.addEventListener("click", function(event){

    const nombreDeCanape = document.getElementById("quantity").value
    const couleurDuCanape = document.getElementById("colors").value

   if ((nombreDeCanape == 0) || (couleurDuCanape =="")) {
    event.preventDefault
    alert("Merci de sélectionner une couleur et un montant")

   }else{ 
    let donneesPourPanier = {
        id :   id+couleurDuCanape,
        identifiant : id,
        montant : nombreDeCanape,
        couleur: couleurDuCanape
    }
    ajouterAuPanier(donneesPourPanier)

   }
})

/* ============================================================= */ 
// FONCTIONS QUE J'APPELLE POUR MON LOCALSTORAGE
/* ============================================================= */ 
function metsDansPanier(panier){
    localStorage.setItem("panier", JSON.stringify(panier))
}

function rameneDuPanier(){
    let panier = localStorage.getItem("panier")
    if (panier == null){
     return panier = []
    }else{
    return JSON.parse(panier)
    }
}

function ajouterAuPanier(produit){

 let panier = rameneDuPanier()
 const nombreCanapeString  = document.getElementById("quantity").value
 const nombreCanape = parseInt(nombreCanapeString)

 let produitDansPanier = panier.find(p => produit.id == p.id)
 if (produitDansPanier != undefined){
    produitDansPanier.montant += nombreCanape
 }else{
   produit.montant = nombreCanape;
   panier.push(produit)
 }
 metsDansPanier(panier);
 window.location.href = "http://127.0.0.1:5501/html/cart.html"
 
}