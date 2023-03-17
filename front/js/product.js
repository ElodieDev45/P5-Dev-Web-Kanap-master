//récupération de l'ID du produit de la page
const paramsId = new URLSearchParams(window.location.search).get('id');
console.log(paramsId);
//récupération données de l'API
async function fetchData(){
    fetch("http://localhost:3000/api/products/" + paramsId)
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
    namePage.innerText = "Kanap : " + productDetails.name + " " + productDetails.colors;
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
    const colorsList = productDetails.colors;
    console.log(colorsList);
    for(let i in colorsList){
        const productColor = colorsList[i];
        const selectColor = document.querySelector("#colors");
        const colorOption = document.createElement("option");
        colorOption.innerText = productColor;
        selectColor.appendChild(colorOption);
    }
}

//export des données pour le panier
//Bouton Panier
const boutonPanier = document.querySelector("#addToCart");
//actions de clic sur boutonPanier
boutonPanier.addEventListener("click", function (){
    
})


async function main(){
   await fetchData()
}

main()