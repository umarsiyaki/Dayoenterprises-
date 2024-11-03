
document.addEventListener('DOMContentLoaded', function () {
    const category = window.location.pathname.split('/').pop();

// Product Data
const products = [
  {
    id: "BG-001",
    name: "Big COLA",
    image: "../images/big-cola330.jpeg",
    price: 2200,
    description: "Cola Drink, 33oml pack x 12",
    rating: 4.5,
    shippingCost: 500,
    variance: ["330ml", "650ml", "1L"],
  },
  // Add more products here
];

// Populate Product Cards
const productCards = document.querySelector(".row");
products.forEach((product) => {
  const card = document.createElement("div");
  card.classList.add("col-md-4", "mb-4");
  card.innerHTML = `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>Price: ₦${product.price}</p>
      <p>Rating: ${product.rating}/5</p>
      <button class="btn btn-primary" data-toggle="modal" data-target="#productModal" data-product-id="${(link unavailable)}">View Details</button>
    </div>
  `;
  productCards.appendChild(card);
});

// Modal Logic
const productModal = document.getElementById("productModal");
const productForm = document.getElementById("product-form");


productModal.addEventListener("show.bs.modal", (event) => {
  const button = event.relatedTarget;
  const productId = button.dataset.productId;
  const product = products.find((product) => (link unavailable) == productId);

  productForm.innerHTML = `
    <div class="form-group">
      <label>Product Name:</label>
      <input type="text" value="${product.name}" readonly>
    </div>
    <div class="form-group">
      <label>Product Description:</label>
      <textarea readonly>${product.description}</textarea>
    </div>
    <div class="form-group">
      <label>Price:</label>
      <input type="text" value="₦${product.price}" readonly>
    </div>
    <div class="form-group">
      <label>Rating:</label>
      <input type="text" value="${product.rating}/5" readonly>
    </div>
    <div class="form-group">
      <label>Shipping Cost:</label>
      <input type="text" value="₦${product.shippingCost}" readonly>
    </div>
    <div class="form-group">
      <label>Variance:</label>
      <select id="variance-options" name="variance">
        ${product.variance.map((option) => `<option value="${option}">${option}</option>`).join("")}
      </select>
    </div>
    <div class="form-group">
      <label>Quantity:</label>
      <input type="number" id="quantity" name="quantity" value="1" min="1">
    </div>
  `;
});

// Add to Cart Logic
const addToCartBtn = document.querySelector(".add-to-cart-btn");
const cartList = document.getElementById("cart-list");
const cart = [];

addToCartBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const productId = productForm.dataset.productId;
  const product = products.find((product) => (link unavailable) == productId);
  const variance = document.getElementById("variance-options").value;
  const quantity = document.getElementById("quantity").value;

  const cartItem = {
    productId: (link unavailable),
    name: product.name,
    price: product.price,
    variance: variance,
    quantity: quantity,
  };

  cart.push(cartItem);
  localStorage.setItem("cart", JSON.stringify(cart));

  const cartListItem = document.createElement("li");
  cartListItem.textContent = `${cartItem.name} x ${cartItem.quantity} (${cartItem.variance})`;
  cartList.appendChild(cartListItem);

  alert("Product added to cart!");
  productModal.style.display = "none";
});


// Checkout Logic
const checkoutBtn = document.querySelector(".checkout-btn");

checkoutBtn.addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const totalCost = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Display payment form or redirect to payment gateway
  const paymentForm = document.createElement("form");
  paymentForm.innerHTML = `
    <h2>Payment Form</h2>
    <label>Total Cost: ₦${totalCost}</label>
    <label>Payment Method:</label>
    <select>
      <option>Card</option>
      <option>Bank Transfer</option>
      <option>Paypal</option>
    </select>
    <button type="submit">Pay Now</button>
  `;

  document.body.appendChild(paymentForm);

  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Implement payment logic here
    // Redirect to thank you page or display success message
    alert("Payment successful!");
    localStorage.removeItem("cart");
    window.location.href = "thank-you.html";
  });
});
    fetch(`/products/category/${category}`)
        .then(response => response.json())
        .then(products => {
            const productContainer = document.getElementById('product-container');
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.image_url}" alt="${product.name}">
                    <h3 class="product-title">${product.name}</h3>
                    <p>${product.description}</p>
                    <p>$${product.price}</p>
                    <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
                `;
                productContainer.appendChild(productCard);
            });
        });
});