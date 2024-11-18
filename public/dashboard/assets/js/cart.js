// Import required modules
import MailMessage from "nodemailer/lib/mailer/mail-message";
import { socket } from "module"; // Assuming a socket connection is used

// DOM Elements
const cartItemsContainer = document.getElementById("cart-items");
const totalProductsSpan = document.getElementById("total-products");
const subtotalSpan = document.getElementById("subtotal");
const taxSpan = document.getElementById("tax");
const totalSpan = document.getElementById("total");
const checkoutBtn = document.getElementById("checkout-btn");
const emptyCartMessage = document.getElementById("empty-cart");
const cartCountElement = document.querySelector(".cart-count");

// Cart State
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart persistently
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add product to cart
function addToCart(productId, productData) {
    const existingProduct = cart.find((item) => item.id === productId);
    if (existingProduct) {
        if (existingProduct.quantity < productData.stock) {
            existingProduct.quantity++;
        } else {
            alert("Maximum stock reached!");
            return;
        }
    } else {
        cart.push({ ...productData, quantity: 1 });
    }
    saveCart();
    updateCartUI();
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    saveCart();
    updateCartUI();
}

// Update product quantity
function updateQuantity(productId, quantity) {
    const cartItem = cart.find((item) => item.id === productId);
    if (!cartItem) return;

    if (quantity <= 0) {
        removeFromCart(productId);
    } else if (quantity <= cartItem.stock) {
        cartItem.quantity = quantity;
    } else {
        alert("Exceeds available stock!");
    }
    saveCart();
    updateCartUI();
}

// Populate cart items
function populateCartItems() {
    cartItemsContainer.innerHTML = ""; // Clear container

    if (cart.length === 0) {
        emptyCartMessage.style.display = "block";
        cartItemsContainer.style.display = "none";
        return;
    }

    emptyCartMessage.style.display = "none";
    cartItemsContainer.style.display = "block";

    cart.forEach((item) => {
        const total = item.price * item.quantity;

        const cartItemDiv = document.createElement("div");
        cartItemDiv.className = "cart-item";
        cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <span>${item.name}</span>
            <input type="number" min="1" max="${item.stock}" value="${item.quantity}" 
                onchange="updateQuantity(${item.id}, this.value)">
            <span>${total.toFixed(2)}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.1; // Example: 10% tax
    const total = subtotal + tax;

    subtotalSpan.textContent = `₦${subtotal.toFixed(2)}`;
    taxSpan.textContent = `₦${tax.toFixed(2)}`;
    totalSpan.textContent = `₦${total.toFixed(2)}`;
    totalProductsSpan.textContent = cart.length;
}

// Update mini cart UI
function updateMiniCart() {
    const miniCartList = document.querySelector(".mini-products-list");
    miniCartList.innerHTML = "";

    cart.forEach((item) => {
        const total = item.price * item.quantity;

        miniCartList.innerHTML += `
            <li class="item">
                <a class="product-image" href="#">
                    <img src="${item.image}" alt="${item.name}">
                </a>
                <div class="product-details">
                    <a href="#" class="remove" onclick="removeFromCart(${item.id})"><i class="anm anm-times-l"></i></a>
                    <a class="pName" href="#">${item.name}</a>
                    <div class="variant-cart">Qty: ${item.quantity}</div>
                    <div class="priceRow">
                        <div class="product-price"><span class="money">${total.toFixed(2)}</span></div>
                    </div>
                </div>
            </li>`;
    });

    document.querySelector(".cart-count").textContent = cart.length;
}

// Handle checkout button click
function handleCheckout() {
    // Redirect to checkout page
    window.location.href = "checkout.html";
}

// Apply promo code
function applyPromoCode() {
    const promoCode = document.getElementById("promo-code").value.trim();
    const discountRates = { SAVE10: 0.1, SAVE20: 0.2 }; // Example codes
    const discount = discountRates[promoCode] || 0;

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discountAmount = subtotal * discount;

    const tax = (subtotal - discountAmount) * 0.1;
    const total = subtotal - discountAmount + tax;

    totalSpan.textContent = `₦${total.toFixed(2)}`;
    document.getElementById("promo-message").textContent = discount
        ? "Promo applied successfully!"
        : "Invalid promo code.";
}

// Initialize cart logic
function initializeCart() {
    populateCartItems();
    updateCartSummary();
    updateMiniCart();
    checkoutBtn.addEventListener("click", handleCheckout);
}

// Initialize
document.addEventListener("DOMContentLoaded", initializeCart);
