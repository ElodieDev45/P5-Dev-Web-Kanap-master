const urlApi = "http://localhost:3000/api/products";
var productsDataBase;
//récupération des données de l'API
async function fetchData(){
    fetch(urlApi)
    .then(response=>response.json())
    .then(datas=> {  
        productsDataBase = datas;
        console.log('productDataBase', productsDataBase);
        filterDatas(productsDataBase);
   })
}
//compilation des données du local Storage
function filterDatas(dataFromApi){
    let filteredCart = [];
    let dataFromStorage = /*If*/ localStorage.getItem('cart') /*alors*/ ? JSON.parse(localStorage.getItem('cart')) /*sinon*/: []; // ternaire
    // boucler sur dataFromApi
    for (const elementsApi of dataFromApi){
        /*console.log(elementsApi._id);*/
        // dans la boucle de dataFromApi, boucler sur dataFromStorage
        for (const elementsStorage of dataFromStorage){
            /*console.log(elementsStorage.id);*/
            // si l'id de ma boucle sur itemsFromsStorage == l'id de ma boucle sur dataFromApi
            if (elementsApi._id === elementsStorage.id) {
                // alors je créé un objet qui a pour propriétés :
                let objectCart = {
                    // un clé item qui aura toutes les infos du produit (que tu auras dans la boucle de dataFromApi)
                    datasCart: elementsApi,
                    // une clé qui contiendra la couleur selectionné (que tu auras dans la boucle dataFromStorage)
                    colorCart: elementsStorage.color,
                    // une clé qui contiendra la quantité selectionné (que tu auras dans la boucle dataFromStorage)
                    qtyCart: elementsStorage.quantity
                }
                /* console.log(objectCart)*/;
                // une fois que l'objet est créé, le push dans filteredCart
                filteredCart.push(objectCart);
            }
        }
    }
    // tu créé et appel une fonction displayData qui prend en parametre filteredCart
    console.log('filteredCart', filteredCart);
    displayData(filteredCart);
}

//fonction de création du DOM Panier
function displayData(cart){
    //Je récupère l'élèment parent de mon panier, ici la section #cart__items
    const sectionCartItems = document.querySelector("#cart__items");
    //je boucle sur les éléments contenus dans mon panier 
    for (const elementsCart of cart){
        // création du nouveau DOM pour le contenu du panier             
        const parser = new DOMParser(); /*https://developer.mozilla.org/fr/docs/Web/API/DOMParser*/
        
        //structure en texte avec références aux valeurs des éléments du panier        
        const cartItemsText =
        `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
            <div class="cart__item__img">
                <img src="${elementsCart.datasCart.imageUrl}" alt="${elementsCart.datasCart.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${elementsCart.datasCart.name}</h2>
                    <p>${elementsCart.colorCart}</p>
                    <p>${elementsCart.datasCart.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${elementsCart.qtyCart}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`
        //je transforme mon text en html
        const cartItemsHtml = parser.parseFromString(cartItemsText, "text/html");
        //j'assigne l'enfant au parent
        sectionCartItems.appendChild(cartItemsHtml.body.firstChild);

        /*chemins datas nécessaires :
        image src : elementsCart.datasCart.imageUrl;
        image alt : elementsCart.datasCart.altTxt;
        nom produit : elementsCart.datasCart.name;
        couleur produit : elementsCart.colorCart;
        prix produit unitaire : elementsCart.datasCart.price;
        qté produit : (inputQuantity.value) elementsCart.qtyCart;
        */
    };
    /*console.log(sectionCartItems)*/;
    displayTotals(cart);

    //déclaration de la function pour les évènements de modification du panier
    addEventsHandler(cart);

};

//function de calcul du total (prix et quantité)
function displayTotals(filteredCart){
    let totalPrice = 0;
    let totalQuantity = 0;

    //boucle sur le panier filtré pour calculer le prix total et la quantité par article
    filteredCart.forEach(itemCart => {
        totalQuantity += parseInt(itemCart.qtyCart);
        totalPrice += parseInt(itemCart.datasCart.price * itemCart.qtyCart);
    })
    //pousse la valeur de quantité dans l'élément html
    const containerQuantity = document.getElementById("totalQuantity");
    containerQuantity.innerHTML = totalQuantity;
    //pousse la valeur de Prix dans l'élément html
    const containerPrice = document.getElementById("totalPrice");
    containerPrice.innerHTML = totalPrice;

}

function updateLocalStorage(filteredCart){
    // création d'un nouvel objet lightCart contenant uniquement les 3 propriétés de base du Cart dans le localStorage
    let lightCart = filteredCart.map((element) =>{
        let lightElement = {
            color: element.colorCart,
            quantity: parseInt(element.qtyCart),
            id: element.datasCart._id 
        }
        return lightElement;
    })
    
    console.log('lightCart', lightCart);
    localStorage.setItem('cart',JSON.stringify(lightCart));
}

//function de modifications du panier
function addEventsHandler(filteredCart){
  
    //Bouton SUPPRIMER

    //création un tableau contenant tous les éléments de class 'deleteItem' 
    let deleteItemContainer = [...document.getElementsByClassName('deleteItem')];/*([...] = syntaxe de propagation 'spread operation')*/
    // console.log('deleteItemContainer', deleteItemContainer);
    let modifyItemContainer = [...document.getElementsByClassName('itemQuantity')];/*([...] = syntaxe de propagation 'spread operation')*/

    modifyItemContainer.forEach((item, index) => {
        item.addEventListener("change", function (event){
            const newQty = event.target.value
            filteredCart[index].qtyCart = newQty
            updateLocalStorage(filteredCart)
            //recalcul du total (sur filteredCart comme la fonction pour que le calcul soit immédiat au clic et non à l'actualisation de la page)
            displayTotals(filteredCart);
        })

    })


    //boucle sur chaque élément suivant l'index
    deleteItemContainer.forEach((item, index) => {
        item.addEventListener("click", function (){
            
            //suppression de l'élément cliqué dans le tableau deleteItemContainer
            deleteItemContainer.splice(index, 1);
            
            //Sélection et suppression de l'élément html (DOM) parent entier (article complet)
            let parentItem = item.closest('.cart__item');
            parentItem.remove();
            
            // suppression l'élément dans le tableau 'filteredCart' et 'lightCart'
            filteredCart.splice(index, 1);
            
            updateLocalStorage(filteredCart)
            //recalcul du total (sur filteredCart comme la fonction pour que le calcul soit immédiat au clic et non à l'actualisation de la page)
            displayTotals(filteredCart);
        })

    })

}



// récupérer la valeur des champs
const firstName = document.getElementById("firstName");
const firstNameError = document.getElementById("firstNameErrorMsg");
const lastName = document.getElementById("lastName");
const lastNameError = document.getElementById("lastNameErrorMsg");
const address = document.getElementById("address");
const addressError = document.getElementById("addressErrorMsg");
const city = document.getElementById("city");
const cityError = document.getElementById("cityErrorMsg");
const email = document.getElementById("email");
const emailError = document.getElementById("emailErrorMsg");

// utiliser un gestionnaire d'evennnement pour le bouton valider
const boutonCommande = document.querySelector("#order");
// utiliser un gestionnaire d'evennnement pour le bouton valider
boutonCommande.addEventListener("click", function (event){
    // neutraliser le comportement par défaut du formulaire
    event.preventDefault();

    // initialiser une variable isError a false
    let isError = false;

    // récupérer la valeur des champs
    const contactObject = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    }
    console.log('contact Object', contactObject);

    // utiliser des regex appropriés pour controller les format des champs
    // => format email (pour le champ email)
    let regexEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/; //1er groupe ne contient pas @ ni d'espace puis arobase et second groupe avant le point ne contient pas @ ni d'espace puis point et dernier groupe ne contient pas @ ni d'espace
    // => vérifier que le champ n'est pas vide
    let regexNotEmpty = /^.+$/;
    // => vérifier que le champ name ne soit pas un nombre
    let regexNotNumber = /^\D*$/;

    // si il y a une erreur sur un des champs, faire afficher un message d'erreur en dessous du champ
    if(!regexNotEmpty.test(contactObject.firstName)){
        firstNameError.innerText = "* Merci de renseigner ce champ";
        isError = true;
    }else{//pour vider le champ erreur en cas de resaisie correcte
        firstNameError.innerText = "";
    }

    if(!regexNotEmpty.test(contactObject.address)){
        addressError.innerText = "* Merci de renseigner ce champ";
        isError = true;
    }else{
        addressError.innerText = "";
    }

    if(!regexNotEmpty.test(contactObject.city)){
        cityError.innerText = "* Merci de renseigner ce champ";
        isError = true;
    }else{
        cityError.innerText = "";
    }

    if(!regexNotNumber.test(contactObject.lastName) || !regexNotEmpty.test(contactObject.lastName)){
        lastNameError.innerText = "Champ vide ou invalide, merci de vérifier votre saisie";
        isError = true;
    }else{
        lastNameError.innerText = "";
    }
    
    if(!regexEmail.test(contactObject.email)){
        emailError.innerText = "adresse email invalide, merci de vérifier votre saisie";
        isError = true;
    }else{
        emailError.innerText = "";
    }
    // Ensuite on créé une conditionnelle : si isError === false alors on fait le reste du traitement
    if (!isError){ /*s'il n'y a pas d'erreur*/
    // Créer un objet JSON (voir format donné dans les spec techniques)
    const contact = JSON.stringify(contactObject);  //ajouter le local storage

    // Envoyer ce JSON a l'API avec le fetch MAIS en protocol POST
    // dans le then de la réponse récupérer l'orderid de la commande renvoyé par le back
    // un vide le localstorage
    // on fait une redirection vers la page confirmation avec dans l'url l'orderId qu'on a récupéré
    // on récupère cet id et on le fait affiché sur la page confirmation
    console.log('contact', contact);
    }
})



fetchData();
