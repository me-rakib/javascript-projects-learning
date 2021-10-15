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
const cartEmpty = document.querySelector(".cart__empty");
const cartNotEmpty = document.querySelector(".cart__not-empty");
const cartTotalItem = document.querySelector(".cart__total-item");
const cartTotalItemPrice = document.querySelector(".cart__total-price");
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
  if (cartVal > 0) {
    cartEmpty.style.display = "none";
    cartNotEmpty.style.display = "block";
  } else if (cartVal <= 0) {
    cartNotEmpty.style.display = "none";
    cartEmpty.style.display = "block";
  }
});

function showPrice(totalItem) {
  cartTotalItemPrice.innerText = `${totalItem * 125}`;
}

function decreaseHandle() {
  if (cartVal > 0) {
    cartVal--;
    cartCurrentVal.innerText = cartVal;
    cartTotalItem.innerText = cartVal;
    showPrice(cartVal);
  }
}
function increaseHandle() {
  cartVal++;
  cartCurrentVal.innerText = cartVal;
  cartTotalItem.innerText = cartVal;
  showPrice(cartVal);
}

cartMinus.addEventListener("click", decreaseHandle);
cartPlus.addEventListener("click", increaseHandle);

addToCart.addEventListener("click", () => {
  cartTotal.innerText = cartVal;
});
