// Product data
const products = [
  {
    id: "BG-001",
    name: "Big COLA",
    price: 2200,
    size: "330ml",
    rating: "4.6/5",
    description: "Cola Drink, 33oml pack x 12",
    image: "../images/big-cola330.jpeg",
  },
  {
    id: "BG-002",
    name: "Big Cola 650cl",
    price: 3200,
    size: "650ml",
    rating: "4.6/5",
    description: "Big cola flavoured drink",
    image: "../images/big-cola650.jpeg",
  },
  {
    id: "BG-003",
    name: "Big Apple",
    price: 2200,
    size: "650ml",
    rating: "4.6/5",
    description: "Big apple flavoured Drink",
    image: "../images/big-g-apple.jpeg",
  },
  {
    id: "BG-004",
    name: "Big Orange",
    price: 2200,
    size: "650ml",
    rating: "4.6/5",
    description: "Big orange flavoured Drink",
    image: "../images/big-orange.jpeg",
  },
  {
    id: "BG-005",
    name: "Big Lemon",
    price: 2000,
    size: "500ml",
    rating: "4.5/5",
    description: "Big lemon flavoured Drink",
    image: "../images/big-lemon.jpeg",
  },
  {
    id: "BG-006",
    name: "Big Cherry",
    price: 2500,
    size: "750ml",
    rating: "4.7/5",
    description: "Big cherry flavoured Drink",
    image: "../images/big-cherry.jpeg",
  },
  {
    id: "BG-007",
    name: "Big Grape",
    price: 2800,
    size: "1L",
    rating: "4.8/5",
    description: "Big grape flavoured Drink",
    image: "../images/big-grape.jpeg",
  },
  {
    id: "BG-008",
    name: "Big Soda",
    price: 2000,
    size: "500ml",
    rating: "4.4/5",
    description: "Big soda flavoured Drink",
    image: "../images/big-soda.jpeg",
  },
];

// Cart data
let cart = [];

// Function to generate product cards
function generateProductCards() {
  const productCardsRow = document.getElementById("product-cards-row");
  productCardsRow.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("col-md-4", "mb-4");
    productCard.innerHTML = `
      <div class="card h-100" data-product-id="${(link unavailable)}" data-name="${product.name}" data-price="${product.price}" data-size="${product.size}" data-rating="${product.rating}" data-description="${product.description}" data-image="${product.image}">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <h3 class="card-title">${product.name}</h3>
          <p class="card-description">${product.description}</p>
          <p class="card-size">Size: ${product.size}</p>
          <p class="card-price">Price: ₦${product.price}</p>
          <p class="card-rating">Rating: ${product.rating}</p>
          <button class="btn btn-primary btn-block add-to-cart-btn">Add to Cart</button>
          <div class="quantity-controller mt-3 d-flex justify-content-between align-items-center">
            <button class="btn btn-outline-secondary decrease-quantity">-</button>
            <span class="quantity">1</span>
            <button class="btn btn-outline-secondary increase-quantity">+</button>
          </div>
        </div>
      </div>
    `;

    productCardsRow.appendChild(productCard);
  });
}

// Function to generate cart table
function generateCartTable() {
  const cartTableBody = document.getElementById("cart-table-body");
  cartTableBody.innerHTML = "";

  cart.forEach((item, index) => {
    const cartRow = document.createElement("tr");
    cartRow.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>₦${item.price}</td>
      <td>₦${item.total}</td>
      <td>
        <button class="btn btn-danger remove-from-cart-btn" data-index="${index}">Remove</button>
      </td>
    `;

    cart
```
[10/28, 22:46] Meta AI: Here's the rest of the JavaScript code:

```
    cartTableBody.appendChild(cartRow);
  });

  const cartTotal = document.getElementById("cart-total");
  const total = cart.reduce((acc, item) => acc + item.total, 0);
  cartTotal.innerText = `Total: ₦${total}`;
}

// Function to handle add to cart button click
function handleAddToCartButtonClick(event) {
  const productCard = event.target.closest(".card");
  const productData = {
    id: productCard.dataset.productId,
    name: productCard.dataset.name,
    price: parseInt(productCard.dataset.price),
    size: productCard.dataset.size,
    rating: productCard.dataset.rating,
    description: productCard.dataset.description,
    image: productCard.dataset.image,
    quantity: 1,
    total: parseInt(productCard.dataset.price),
  };

  const existingItem = cart.find((item) => (link unavailable) === (link unavailable));
  if (existingItem) {
    existingItem.quantity += 1;
    existingItem.total += existingItem.price;
  } else {
    cart.push(productData);
  }

  generateCartTable();
}

// Function to handle remove from cart button click
function handleRemoveFromCartButtonClick(event) {
  const index = parseInt(event.target.dataset.index);
  cart.splice(index, 1);

  generateCartTable();
}

// Function to handle quantity change
function handleQuantityChange(event) {
  const quantityController = event.target.closest(".quantity-controller");
  const quantityInput = quantityController.querySelector(".quantity");
  const newQuantity = parseInt(quantityInput.innerText) + parseInt(event.target.dataset.increment);

  if (newQuantity < 1) return;

  quantityInput.innerText = newQuantity;

  const productCard = quantityController.closest(".card");
  const productData = {
    id: productCard.dataset.productId,
    name: productCard.dataset.name,
    price: parseInt(productCard.dataset.price),
    size: productCard.dataset.size,
    rating: productCard.dataset.rating,
    description: productCard.dataset.description,
    image: productCard.dataset.image,
    quantity: newQuantity,
    total: newQuantity * parseInt(productCard.dataset.price),
  };

  const existingItem = cart.find((item) => (link unavailable) === (link unavailable));
  if (existingItem) {
    existingItem.quantity = newQuantity;
    existingItem.total = newQuantity * existingItem.price;
  }

  generateCartTable();
}

// Initialize product cards and cart table
generateProductCards();
generateCartTable();

// Add event listeners
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    handleAddToCartButtonClick(event);
  } else if (event.target.classList.contains("remove-from-cart-btn")) {
    handleRemoveFromCartButtonClick(event);
  } else if (event.target.classList.contains("increase-quantity") || event.target.classList.contains("decrease-quantity")) {
    handleQuantityChange(event);
  }
});