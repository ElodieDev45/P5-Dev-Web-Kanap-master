//_________ récupération des données de l'API _________
const urlApi = "http://localhost:3000/api/products";
var productsDataBase;

async function fetchData(){
    fetch(urlApi)
    .then(response=>response.json())
    .then(datas=> {  
        productsDataBase = datas;
        // console.log('productDataBase', productsDataBase);
        filterDatas(productsDataBase);
   })
}
//_________ compilation des données du local Storage _________
function filterDatas(dataFromApi){
    let filteredCart = [];
    let dataFromStorage = /*If*/ localStorage.getItem('cart') /*alors*/ ? JSON.parse(localStorage.getItem('cart')) /*sinon*/: []; // ternaire
    // boucler sur dataFromApi
    for (const elementsApi of dataFromApi){
        // dans la boucle de dataFromApi, boucler sur dataFromStorage
        for (const elementsStorage of dataFromStorage){
            // si l'id de ma boucle sur itemsFromsStorage == l'id de ma boucle sur dataFromApi
            if (elementsApi._id === elementsStorage.id) {
                // alors je créé un objet qui a pour propriétés :
                let objectCart = {
                    // clé item de toutes les infos du produit (dans boucle dataFromApi)
                    datasCart: elementsApi,
                    // clé de la couleur selectionnée (dans boucle dataFromStorage)
                    colorCart: elementsStorage.color,
                    // clé de la quantité selectionnée (dans boucle dataFromStorage)
                    qtyCart: elementsStorage.quantity
                }
                // push de l'objet "objectCart" dans le tableau "filteredCart"
                filteredCart.push(objectCart);
            }
        }
    }
    // déclaration/appel fonction displayData avec parametres filteredCart pour creation du DOM
    console.log('filteredCart', filteredCart);
    displayData(filteredCart);
}

//_________ création du DOM Panier _________
function displayData(cart){
    //récupération élèment parent du panier (ici la section #cart__items)
    const sectionCartItems = document.querySelector("#cart__items");
    //boucle sur les éléments du panier "cart"
    for (const elementsCart of cart){
        const parser = new DOMParser(); /*https://developer.mozilla.org/fr/docs/Web/API/DOMParser*/
        //création du nouveau DOM pour le contenu du panier (suivant le html)            
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
        //parsing (analyse et transformation du text en html)
        const cartItemsHtml = parser.parseFromString(cartItemsText, "text/html");
        //assignement enfant au parent
        sectionCartItems.appendChild(cartItemsHtml.body.firstChild);
    };
    //déclaration function calcul prix total panier
    displayTotals(cart);
    //déclaration function évènements modifications panier
    addEventsHandler(cart);
};

//_________ modifications du panier _________
function addEventsHandler(filteredCart){
    //création tableau de tous les éléments de class 'itemQuantity' 
    let modifyItemContainer = [...document.getElementsByClassName('itemQuantity')];/*([...] = syntaxe de propagation 'spread operation')*/
    //création tableau de tous les éléments de class 'deleteItem' 
    let deleteItemContainer = [...document.getElementsByClassName('deleteItem')];/*([...] = syntaxe de propagation 'spread operation')*/
    
    //-------- modification quantité --------
    modifyItemContainer.forEach((item, index) => {
        item.addEventListener("change", function (event){
            const newQty = event.target.value
            filteredCart[index].qtyCart = newQty
            updateLocalStorage(filteredCart)
            //recalcul du total (sur filteredCart comme la fonction pour que le calcul soit immédiat au clic et non à l'actualisation de la page)
            displayTotals(filteredCart);
        })
    })
    
    //-------- Bouton SUPPRIMER --------
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

//_________ calcul du total panier (prix et quantité) _________
function displayTotals(filteredCart){
    let totalPrice = 0;
    let totalQuantity = 0;
    //boucle sur panier filtré calcule prix total et quantité par article
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

//_________ mise à jour du Local Storage _________
function updateLocalStorage(filteredCart){
    // création nouvel objet "lightCart" contenant uniquement les 3 propriétés de base du Cart dans le localStorage (id, couleur, qté)
    let lightCart = filteredCart.map((element) =>{
        let lightElement = {
            color: element.colorCart,
            quantity: parseInt(element.qtyCart),
            id: element.datasCart._id 
        }
        return lightElement;
    })
    console.log('lightCart', lightCart);
    //enregistrement en JSON du nouveau fichier cart dans le local Storage
    localStorage.setItem('cart',JSON.stringify(lightCart));
}

//_________ traitement du formulaire _________
//----- récupération de la valeur des champs -----
function contactValues(){
    //éléments html
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const address = document.getElementById("address");
    const city = document.getElementById("city");
    const email = document.getElementById("email");
    // récupérer la valeur des champs
    const contactObject = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    }
    return contactObject;
}
//----- vérification de saisie -----
function checkFormulaire(contactObject){
    //éléments html de message d'erreur
    const firstNameError = document.getElementById("firstNameErrorMsg");
    const lastNameError = document.getElementById("lastNameErrorMsg");
    const addressError = document.getElementById("addressErrorMsg");
    const cityError = document.getElementById("cityErrorMsg");
    const emailError = document.getElementById("emailErrorMsg");
    // initialiser variable isError a false
    let isError = false;
    // ----- Regex -----
    // format email (pour le champ email)
    let regexEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/; //1er groupe ne contient pas @ ni d'espace puis arobase et second groupe avant le point ne contient pas @ ni d'espace puis point et dernier groupe ne contient pas @ ni d'espace
    // le champ contient au moins 2 caractères (écriture pour "non vide" : /^.+$/)
    let regexTwoCaract = /^.{2,}$/;
    // le champ contient au moins 3 caractères
    let regexThreeCaract = /^.{3,}$/;    
    // le champ name n'est pas un nombre
    let regexNotNumber = /^\D*$/;
    //----- conditions de vérification -----
    // si il y a une erreur sur un des champs, faire afficher un message d'erreur en dessous du champ
    if(!regexTwoCaract.test(contactObject.firstName)){
        firstNameError.innerText = "* Merci de renseigner ce champ";
        isError = true;
    }else{//pour vider le champ erreur en cas de resaisie correcte
        firstNameError.innerText = "";
    }

    if(!regexThreeCaract.test(contactObject.address)){
        addressError.innerText = "* Merci de renseigner ce champ";
        isError = true;
    }else{
        addressError.innerText = "";
    }

    if(!regexThreeCaract.test(contactObject.city)){
        cityError.innerText = "* Merci de renseigner ce champ";
        isError = true;
    }else{
        cityError.innerText = "";
    }

    if(!regexNotNumber.test(contactObject.lastName) || !regexTwoCaract.test(contactObject.lastName)){
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

    return isError;
}

//_________ Bouton Commander _________
// séléction du html du bouton
const boutonCommande = document.querySelector("#order");
// gestionnaire d'évennement sur le bouton commander
boutonCommande.addEventListener("click", function (event){
    //----- formulaire ------
    // neutralisation du comportement par défaut
    event.preventDefault();
    //récupération données (cf function)
    let contactObject = contactValues(); 
    //vérification de la saisie (cf function)
    let isError = checkFormulaire(contactObject);

    //console.log("test",isError);
    // conditionnelle : si isError === false alors reste du traitement
    if (!isError){ /*s'il n'y a pas d'erreur*/
        // récupérer le localstorage 
        const cart = JSON.parse(localStorage.getItem('cart'));
        // Création objet contact (incluant contactObject et ID des articles du panier "cart")
        const contact = {
            contact: contactObject,
            products: [...cart.map(product => product.id)]
        };
        // console.log( typeof cart)
        // console.log('contact',contact)
        
        //envoi des informations de la commande à l'API pour retour du n° de commande
        fetch("http://localhost:3000/api/products/order", {
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST", 
            //transformation de contact en JSON
            body: JSON.stringify(contact)
        })
        .then (response => response.json())
        .then (order => {
            console.log('order', order);
            // récupération de l'orderid de la commande renvoyé par le back
            let orderId = order.orderId;
            // console.log(orderId);
            // on fait une redirection vers la page confirmation avec dans l'url l'orderId qu'on a récupéré (comme page product)
            const cartUrl = window.location.href;
            const urlConfirmationOrder = cartUrl.replace(`cart.html`, `confirmation.html?order=${orderId}`);
            // console.log(cartUrl);
            // console.log(urlConfirmationOrder);

            //redirection vers la page de confirmation de commande
            window.location.href = urlConfirmationOrder;

            // vide le localstorage
            localStorage.clear();

            // on récupère cet id et on le fait afficher sur la page confirmation
            //voir page confirmation.js
        })
        .catch (error=>console.log(error));
    }
})


fetchData();
