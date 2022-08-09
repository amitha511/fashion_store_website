"use strict";

// const { Router } = require("express");

// let result = prompt('Enter ur id and ur age', 'id,age');

let navLinks = document.getElementById("navLinks");

function showMenu() {
    navLinks.style.right = "0";
}
function hideMenu() {
    navLinks.style.right = "-200px";
}

// import dashboard from "./dashboard";

// const navigateTo = url => {
//     history.pushState(null, null, url);
//     router();
// };

// const router = async () => {
//     const routes = [
//         { path: "/", view: dashboard }, // () => console.log("Viewing Home")},
//         // {   path: "/catalog", view: () => console.log("Viewing Catalog")},
//         // {   path: "/cart", view: () => console.log("Viewing Cart")},
//     ];

//     const potentialMatches = routes.map(route => {
//         return {
//             route: route,
//             isMatch: location.pathname === route.path
//         };
//     });

//     let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

//     if (!match) {
//         match = {
//             route: routes[0],
//             isMatch: true
//         };
//     }

//     const view = new match.route.view();

//     document.querySelector("#app").innerHTML = await view.getHtml();

//     console.log(match.route.view());
// };

// window.addEventListener("popstate", router);

// document.addEventListener("DOMContentLoaded", () => {
//     document.body.addEventListener("click", e => {
//         if (e.targer.matches("[data-link]")) {
//             e.preventDefault();
//             navigateTo(e.target.href);
//         }
//     })
//     Router();
// });

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
    cart.classList.add("active");
};

closeCart.onclick = () => {
    cart.classList.remove("active");
}

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removCartButtons);
    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    let quantityInputs = document.getElementsByClassName("cart-quantity");
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    let addCart = document.getElementsByClassName("add-cart");
    for (let i = 0; i < addCart.length; i++) {
        let button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

function buyButtonClicked() {
    alert("Your Order is placed");
    let cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

function addCartClicked(event) {
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    let price = shopProducts.getElementsByClassName("price")[0].innerText;
    let productImg = shopProducts.getElementsByClassName("price")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg) {
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    let cartItems = document.getElementsByClassName("cart-content")[0];
    let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (let i = 0; i < cartItemsNames.length; i++) {
        alert("You have already add this item to cart");
        return;
    }
}

// var cartBoxContent = "
//     < img src = "${productImg}" alt = "" class="cart-img" >
//                       <div class="detail-box">
//                       <div class="cart-product-title">${title}</div>
//                       <div class="cart-price">${price}</div>
//                       <input type="number" value="1" class="cart-quantity">
//                       </div>
//                       <i class="bx bxs-trash-alt cart-remove"></i>";

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);

function updatetotal() {
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartBoxes = cartContent.getElementsByClassName("cart-box");
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName("cart-price")[0];
        let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        let price = parseFloat(priceElement.innerText.replace("$"), "");
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}

function initMap() {
    // map options.
    let options = {
        zoom: 13,
        center: { lat: 31.969896, lng: 34.772101 }
    }
    //New map
    let map = new google.maps.Map(document.getElementById('map'), options);

    AddMarker({
        coords: { lat: 31.969896, lng: 34.772101 },
        map: map,
        text: ["<h2 class='text-center'>הסניף שלנו</h2>", "<div class='text-center'>..</div>"]
    }, map);
}

function AddMarker(mapArgument, map) {
    let marker = new google.maps.Marker({
        position: mapArgument.coords,
        map: mapArgument.map,
        icon: mapArgument.icon,
    });
    let infoWindow = new google.maps.InfoWindow({
        content: mapArgument.text[0] + mapArgument.text[1]
    });
    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    });
}
// document.querySelector('#search-input').addEventListener('input', filterList);

// function filterList() {
//     const searchInput = document.querySelector('#search-input');
//     const filter = searchInput.value.toLowerCase();
//     const listItems = document.querySelectorAll('.list-group-item');

//     listItems.forEach((item) => {
//         let text = item.textContent;
//         if (text.toLowerCase().includes(filter.toLowerCase())) {
//             item.style.display = '';
//         } else {
//             item.style.display = 'none';
//         }
//     });
// }
