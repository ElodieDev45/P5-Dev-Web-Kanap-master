const urlApi = "http://localhost:3000/api/products";
var productsDataBase;
//récupération des données de l'API
async function fetchData(){
    fetch(urlApi)
    .then(response=>response.json())
    .then(datas=> {  
        productsDataBase = datas;
        console.table(productsDataBase);
        filterDatas(productsDataBase);
   })
}

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
    /*console.log(filteredCart)*/;
    displayData(filteredCart);
}

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
                    <p>${elementsCart.datasCart.price * elementsCart.qtyCart} € (prix unitaire ${elementsCart.datasCart.price}€)</p>
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
    console.log(sectionCartItems);

};

fetchData();