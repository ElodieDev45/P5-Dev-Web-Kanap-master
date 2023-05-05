function getOrderNumber(){
    //selection de l'élément html
    const orderIdElement = document.querySelector("#orderId");
    //affectattion du numéro de commande dcontenu dans l'url à orderIdElement
    orderIdElement.innerText = "\n" + "\n" + new URLSearchParams(window.location.search).get('order');
}

getOrderNumber();
