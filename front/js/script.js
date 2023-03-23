const urlApi = "http://localhost:3000/api/products";
//récupération des données de l'API
async function fetchData(){
    fetch(urlApi)
    .then(response=>response.json())
    .then(productsList=> {  
        displayDatas(productsList)
    })
}

function displayDatas(productsList){
    console.log(productsList)
    // définition de la section parent
    const sectionItems = document.querySelector("#items");

    productsList.forEach(product => {
        // création de l'élément a
        const elementA = document.createElement("a");
        elementA.href = "./product.html?id=" + product._id;
        // création de l'élément article
        const elementArticle = document.createElement("article");
        // création de l'élément img
        const imageProduct = document.createElement("img");
        imageProduct.src = product.imageUrl;
        imageProduct.alt = product.altTxt;
        // création de l'élément h3
        const nameProduct = document.createElement("h3");
        nameProduct.innerText = product.name;
        // création de l'élément p
        const descriptionProduct = document.createElement("p");
        descriptionProduct.innerText = product.description;
        // imbrication des éléments à l'élément article
        elementArticle.appendChild(imageProduct);
        elementArticle.appendChild(nameProduct);
        elementArticle.appendChild(descriptionProduct);
        // imbrication de l'élément article à l'élément parent
        elementA.appendChild(elementArticle);
        sectionItems.appendChild(elementA)
    });

}

async function main(){
    await fetchData()
}
main()