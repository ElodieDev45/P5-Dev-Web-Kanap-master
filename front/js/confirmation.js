//selection de l'élément html
const orderIdElement = document.querySelector("#orderId");
//récupération du numéro de commande dans l'url
orderIdElement.innerText = "\n" + "\n" + new URLSearchParams(window.location.search).get('order');
