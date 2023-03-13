async function fetchData(){
    fetch("http://localhost:3000/api/products")
    .then(response=>response.json())
    .then(datas=> {  
        displayDatas(datas)
    })
}

function displayDatas(datas){
    console.log(datas)
    // définir la section parent en js
    // boucler sur datas
    datas.forEach(element => {
        console.log('element', element)
        // créer l'élément a
        // créer l'élément article
        // créer l'élément img
        // créer l'élément h3
        // créer l'élément p
        // hydrater les différents attributs des balises avec les datas de la ligne en cours
        // imbriquer les éléments a l'élément article
        // imbriquer l'élément article a l'élément parent
        // console.log(element.price)
        
    });
}

async function main(){
   await fetchData()
}

main()