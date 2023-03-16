async function fetchData(){
    fetch("http://localhost:3000/api/products")
    .then(response=>response.json())
    .then(produceList=> {  
        displayDatas(produceList)
    })
}

function displayDatas(produceList){
    console.log(produceList)
    // définir la section parent en js
    // boucler sur datas (ici appelé produceList)
    for(let i in produceList) {
        //création constante product
        const product = produceList[i];
        
                   
        // créer et imbriquer l'élément img
        const articleImg = document.querySelector(".item__img");
        const imageProduct = document.createElement("img");
        imageProduct.src = product.imageUrl;
        imageProduct.alt = product.altTxt;
        articleImg.appendChild(imageProduct);

        // créer le contenu : h1 Title
        const nameProduct = document.querySelector('#title');
        nameProduct.innerText = product.name;

        // créer le contenu : p span Price
        const priceProduct = document.querySelector('#price');
        priceProduct.innerText = product.price;

        // créer le contenu : p Description
        const descriptionProduct = document.querySelector('#description');
        descriptionProduct.innerText = product.description;
        
    }
}

async function main(){
   await fetchData()
}

main()