//récupération de l'ID du produit de la page
const paramsId = new URLSearchParams(window.location.search).get('id');
console.log(paramsId);
const apiProduct = "http://localhost:3000/api/products/" + paramsId;
console.log(apiProduct);

//récupération données de l'API
// async function fetchData(){
fetch(apiProduct)
.then(response=>response.json())
.then(productDetails=> {  
    // displayDatas(productDetails)
    console.table(productDetails);
    // création et imbrication l'élément img
    const articleImg = document.querySelector(".item__img");
    const imageProduct = document.createElement("img");
    imageProduct.src = productDetails.imageUrl;
    imageProduct.alt = productDetails.altTxt;
    articleImg.appendChild(imageProduct);
    // import du nom de la page dans balise title
    const namePage = document.querySelector('Title');
    namePage.innerText = `Kanap : ${productDetails.name} ${productDetails.colors}`;
    // import du contenu : h1 Title
    const nameProduct = document.querySelector('#title');
    nameProduct.innerText = productDetails.name;
    // import du contenu : p span Price
    const priceProduct = document.querySelector('#price');
    priceProduct.innerText = productDetails.price;
    // import du contenu : p Description
    const descriptionProduct = document.querySelector('#description');
    descriptionProduct.innerText = productDetails.description;
    // création et imbrication de plusieurs éléments option avec boucle
    let colorsList = productDetails.colors;
    console.log(colorsList);
    for(let i in colorsList){
        let productColor = colorsList[i];
        let selectColor = document.querySelector("#colors");
        let colorOption = document.createElement("option");
        colorOption.innerText = productColor;
        colorOption.setAttribute("value",productColor);
        selectColor.appendChild(colorOption);
    }
})

// //export des données pour le panier
//Bouton Panier
const boutonPanier = document.querySelector("#addToCart");
//actions de clic sur boutonPanier
boutonPanier.addEventListener("click", function (){
    let isError = false;
    const selectedColor = document.querySelector("#colors").value;
    const selectedQuantity = document.querySelector(`#quantity`).value;
    if (selectedColor === '') {
        isError = true;
        // SI ils sont vides on affiche un message d'alerte
        console.log('error color')
    }
    if (parseInt(selectedQuantity) ===  0) {
        isError = true;
        console.log('error qte')
    }

    if (!isError){
        // je fais le reste du traitement
        console.log('reste du traitement')
        // on vérifie l'existence d'un panier présent dans le localstorage
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []; // ternaire
        const cartItem = {
            color: selectedColor,
            quantity: parseInt(selectedQuantity),
            id: paramsId
        }
        
        // rajout de la valeur dans le tableau
        cart.push(cartItem) // OK mais sous CONDITIONS (si le canapé n'existe pas dans le localstorage)

        // on parcours le tableau (ou on utilise la méthode .find) pour vérifier
        // si on trouve dans celui-ci un produit ayant la meme id et meme couleur que celui qu'on a sélectionné
        // SI IL N'EXISTE PAS
        // cart.push(cartItem)
        // SI LE PRODUIT EXISTE (meme id et meme couleur)
        // on incrémente simplement la quantité du produit dans le tableau
    
        localStorage.setItem('cart',JSON.stringify(cart))
        // (on redirige ou non vers la page caddie)
    }
    
})
    


// plus rien ne se passe apres





    
    

    
    // async function main(){
        //    await fetchData()
        // }
        
// main()