//________ récupération de l'ID du produit de la page ________
const paramsId = new URLSearchParams(window.location.search).get('id');
console.log('id article :',paramsId);
const apiProduct = `http://localhost:3000/api/products/${paramsId}`;

//________ récupération données de l'API ________
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
    // création liste de couleur avec boucle et import dans le DOM
    let colorsList = productDetails.colors;
    for(let i in colorsList){
        let productColor = colorsList[i];
        let selectColor = document.querySelector("#colors");
        let colorOption = document.createElement("option");
        colorOption.innerText = productColor;
        colorOption.setAttribute("value",productColor);
        selectColor.appendChild(colorOption);
    }
})
//________ Bouton "Ajouter au panier" (export des données)________
const boutonPanier = document.querySelector("#addToCart");
//événement de clic sur boutonPanier
boutonPanier.addEventListener("click", function (){
    const selectedColor = document.querySelector("#colors").value;
    const selectedQuantity = document.querySelector(`#quantity`).value;
    //creation constante erreur
    let isError = false;
    // SI couleur est vide : message d'alerte
    if (selectedColor === '') {
        isError = true;
        return alert(`Merci de sélectionner la couleur désirée`);
    }
    // SI quantité est a 0 : message d'alerte
    if (parseInt(selectedQuantity) < 1 || selectedQuantity === '') {
        isError = true;
        return alert(`Veuillez sélectionner votre quantité`);
    }
    if (!isError){ /*s'il n'y a pas d'erreur*/
        // 1- Verification de la présence du tableau 'cart' dans le localstorage création du tableau 'cart' vide
        let cart = /*If*/ localStorage.getItem('cart') /*alors*/ ? JSON.parse(localStorage.getItem('cart')) /*sinon*/: []; // ternaire
        // 2- creation objet cartItem du tableau Cart (d'après données de page récupérée pour le panier).
        const cartItem = {
            color: selectedColor,
            quantity: parseInt(selectedQuantity),
            id: paramsId
        }
        let isInCart = false;
        // Boucle sur le tableau (ou on utilise la méthode .find) pour vérifier
        cart.forEach((item,index) => {
            // si produit EXISTE dans le tableau avec la meme id et meme couleur
            if (item.id === paramsId && item.color === selectedColor) {
                // Incrémentation de la quantité du produit dans le tableau
                cart[index].quantity += parseInt(selectedQuantity);
                isInCart = true
            }
        });
        // SI IL N'EXISTE PAS dans le tableau
        // Ajout du produit complet au tableau
        if(!isInCart){
            cart.push(cartItem);
        }
        localStorage.setItem('cart',JSON.stringify(cart))
        // (redirection vers la page caddie)
        window.alert(`Votre article à bien été ajouté à votre panier : \n couleur : ${cartItem.color} \n quantité : ${cartItem.quantity}`);
    }
})