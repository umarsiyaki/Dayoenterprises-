
// Load cart items for checkTo address the request and ensure that all features are correctly implemented in the `cart.js` file, we can progressively enhance the code to match the expected functionality. Here’s an approach that aligns the code with HTML selectors, adds the required features, and ensures the checkout flow and features are functional.


const startCheckout = (checkoutData) => {
  socket.emit('checkout-started', checkoutData);

  socket.on('checkout-started', (data) => {
    console.log('Checkout started:', data);
    // Update checkout UI
    // Prepare to capture payment
  });
};

// payment.js
const processPayment = (paymentData) => {
  socket.emit('payment-processed', paymentData);

  socket.on('payment-processed', (data) => {
    console.log('Payment processed:', data);
    // Update payment UI
  });
};

// Triggering payment
const paymentData = {
  userId: 'user123',
  user: 'John Doe',
  paymentMethod: 'Card',
  totalAmount: 250,
  paymentStatus: 'Success',
  userEmail: 'user@example.com',
  transactionDate: new Date().toLocaleString(),
};

processPayment(paymentData);
// Load cart items for checkout
function loadCheckout() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItemsContainer = document.getElementById('order-items');
    orderItemsContainer.innerHTML = ''; // Clear existing items

    if (cartItems.length === 0) {
        alert('Your cart is empty. Please add items to your cart before checking out.');
        window.location.href = 'cart.html'; // Redirect to cart page
        return;
    }

    // Display each cart item in the checkout
    cartItems.forEach(item => {
        const orderItemDiv = document.createElement('div');
        orderItemDiv.classList.add('order-item');
        orderItemDiv.innerHTML = `
            <h4>${item.productName} (x${item.quantity})</h4>
            <p>Price: ₦<span class="item-price">${item.price.toFixed(2)}</span></p>
        `;
        orderItemsContainer.appendChild(orderItemDiv);
    });

    // Calculate total amount
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    document.getElementById('order-total').innerText = totalAmount.toFixed(2);
}

// Populate order summary with additional details
function populateOrderSummary() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.08; // tax rate (8%)
    const shippingMethod = document.getElementById('shipping-method').value;
    const shipping = shippingMethod === 'standard' ? 500 : 1000; // Shipping cost logic

    const total = subtotal + tax + shipping;
    const totalProducts = cartItems.length;

    // Update order summary in DOM
    document.getElementById('total-products').textContent = totalProducts;
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('tax').textContent = tax.toFixed(2);
    document.getElementById('shipping').textContent = shipping.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}

// Form submission for checkout
document.getElementById('checkout-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const customerName = document.getElementById('customer-name').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment-method').value;

    // Basic validation
    if (!customerName || !address || !paymentMethod) {
        alert('Please fill in all fields.');
        return;
    }

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Prepare order data
    const orderData = {
        customerName,
        address,
        paymentMethod,
        totalAmount,
        items: cartItems
    };

    // Submit order to server ( API endpoint)
    fetch('/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Order response:', data);
            if (data.success) {
                // Clear cart and show thank you message
                localStorage.removeItem('cart');
                loadCheckout(); // Reload checkout to reflect empty cart
                document.getElementById('checkout-form').style.display = 'none';
                document.getElementById('thank-you-message').style.display = 'block';
            } else {
                alert('Error processing order: ' + data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error processing order. Please try again.');
        });
});

// Load checkout on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCheckout();
    populateOrderSummary(); // Populate order summary on page load
});

// Fetch and display order history
function loadOrderHistory() {
    fetch('/order-history')
        .then((response) => response.json())
        .then((orders) => {
            const orderHistoryContainer = document.getElementById('order-history');
            orderHistoryContainer.innerHTML = ''; // Clear existing content

            orders.forEach((order) => {
                const orderDiv = document.createElement('div');
                orderDiv.classList.add('order-history-item');
                orderDiv.innerHTML = `
                    <h3>Order #${order.id}</h3>
                    <p>Total: ₦${order.total}</p>
                    <p>Items: ${order.items.map(i => `${i.productName} (x${i.quantity})`).join(', ')}</p>
                `;
                orderHistoryContainer.appendChild(orderDiv);
            });
        })
        .catch((error) => console.error('Error fetching order history:', error));
}

// Call loadOrderHistory on order history page load
document.addEventListener('DOMContentLoaded', loadOrderHistory);

// Function to handle place order button click
document.getElementById('place-order-btn').addEventListener('click', function() {
    const cardNumber = document.getElementById('card-number').value;
    const cardExpiry = document.getElementById('card-expiry').value;
    const cardCvv = document.getElementById('card-cvv').value;

    // Validate payment details before placing order
    if (!cardNumber || !cardExpiry || !cardCvv) {
        alert('Please provide valid payment details.');
        return;
    }

    // Process payment (pseudo-function for illustration)
    const paymentResponse = processPayment(cardNumber, cardExpiry, cardCvv, document.getElementById('total').textContent);
    if (paymentResponse.success) {
        alert('Payment successful. Order placed.');
        // Optionally redirect or clear cart
    } else {
        alert('Payment failed. Please try again.');
    }
});

// Placeholder for processPayment function
function processPayment(cardNumber, cardExpiry, cardCvv, amount) {
    // Simulate successful payment response
    return { success: true };
}


