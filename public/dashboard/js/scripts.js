// Get elements
const usersTable = document.getElementById('users-table');
const createUserForm = document.getElementById('create-user-form');
const createOrderForm = document.getElementById('create-order-form');
const createProductForm = document.getElementById('create-product-form');

// API endpoints
const usersEndpoint = '/api/users';
const ordersEndpoint = '/api/orders';
const productsEndpoint = '/api/products';

// Function to get users
async function getUsers() {
  try {
    const response = await fetch(usersEndpoint);
    const users = await response.json();
    usersTable.innerHTML = '';
    users.forEach((user) => {
      const row = `
        <tr>
          <td>${(link unavailable)}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </td>
        </tr>
      `;
      usersTable.innerHTML += row;
    });
  } catch (error) {
    console.error(error);
  }
}

// Function to create user
async function createUser(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const role = document.getElementById('role').value;
  try {
    const response = await fetch(usersEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, role }),
    });
    const user = await response.json();
    getUsers();
  } catch (error) {
    console.error(error);
  }
}

// Function to get orders
async function getOrders() {
  try {
    const response = await fetch(ordersEndpoint);
    const orders = await response.json();
    const ordersTable = document.getElementById('orders-table');
    ordersTable.innerHTML = '';
    orders.forEach((order) => {
      const row = `
        <tr>
          <td>${(link unavailable)}</td>
          <td>${order.user_id}</td>
          <td>${order.total}</td>
          <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </td>
        </tr>
      `;
      ordersTable.innerHTML += row;
    });
  } catch (error) {
    console.error(error);
  }
}

// Function to create order
async function createOrder(event) {
  event.preventDefault();
  const user_id = document.getElementById('user_id').value;
  const total = document.getElementById('total').value;
  try {
    const response = await fetch(ordersEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, total }),
    });
    const order = await response.json();
    getOrders();
  } catch (error) {
    console.error(error);
  }
}

// Function to get products
async function getProducts() {
  try {
    const response = await fetch(productsEndpoint);
    const products = await response.json();
    const productsTable = document.getElementById('products-table');
    productsTable.innerHTML = '';
    products.forEach((product) => {
      const row = `
        <tr>
          <td>${(link unavailable)}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </td>
        </tr>
      `;
      productsTable.innerHTML += row;
    });
  } catch (error) {
    console.error(error);
  }
}

// Function to create product
async function createProduct(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  try {
    const response = await fetch(productsEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price }),
    });
    const product = await response.json();
    getProducts();
  } catch (error) {
    console.error(error);
  }
}

// Add event listeners
createUserForm.addEventListener('submit', createUser);
createOrderForm.addEventListener('submit', createOrder);
createProductForm.addEventListener('submit', createProduct);

// Get data on page load
getUsers();
getOrders();
getProducts();

const forms = document.querySelectorAll('form');

forms.forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', form.action, true);
    xhr.send(formData);
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
      }
    };
  });
});
// Slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = (i === index) ? 'block' : 'none';
        dots[i].classList.toggle('active', i === index);
    });
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Auto slide change
setInterval(nextSlide, 3000);

// Add-to-cart button functionality
const cartButton = document.getElementById('cart-button');
let cartCount = 0;

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        cartButton.innerText = `Cart (${cartCount})`;
    });
});

// Quantity controller
document.querySelectorAll('.product-card').forEach(card => {
    const decreaseButton = card.querySelector('.decrease-quantity');
    const increaseButton = card.querySelector('.increase-quantity');
    const quantityDisplay = card.querySelector('.quantity');
    let quantity = 1;

    decreaseButton.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.innerText = quantity;
        }
    });

    increaseButton.addEventListener('click', () => {
        quantity++;
        quantityDisplay.innerText = quantity;
    });
});

// Calculator functionality
document.querySelectorAll('.calculator-buttons .btn').forEach(button => {
    button.addEventListener('click', function() {
        let display = document.getElementById('calculatorDisplay');
        let value = this.getAttribute('data-value');

        if (value === 'C') {
            display.value = '';
        } else if (value === '=') {
            try {
                display.value = eval(display.value);
            } catch (error) {
                display.value = 'Error';
            }
        } else {
            display.value += value;
        }
    });
});

// Handle site customization
document.getElementById('site-font').addEventListener('change', (e) => {
    document.body.style.fontFamily = e.target.value;
});

document.getElementById('site-color').addEventListener('input', (e) => {
    document.body.style.backgroundColor = e.target.value;
});

// Other utility functions
document.addEventListener('DOMContentLoaded', () => {
    // Exmple function to populate tables
    const populateTable = async () => {
        try {
            const response = await fetch('/api/orders'); // Replace with actual API endpoint
            const data = await response.json();
            const tableBody = document.getElementById('orderTableBody');
            tableBody.innerHTML = data.map(order => `
                <tr>
                    <td>${order.buyerName}</td>
                    <td>${order.store}</td>
                    <td>${order.productName}</td>
                    <td>${order.orderId}</td>
                    <td>${order.trackingNumber}</td>
                    <td><button class="btn btn-primary">Details</button></td>
                </tr>
            `).join('');
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    populateTable();

    // function to handle site customization
    document.getElementById('site-font').addEventListener('change', (event) => {
        document.body.style.fontFamily = event.target.value;
    });

    document.getElementById('site-color').addEventListener('input', (event) => {
        document.body.style.backgroundColor = event.target.value;
    });

    // Chart.js initialization
    const ctx = document.getElementById('revenueChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [{
                label: 'Monthly Revenue',
                data: [10, 20, 30, 40, 50],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    
document.getElementById('create-blog-btn').addEventListener('click', function() {
    document.getElementById('create-blog-section').style.display = 'block';
});

document.getElementById('cancel-create-blog').addEventListener('click', function() {
    document.getElementById('create-blog-section').style.display = 'none';
});
});