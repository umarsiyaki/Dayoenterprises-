// Load cart items and calculate totals
function loadCheckout() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItemsContainer = document.getElementById('order-items');
    orderItemsContainer.innerHTML = ''; // Clear existing items

    if (cartItems.length === 0) {
        alert('Your cart is empty. Please add items to your cart before checking out.');
        window.location.href = 'cart.html'; // Redirect to cart page
        return;
    }

    let subtotal = 0;

    // Display each cart item in the checkout
    cartItems.forEach((item) => {
        const orderItemDiv = document.createElement('div');
        orderItemDiv.classList.add('order-item');
        orderItemDiv.innerHTML = `
            <h4>${item.productName} (x${item.quantity})</h4>
            <p>Unit Price: ₦<span class="item-unit-price">${item.price.toFixed(2)}</span></p>
            <p>Total Price: ₦<span class="item-total-price">${(item.price * item.quantity).toFixed(2)}</span></p>
        `;
        subtotal += item.price * item.quantity;
        orderItemsContainer.appendChild(orderItemDiv);
    });

    // Display totals in the DOM
    document.getElementById('order-subtotal').textContent = subtotal.toFixed(2);
    calculateOrderSummary(subtotal);
}

// Calculate tax, shipping, and grand total
function calculateOrderSummary(subtotal) {
    const taxRate = 0.08; // 8% tax
    const shippingMethod = document.getElementById('shipping-method').value || 'standard';
    const shippingCost = shippingMethod === 'standard' ? 500 : 1000; // Standard or express shipping
    const tax = subtotal * taxRate;
    const total = subtotal + tax + shippingCost;

    // Update order summary
    document.getElementById('order-tax').textContent = tax.toFixed(2);
    document.getElementById('order-shipping').textContent = shippingCost.toFixed(2);
    document.getElementById('order-total').textContent = total.toFixed(2);
}

// Save user details in localStorage
function saveUserDetails(name, address, paymentMethod) {
    const userDetails = { name, address, paymentMethod };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
}

// Load user details from localStorage
function loadUserDetails() {
    return JSON.parse(localStorage.getItem('userDetails')) || {};
}

// Handle form submission for checkout
document.getElementById('checkout-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const customerName = document.getElementById('customer-name').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment-method').value;

    // Validate user inputs
    if (!customerName || !address || !paymentMethod) {
        alert('Please fill in all required fields.');
        return;
    }

    saveUserDetails(customerName, address, paymentMethod);

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const taxRate = 0.08; // 8% tax
    const shippingMethod = document.getElementById('shipping-method').value || 'standard';
    const shippingCost = shippingMethod === 'standard' ? 500 : 1000;
    const tax = subtotal * taxRate;
    const totalAmount = subtotal + tax + shippingCost;

    // Prepare order data
    const orderData = {
        customerName,
        address,
        paymentMethod,
        items: cartItems,
        subtotal,
        tax,
        shippingCost,
        totalAmount,
        orderDate: new Date().toISOString(),
    };

    // Send order data to server
    fetch('/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Order response:', data);
            if (data.success) {
                // Clear cart and show thank-you message
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

// Update totals when shipping method changes
document.getElementById('shipping-method').addEventListener('change', function () {
    const subtotal = parseFloat(document.getElementById('order-subtotal').textContent) || 0;
    calculateOrderSummary(subtotal);
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
                    <p>Total: ₦${order.totalAmount.toFixed(2)}</p>
                    <p>Items: ${order.items.map(i => `${i.productName} (x${i.quantity})`).join(', ')}</p>
                    <p>Order Date: ${new Date(order.orderDate).toLocaleString()}</p>
                `;
                orderHistoryContainer.appendChild(orderDiv);
            });
        })
        .catch((error) => console.error('Error fetching order history:', error));
}

// Load checkout and order history on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCheckout();
    loadOrderHistory();
});

// Placeholder for payment processing
function processPaymentMethod(paymentMethod, totalAmount) {
    // Simulate different payment method responses
    switch (paymentMethod) {
        case 'Cash':
            return { success: true, message: 'Order placed. Pay on delivery.' };
        case 'POS':
            return { success: true, message: 'POS terminal will be provided upon delivery.' };
        case 'Bank Transfer':
            return { success: true, message: 'Transfer to the provided bank account.' };
        default:
            return { success: false, message: 'Invalid payment method.' };
    }
}
