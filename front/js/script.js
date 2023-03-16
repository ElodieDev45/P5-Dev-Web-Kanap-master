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
    const sectionItems = document.querySelector(".items");
    // boucler sur datas (ici renommé produceList)
    //ecriture du vendredi 10 par Gregory mais me faisais boucler 8 fois sur la totalité de la liste donc 64 articles.
    //voir avec Gregory pourquoi et comment rectifier si obligée d'utiliser cette synthaxe ci (si oui entourait les éléments)
    // produceList.forEach(product => {
    //     console.log('product', product)
        for(let i in produceList) {
            //création constante product
            const product = produceList[i];
            
            
            //elements
            // créer l'élément a
            const elementA = document.createElement("a");
            elementA.href = "./product.html";
            // créer l'élément article
            const elementArticle = document.createElement("article");
            // créer l'élément img
            const imageProduct = document.createElement("img");
            imageProduct.src = product.imageUrl;
            imageProduct.alt = product.altTxt;
            // créer l'élément h3
            const nameProduct = document.createElement("h3");
            nameProduct.innerText = product.name;
            // créer l'élément p
            const descriptionProduct = document.createElement("p");
            descriptionProduct.innerText = product.description;
            // imbriquer les éléments a l'élément article
            elementArticle.appendChild(imageProduct);
            elementArticle.appendChild(nameProduct);
            elementArticle.appendChild(descriptionProduct);
            // imbriquer l'élément article a l'élément parent
            elementA.appendChild(elementArticle);
            sectionItems.appendChild(elementA)
            // console.log(element.price)
        }
    // });
}

async function main(){
   await fetchData()
}

main()