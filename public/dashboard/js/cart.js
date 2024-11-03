//import message.js
import MailMessage from "nodemailer/lib/mailer/mail-message";
import {  } from "module";
// Cart logic here
const cartItemsContainer = document.querySelector('.cart-items');
const totalProductsSpan = document.getElementById('total-products');
const subtotalSpan = document.getElementById('subtotal');
const taxSpan = document.getElementById('tax');
const totalSpan = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout-btn');
const cart = {};
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.closest('.product-card').dataset.productId;
        if (cart[productId]) {
            cart[productId]++;
        } else {
            cart[productId] = 1;
        }
        updateCartUI();
    });
});

app.use(MailMessage);

function updateCartUI() {
    document.getElementById('cart-button').innerText = `Cart (${Object.keys(cart).length})`;
}

// Function to populate cart items
function populateCartItems() {
    // Get cart items from local storage or API
    const cartItemsData = []; // Replace with actual data
    cartItemsData.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h2>${item.name}</h2>
                <p>Tracking Number: ${item.tracking_number}</p>
                <p>Size: ${item.size}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Store: ${item.store}</p>
                <p>Price: ₦${item.price}</p>
                <p>Rating: ${item.rating}/5</p>
                <p>Category: ${item.category}</p>
                <p>Vendor: ${item.vendor}</p>
            </div>
            <button class="remove-btn"><i class="fas fa-trash"></i></button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    calculateCartSummary();
}

// Function to calculate cart summary
function calculateCartSummary() {
    const subtotal = 0; //can be Replace with actual dynamic calculation
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    const totalProducts = cartItemsData.length;
    totalProductsSpan.textContent = totalProducts;
    subtotalSpan.textContent = subtotal.toFixed(2);
    taxSpan.textContent = tax.toFixed(2);
    totalSpan.textContent = total.toFixed(2);
}

// Function to handle checkout button click
function handleCheckoutButtonClick() {
    // Redirect to checkout page
    window.location.href = 'checkout.html';
}

// Initialize cart logic
populateCartItems();
checkoutBtn.addEventListener('click', handleCheckoutButtonClick);

document.querySelectorAll('.increase-quantity').forEach(button => {
    button.addEventListener('click', () => {
        const quantity = button.previousElementSibling;
        quantity.innerText = parseInt(quantity.innerText) + 1;
    });
});

document.querySelectorAll('.decrease-quantity').forEach(button => {
    button.addEventListener('click', () => {
        const quantity = button.nextElementSibling;
        if (parseInt(quantity.innerText) > 1) {
            quantity.innerText = parseInt(quantity.innerText) - 1;
        }
    });
    const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.querySelector('.cart-count');
const emptyCartMessage = document.getElementById('empty-cart-message');

// Fetch and display cart items from server or localStorage
function fetchCartItems() {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // If no items in cart, show empty cart message
  if (cartItems.length === 0) {
    emptyCartMessage.style.display = 'block';
    cartItemsContainer.style.display = 'none';
    return;
  }

  // If cart is not empty
  emptyCartMessage.style.display = 'none';
  cartItemsContainer.style.display = 'block';
  cartItemsContainer.innerHTML = ''; // Clear the container

  cartItems.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart__item');
    cartItem.innerHTML = `
                <span>Product ID: ${item.product_id}</span>
                <span>Quantity: 
                    <button class="quantity-decrease" data-id="${item.product_id}">-</button>
                    <input type="text" class="quantity-input" value="${item.quantity}" data-id="${item.product_id}">
                    <button class="quantity-increase" data-id="${item.product_id}">+</button>
                </span>
                <button class="cart__remove" data-id="${item.product_id}">Remove</button>
            `;
    cartItemsContainer.appendChild(cartItem);
  });

  // Update total and cart count
  updateCartTotal();
  updateCartCount();
}

// Add item to cart
document.getElementById('add-to-cart-btn').addEventListener('click', function() {
  const productId = document.getElementById('product-id').value;
  const quantity = parseInt(document.getElementById('quantity').value) || 1;

  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const existingItemIndex = cartItems.findIndex(item => item.product_id === productId);
  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].quantity += quantity;
  } else {
    cartItems.push({ product_id: productId, quantity: quantity });
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  fetchCartItems(); // Refresh the cart items
  showToast('Item added to cart!');
});

// Remove item from cart
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('cart__remove')) {
    const productId = event.target.getAttribute('data-id');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartItems = cartItems.filter(item => item.product_id !== productId);

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    fetchCartItems(); // Refresh the cart
    showToast('Item removed from cart!');
  }
});

// Update item quantity in the cart
document.addEventListener('click', function(event) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const productId = event.target.getAttribute('data-id');

  if (event.target.classList.contains('quantity-increase')) {
    const item = cartItems.find(item => item.product_id === productId);
    item.quantity++;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    fetchCartItems(); // Refresh the cart
  } else if (event.target.classList.contains('quantity-decrease')) {
    const item = cartItems.find(item => item.product_id === productId);
    if (item.quantity > 1) {
      item.quantity--;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      fetchCartItems(); // Refresh the cart
    }
  }
});

// Update total cart price
function updateCartTotal() {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  let total = 0;

  cartItems.forEach(item => {
    const pricePerItem = 20; // Mock price for each product (replace with actual price data)
    total += pricePerItem * item.quantity;
  });

  cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

// Update cart count (number of items in the cart)
function updateCartCount() {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartCountElement.textContent = cartItems.length;
}

// Show a toast notification for feedback
function showToast(message) {
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
// Load cart items from local storage
function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ''; // Clear existing items

    if (cartItems.length === 0) {
        document.getElementById('empty-cart').style.display = 'block';
        document.getElementById('cart-summary').style.display = 'none';
        return;
    }

    cartItems.forEach((item, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <h4>${item.productName}</h4>
            <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-index="${index}">
            <p>Price: $<span class="item-price">${item.price.toFixed(2)}</span></p>
            <button class="remove-item" data-index="${index}">Remove</button>
            <button class="save-later" data-index="${index}">Save for Later</button>
        `;
        cartContainer.appendChild(cartItemDiv);
    });

    updateTotal();
}

// Update total amount dynamically
function updateTotal() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    cartItems.forEach(item => {
        total += item.price * item.quantity;
    });

    // Apply discount if promo code is valid
    const promoCode = document.getElementById('promo-code').value;
    if (promoCode === "DISCOUNT10") {
        total *= 0.9; // 10% discount
        document.getElementById('promo-message').innerText = "10% discount applied!";
    } else {
        document.getElementById('promo-message').innerText = "";
    }

    document.getElementById('total-amount').innerText = total.toFixed(2);
}

// Event listeners for quantity change and removing items
document.addEventListener('DOMContentLoaded', () => {
    loadCart();

    document.getElementById('cart-items').addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const index = event.target.dataset.index;
            removeCartItem(index);
        }

        if (event.target.classList.contains('save-later')) {
            const index = event.target.dataset.index;
            saveForLater(index);
        }
    });

    document.getElementById('apply-promo').addEventListener('click', updateTotal);

    document.getElementById('continue-shopping').addEventListener('click', () => {
        window.location.href = 'products.html';
    });

    // Event for quantity change
    document.getElementById('cart-items').addEventListener('change', (event) => {
        if (event.target.classList.contains('quantity-input')) {
            const index = event.target.dataset.index;
            const newQuantity = parseInt(event.target.value);
            updateCartItemQuantity(index, newQuantity);
        }
    });
});

// Function to remove an item from the cart
function removeCartItem(index) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    loadCart();
}

// Function to save an item for later
function saveForLater(index) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const savedForLaterItems = JSON.parse(localStorage.getItem('savedForLater')) || [];

    const item = cartItems.splice(index, 1)[0];
    savedForLaterItems.push(item);
    localStorage.setItem('savedForLater', JSON.stringify(savedForLaterItems));
    localStorage.setItem('cart', JSON.stringify(cartItems));

    loadCart();
    alert(`${item.productName} has been saved for later.`);
}

// Function to update item quantity
function updateCartItemQuantity(index, newQuantity) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (newQuantity > 0) {
        cartItems[index].quantity = newQuantity;
    } else {
        removeCartItem(index);
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateTotal();
}
// cart.js
const updateCart = (cartData) => {
  socket.emit('cart-updated', cartData);

  socket.on('cart-updated', (updatedCart) => {
    console.log('Cart updated:', updatedCart);
    // Update UI
    // Trigger inventory update on server
  });
};

// Handling product quantity, user details, etc.
const cartData = {
  user: 'John Doe',
  userId: 'user123',
  items: [
    { productId: 1, name: 'Bigi Soda', quantity: 2, price: 50 },
    { productId: 2, name: 'Climax Energy', quantity: 1, price: 150 }
  ],
  total: 250,
  userEmail: 'user@example.com',
  date: new Date().toLocaleString(),
};

updateCart(cartData);
// Fetch the cart items when the page loads
fetchCartItems();
});
