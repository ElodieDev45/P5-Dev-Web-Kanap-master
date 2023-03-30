const urlApi = "http://localhost:3000/api/products";
var productsDataBase;
//récupération des données de l'API
async function fetchData(){
    fetch(urlApi)
    .then(response=>response.json())
    .then(datas=> {  
        productsDataBase = datas;
        console.log(productsDataBase);
        filterDatas(productsDataBase);
   })
}

function filterDatas(dataFromApi){
    let filteredCart = [];
    let dataFromStorage = /*If*/ localStorage.getItem('cart') /*alors*/ ? JSON.parse(localStorage.getItem('cart')) /*sinon*/: []; // ternaire
    // boucler sur dataFromApi
    // dans la boucle de dataFromApi
        // boucler sur dataFromStorage
        // si l'id de ma boucle sur itemsFromsStorage == l'id de ma boucle sur dataFromApi
        // alors je créé un objet qui a pour propriétés :
        // un clé item qui aura toutes les infos du produit (que tu auras dans la boucle de dataFromApi)
        // une clé qui contiendra la quantité selectionné (que tu auras dans la boucle dataFromStorage)
        // une clé qui contiendra la couleur selectionné (que tu auras dans la boucle dataFromStorage)
        // une fois que l'objet est créé, le push dans filteredCart
        // tu créé et appel une fonction displayData qui prend en parametre filteredCart
        

}

fetchData();



// // définition de la section parent "cart__items"
// const sectionCartItems = document.querySelector("#cart__items");

// //création article parent
// const articleCartItem = document.createElement("article");
// articleCartItem.setAttribute("class","cart__item");
// articleCartItem.setAttribute("data-id","{product-ID}");
// articleCartItem.setAttribute("data-color","{product-color}");

// //création Parent groupe "img"
// const imageItem = document.createElement("div");
// imageItem.setAttribute("class","cart__item__img");
//             // création Elements groupe "img""
//             const imageProduct = document.createElement("img");
//             imageProduct.src = "/back/images/kanap01.jpeg";
//             imageProduct.alt = "";


// //création balise Parent groupe "content"
// const contentItem = document.createElement("div");
// contentItem.setAttribute("class","cart__item__content");

//     //création balise Parent sous-groupe "Description"
//     const descriptionContent = document.createElement("div");
//     descriptionContent.setAttribute("class","cart__item__content__description");
//     // création Elements "tittlePrice"
//     const nameProduct = document.createElement("h2");
//     nameProduct.innerText = "test";
//     const colorOption = document.createElement("p");
//     colorOption.innerText = "test";
//     const priceProduct = document.createElement("p");
//     priceProduct.innerText = "test";

//     //imbrication sous-groupe "tittlePrice"
//     descriptionContent.appendChild(nameProduct);
//     descriptionContent.appendChild(colorOption);
//     descriptionContent.appendChild(priceProduct);


//     //création balise Parent sous-groupe "settings"
//     const settingsContent = document.createElement("div");
//     settingsContent.setAttribute("class","cart__item__content__settings");

//         //création balise sous-Ensemble "Quantity"
//         const quantitySettings = document.createElement("div");
//         quantitySettings.setAttribute("class","cart__item__content__settings__quantity");
//             // création Elements "Quantity"
//             const textQuantity = document.createElement("p");
//             textQuantity.innerText = "Qté :";
//             const inputQuantity = document.createElement("input");
//             inputQuantity.setAttribute("class","itemQuantity");
//             inputQuantity.setAttribute("type","number");
//             inputQuantity.setAttribute("name","itemQuantity");
//             inputQuantity.setAttribute("min","1");
//             inputQuantity.setAttribute("max","100");
//             inputQuantity.value = "";
//         //imbrication sous-ensemble "Quantity"
//         quantitySettings.appendChild(textQuantity);
//         quantitySettings.appendChild(inputQuantity);

//         //création balise sous-Ensemble "Delete"
//         const deleteSettings = document.createElement("div");
//         deleteSettings.setAttribute("class","cart__item__content__settings__delete");
//             // création Elements "Quantity"
//             const deleteItem = document.createElement("p");
//             deleteItem.setAttribute("class","deleteItem");
//             deleteItem.innerText = "Supprimer";
//         //imbrication sous-ensemble "Delete"
//         deleteSettings.appendChild(deleteItem);

//     //enfants sous-groupe "settings"
//     settingsContent.appendChild(quantitySettings);
//     settingsContent.appendChild(deleteSettings);

// //enfants groupes "img" et "content"
// imageItem.appendChild(imageProduct);
// contentItem.appendChild(descriptionContent);
// contentItem.appendChild(settingsContent);

// //enfants article
// articleCartItem.appendChild(imageItem);
// articleCartItem.appendChild(contentItem);

// //Enfants du Parent principal SECTION
// sectionCartItems.appendChild(articleCartItem);
