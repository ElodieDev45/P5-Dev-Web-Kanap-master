//________ récupération de l'ID du produit de la page ________
const paramsId = new URLSearchParams(window.location.search).get('id');
console.log(paramsId);
const apiProduct = "http://localhost:3000/api/products/" + paramsId;
console.log(apiProduct);

//________ récupération données de l'API ________
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

//________ Bouton Panier (export des données)________
const boutonPanier = document.querySelector("#addToCart");
//actions de clic sur boutonPanier
boutonPanier.addEventListener("click", function (){
    const selectedColor = document.querySelector("#colors").value;
    const selectedQuantity = document.querySelector(`#quantity`).value;
    //creation constante erreur
    let isError = false;

    // SI couleur est vide on affiche un message d'alerte
    if (selectedColor === '') {
        isError = true;
        return alert(`Merci de sélectionner la couleur désirée`);
        // console.log('error color');
    }
    // SI quantité est a 0 on affiche un message d'alerte
    if (parseInt(selectedQuantity) ===  0) {
        isError = true;
        return alert(`Veuillez sélectionner votre quantité`);
        // console.log('error qte');
    }
    if (!isError){ /*s'il n'y a pas d'erreur*/
        // je fais le reste du traitement
        console.log('reste du traitement')
        // 1- on vérifie l'existence d'un tableau de données présent dans le localstorage ici appelé "cart" sinon on crée un tableau 'cart' vide
        let cart = /*If*/ localStorage.getItem('cart') /*alors*/ ? JSON.parse(localStorage.getItem('cart')) /*sinon*/: []; // ternaire
        // 2- creation de l'objet cartItem du tableau Cart d'après les données de la page à récupérer pour le panier.
        const cartItem = {
            color: selectedColor,
            quantity: parseInt(selectedQuantity),
            id: paramsId
        }
        
        let isInCart = false;
        
        // on parcours (boucle) le tableau (ou on utilise la méthode .find) pour vérifier
        cart.forEach((item,index) => {
            // si le produit sélectionné EXISTE dans le tableau avec la meme id et meme couleur
            if (item.id === paramsId && item.color === selectedColor) {
                // on incrémente (ajoute) simplement la quantité du produit dans le tableau
                cart[index].quantity += parseInt(selectedQuantity);
                isInCart = true
            }
        });
    
        // SI IL N'EXISTE PAS dans le tableau
        // on rajoute le produit complet dans le tableau
        if(!isInCart){
            cart.push(cartItem);
        }
    
        localStorage.setItem('cart',JSON.stringify(cart))
        // (on redirige ou non vers la page caddie)

        return alert(`Votre article à bien été ajouté à votre panier : \n couleur : ${cartItem.color} \n quantité : ${cartItem.quantity}`);
    }
})