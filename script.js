"use strict";

// MAKING THE CART APPEAR AND DISAPPEAR

const cart = document.querySelector(".cart");
const cartButton = document.querySelector(".icon-cart");

const menuButton = document.querySelector(".btn-menu");
const navClose = document.querySelector(".nav-close");
const mobileNav = document.querySelector(".mobile-nav-overlay");

const plus = document.querySelector(".btn-plus");
const minus = document.querySelector(".btn-minus");
const number = document.querySelector(".number");

const main = document.querySelector(".main");
const lightBox = document.querySelector(".lighthouse-overlay");
const boxClose = document.querySelector(".btn-close");

const imgShow = document.querySelectorAll(".main-img");

const btnLeftOverlay = lightBox.querySelector(".left");
const btnRightOverlay = lightBox.querySelector(".right");
const btnLeftMain = main.querySelector(".left");
const btnRightMain = main.querySelector(".right");

const addCart = document.querySelector(".add-to-cart");
const cartContent = document.querySelector(".cart-content");
const indicator = document.querySelector(".indicator");

const title = document.querySelector(".title").innerHTML;
const price = document.querySelector(".discounted-price").innerHTML;

//  MAKING THE CART APPEAR AND DISAPPEAR

cartButton.addEventListener("click", () => {
  cart.classList.toggle("show-cart");
});

// MAKING THE MENU APPEAR AND DISAPPEAR

menuButton.addEventListener("click", () => {
  mobileNav.classList.add("menu-show");
});
navClose.addEventListener("click", () => {
  mobileNav.classList.remove("menu-show");
});

// INCREASING AND DECREASING THE ITEM COUNT

let count = Number(number.innerHTML);

plus.addEventListener("click", () => {
  count += 1;
  number.innerHTML = count;
});
minus.addEventListener("click", () => {
  if (count === 0) {
    return;
  } else {
    count -= 1;
    number.innerHTML = count;
  }
});

// OPENING AND CLOSING THE LIGHTBOX

imgShow[1].addEventListener("click", () => {
  lightBox.classList.add("lighthouse-show");
});
boxClose.addEventListener("click", () => {
  lightBox.classList.remove("lighthouse-show");
});

// CHANGING THE IMAGE SHOWCASE

const thumbnailMain = Array.from(main.querySelectorAll("[class^=thumbnail]"));
const thumbnailOverlay = Array.from(
  lightBox.querySelectorAll("[class^=thumbnail]")
);

const reset = function (arr) {
  arr.forEach((item) => {
    item.classList.remove("active");
  });
};

const move = function (arr, index) {
  arr.forEach((e) => {
    e.addEventListener("click", () => {
      reset(arr);
      e.classList.add("active");
      imgShow[index].src = e.querySelector("img").src;
    });
  });
};

move(thumbnailMain, 1);
move(thumbnailOverlay, 0);

// NAVIGATING THE SHOWCASE

btnLeftMain.addEventListener("click", () => {
  const currentActive = main.querySelector(".active");
  let num = thumbnailMain.indexOf(currentActive);
  if (num >= 1) {
    num--;
    reset(thumbnailMain);
    thumbnailMain[num].classList.add("active");
    imgShow[1].src = thumbnailMain[num].querySelector("img").src;
    console.log(thumbnailMain[num].querySelector("img"));
  }
});
btnRightMain.addEventListener("click", () => {
  const currentActive = main.querySelector(".active");
  let num = thumbnailMain.indexOf(currentActive);
  if (num <= 2) {
    num++;
    reset(thumbnailMain);
    thumbnailMain[num].classList.add("active");
    imgShow[1].src = thumbnailMain[num].querySelector("img").src;
  }
});
btnLeftOverlay.addEventListener("click", () => {
  const currentActive = lightBox.querySelector(".active");
  let num = thumbnailOverlay.indexOf(currentActive);
  if (num >= 1) {
    num--;
    console.log(num);
    reset(thumbnailOverlay);
    thumbnailOverlay[num].classList.add("active");
    imgShow[0].src = thumbnailMain[num].querySelector("img").src;
  }
});
btnRightOverlay.addEventListener("click", () => {
  const currentActive = lightBox.querySelector(".active");
  let num = thumbnailOverlay.indexOf(currentActive);
  if (num <= 2) {
    num++;
    console.log(num);
    reset(thumbnailOverlay);
    thumbnailOverlay[num].classList.add("active");
    imgShow[0].src = thumbnailMain[num].querySelector("img").src;
  }
});

// EMPTYING THE CART

const empty = function () {
  cartContent.innerHTML = `<div class="cart-empty">Your cart is empty</div>`;
  indicator.innerHTML = "";
  indicator.style.backgroundColor = "transparent";
};

// ADDING TO CART

addCart.addEventListener("click", () => {
  if (count != 0) {
    let sum = Number(document.querySelector(".cash").innerHTML) * count;

    cartContent.innerHTML = `<div class="cart-items">
    <div class="item-img"><img src="${imgShow[1].src}"></div>
    <div class="item-details">
    <div class="item-name">${title}</div>
    <div class="item-price">
    <div class="base-price">${price} X ${count}</div>
    <div class="total-price">$${sum}</div>
    </div>
    </div>
    <button class="delete"><svg class="icon-delete" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill-rule="nonzero" xlink:href="#a"/></svg></button>
    </div><div class="checkout"><button class="btn">Checkout</button></div>`;

    indicator.innerHTML = count;
    indicator.style.backgroundColor = "hsl(26, 100%, 55%)";

    const erase = cartContent.querySelector(".delete");
    erase.addEventListener("click", empty);
  } else {
    empty();
  }
});
