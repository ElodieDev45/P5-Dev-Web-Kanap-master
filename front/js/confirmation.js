const orderElement = document.querySelector("#orderId");
orderElement.innerText = new URLSearchParams(window.location.search).get('order');
