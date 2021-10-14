const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navMenu = document.getElementById("nav-menu");
const cartIcon = document.getElementById("cart-icon");
const cart = document.getElementById("cart");
const cartMinus = document.getElementById("cart-minus");
const cartPlus = document.getElementById("cart-plus");
const cartCurrentVal = document.getElementById("cart-val");
const addToCart = document.getElementById("add-to-cart");
const cartTotal = document.getElementById("cart-total");
let cartVal = 0;

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

// remove menu while clicked on any link
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

cartIcon.addEventListener("click", () => {
  cart.classList.toggle("show-cart");
});

function decreaseHandle() {
  cartVal--;
  cartCurrentVal.innerText = cartVal;
}
function increaseHandle() {
  cartVal++;
  cartCurrentVal.innerText = cartVal;
}

cartMinus.addEventListener("click", decreaseHandle);
cartPlus.addEventListener("click", increaseHandle);

addToCart.addEventListener("click", () => {
  cartTotal.innerText = cartVal;
});
