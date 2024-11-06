
// App.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import UpdateProductForm from './UpdateProductForm';

// Import dependencies
import fetch from 'node-fetch';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Load product data from JSON file
const productsUrl = '../../data/product.json';
fetch(productsUrl)
    .then(response => response.json())
    .then(data => {
        // Render product cards
        const productContainer = document.getElementById('product-container');
        data.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <h3>${product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>Size: ${product.size}</p>
                <p>Vendor: ${product.vendor}</p>
                <p>Supplier: ${product.supplier}</p>
                <div class="product-rating">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToCart(${(link unavailable)})">
                        <i class="fa-solid fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn btn-secondary" onclick="addToWishlist(${(link unavailable)})">
                        <i class="fa-regular fa-heart"></i> Add to Wishlist
                    </button>
                    <button class="btn btn-success" onclick="checkout(${(link unavailable)})">
                        <i class="fa-solid fa-check"></i> Checkout
                    </button>
                </div>
            `;
            productContainer.appendChild(productCard);
        });
    })
    .catch(error => console.error('Error loading product data:', error));

// Add to Cart Functionality
function addToCart(productId) {
    // Add product to cart stored in local storage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}

// Add to Wishlist Functionality
function addToWishlist(productId) {
    // Add product to wishlist stored in local storage
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist.push(productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert('Product added to wishlist!');
}

// Checkout Functionality
function checkout(productId) {
    // Display checkout modal with product details
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.classList.add('show');
    const product = data.find(p => (link unavailable) === productId);
// Checkout Functionality
function checkout(productId) {
    // Display checkout modal with product details
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.classList.add('show');
    const product = data.find(p => (link unavailable) === productId);
    const checkoutModalContent = checkoutModal.querySelector('.modal-content');
    checkoutModalContent.innerHTML = `<h2>Checkout</h2>
        <p>Product: ${product.name}</p>
        <p>Price: ${product.price}</p>
        <p>Size: ${product.size}</p>
        <p>Vendor: ${product.vendor}</p>
        <p>Supplier: ${product.supplier}</p>
        <button class="btn btn-success" onclick="completeCheckout()">Complete Checkout</button>
    `;
}

// Complete Checkout Functionality
function completeCheckout() {
    // Clear cart
    localStorage.setItem('cart', JSON.stringify([]));
    alert('Checkout complete!');
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.classList.remove('show');
}

// Event Listener for Add to Cart Buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-primary')) {
        const productId = e.target.parentNode.parentNode.querySelector('.product-card').getAttribute('data-id');
        addToCart(productId);
    }
});

// Event Listener for Add to Wishlist Buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-secondary')) {
        const productId = e.target.parentNode.parentNode.querySelector('.product-card').getAttribute('data-id');
        addToWishlist(productId);
    }
});

// Event Listener for Checkout Buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-success')) {
        const productId = e.target.parentNode.parentNode.querySelector('.product-card').getAttribute('data-id');
        checkout(productId);
    }
});
const App = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get('id');

  const handleFormSubmit = (updatedProduct) => {
    let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const productIndex = inventory.findIndex(p => p.id === updatedProduct.id);
    if (productIndex !== -1) {
      inventory[productIndex] = updatedProduct;
      localStorage.setItem('inventory', JSON.stringify(inventory));
      alert('Product updated successfully');
      window.location.href = 'admin.html';
    } else {
      alert('Product not found');
    }
  };

  return (
    <div>
      <h1>Update Product</h1>
      <UpdateProductForm productId={productId} onFormSubmit={handleFormSubmit} />
    </div>
  );
};

export default App;