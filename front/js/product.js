//récupération de l'ID du produit de la page
const paramsId = new URLSearchParams(window.location.search).get('id');
const apiProduct = "http://localhost:3000/api/products/" + paramsId;
console.log(apiProduct);

//récupération données de l'API
async function fetchData(){
    fetch(apiProduct)
    .then(response=>response.json())
    .then(productDetails=> {  
        displayDatas(productDetails)
    })
}
//import des données de la page d'accueil
function displayDatas(productDetails){
    console.table(productDetails);
    // création et imbrication l'élément img
    const articleImg = document.querySelector(".item__img");
    const imageProduct = document.createElement("img");
    imageProduct.src = productDetails.imageUrl;
    imageProduct.alt = productDetails.altTxt;
    articleImg.appendChild(imageProduct);
    // import du nom de la page dans balise title
    const namePage = document.querySelector('Title');
    namePage.innerHTML = "Kanap : " + productDetails.name + " " + productDetails.colors;
    // import du contenu : h1 Title
    const nameProduct = document.querySelector('#title');
    nameProduct.innerHTML = productDetails.name;
    // import du contenu : p span Price
    const priceProduct = document.querySelector('#price');
    priceProduct.innerHTML = productDetails.price;
    // import du contenu : p Description
    const descriptionProduct = document.querySelector('#description');
    descriptionProduct.innerHTML = productDetails.description;
    // création et imbrication de plusieurs éléments option avec boucle
    const colorsList = productDetails.colors;
    console.log(colorsList);
    for(let i in colorsList){
        const productColor = colorsList[i];
        const selectColor = document.querySelector("#colors");
        const colorOption = document.createElement("option");
        colorOption.innerHTML = productColor;
        selectColor.appendChild(colorOption);
    }
}
// //export des données pour le panier
// //Bouton Panier
// const boutonPanier = document.querySelector("#addToCart");
// //actions de clic sur boutonPanier
// boutonPanier.addEventListener("click", function (){
// })

    // récupérer la valeur de la couleur choisi
    // récupéler la valeur de la quantité sélectionné
    // SI ils sont vides on affiche un message d'alerte
    // plus rien ne se passe apres
    // SI les 2 valeurs sont bien sélectionnées
    // alors on fait le reste du traitement
    // on vérifie l'existence d'un panier présent dans le localstorage
    // si il existe on récupère sa valeur et on stock cette valeur dans une cariable de type tableau
    // qu'on nommera cart par exemple
    // sinon on créé la variable avec pour valeur un tableau vide

    // on parcours le tableau (ou on utilise la méthode .find) pour vérifier
    // si on trouve dans celui-ci un produit ayant la meme id et meme couleur que celui qu'on a sélectionné
    // SI IL N'EXISTE PAS
    // on créé un object JS qui va comprendre les propriétés
    // (id, couleur choisi, quantité selectionné)
    // on le rajoute dans le tableau
    // SI LE PRODUIT EXISTE (meme id et meme couleur)
    // on incrémente simplement la quantité du produit dans le tableau
    // on enregistre la variable tableau dans le localstorage
    // (on redirige ou non vers la page caddie)


async function main(){
   await fetchData()
}

main()