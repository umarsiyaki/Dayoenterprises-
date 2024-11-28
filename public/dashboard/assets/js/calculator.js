document.querySelectorAll('.calculator-buttons .btn').forEach(button => {
    button.addEventListener('click', function() {
        const display = document.getElementById('calculatorDisplay');
        if (!display) {
            console.error("Calculator display element not found.");
            return;
        }
        
        const value = this.getAttribute('data-value');
        
        if (!value) {
            console.error("Button data-value attribute is missing.");
            return;
        }

        if (value === 'C') {
            display.value = '';
        } else if (value === '=') {
            try {
                display.value = eval(display.value) || '';  // Ensure valid evaluation
            } catch (error) {
                display.value = 'Error';
            }
        } else {
            display.value += value;
        }
    });
});
let products = []; // Store products array

document.getElementById('add-product-btn').addEventListener('click', function() {
  const productName = document.getElementById('product-name').value;
  const quantity = parseFloat(document.getElementById('quantity').value);
  const price = parseFloat(document.getElementById('price').value);
  const discount = parseFloat(document.getElementById('discount').value);

  // Validation
  if (!productName || isNaN(quantity) || isNaN(price) || isNaN(discount)) {
    alert('Please fill out all fields correctly.');
    return;
  }

  // Calculate total for this product
  let productTotal = quantity * price;
  if (discount > 0) {
    productTotal -= productTotal * (discount / 100);
  }

  // Add product to array
  products.push({
    productName,
    quantity,
    price,
    discount,
    total: productTotal
  });

  // Update product list table
  const tableBody = document.querySelector('#product-list tbody');
  const row = `<tr>
        <td>${productName}</td>
        <td>${quantity}</td>
        <td>${price.toFixed(2)}</td>
        <td>${discount.toFixed(2)}</td>
        <td>${productTotal.toFixed(2)}</td>
    </tr>`;
  tableBody.innerHTML += row;

  // Update grand total
  updateGrandTotal();

  // Reset form inputs
  document.getElementById('product-name').value = '';
  document.getElementById('quantity').value = '';
  document.getElementById('price').value = '';
  document.getElementById('discount').value = '0';
});

// Function to update grand total
function updateGrandTotal() {
  const grandTotal = products.reduce((acc, product) => acc + product.total, 0);
  document.getElementById('grand-total').textContent = grandTotal.toFixed(2);
}

// Submit all products and store in database
document.getElementById('submit-products').addEventListener('click', function() {
  fetch('/api/saveProducts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(products)
    })
    .then(response => response.json())
    .then(data => {
      alert('Products saved successfully');
      products = []; // Reset the products array
      document.querySelector('#product-list tbody').innerHTML = ''; // Clear table
      document.getElementById('grand-total').textContent = '0.00'; // Reset total
    })
    .catch(err => console.error('Error:', err));
});
document.getElementById('fetch-products-btn').addEventListener('click', function() {
  fetch('/api/fetchProducts')
    .then(response => response.json())
    .then(products => {
      const tableBody = document.querySelector('#product-list tbody');
      tableBody.innerHTML = ''; // Clear existing table

      products.forEach(product => {
        const row = `<tr>
                    <td>${product.product_name}</td>
                    <td>${product.quantity}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>${product.discount.toFixed(2)}</td>
                    <td>${product.total.toFixed(2)}</td>
                </tr>`;
        tableBody.innerHTML += row;
      });

      // Update the grand total
      const grandTotal = products.reduce((acc, product) => acc + parseFloat(product.total), 0);
      document.getElementById('grand-total').textContent = grandTotal.toFixed(2);
    })
    .catch(err => console.error('Error:', err));
});
let currentValue = ''; // to store digits
let currentOperation = true; // to store selected operation

document.querySelectorAll('#digit-buttons button').forEach(button => {
  button.addEventListener('click', function() {
    currentValue += this.getAttribute('data-value');
    updateDisplay(currentValue);
  });
});

document.querySelectorAll('#arithmetic-symbols button').forEach(button => {
  button.addEventListener('click', function() {
    if (this.id !== 'equals-btn' && this.id !== 'clear-btn') {
      currentOperation = this.textContent;
      currentValue += ' ' + currentOperation + ' ';
      updateDisplay(currentValue);
    } else if (this.id === 'clear-btn') {
      resetCalculator();
    } else {
      // Perform calculation when equals is pressed
      performCalculation();
    }
  });
});

// Function to update the display
function updateDisplay(value) {
  document.getElementById('display-total-price').textContent = value;
}

// Function to reset the calculator
function resetCalculator() {
  currentValue = '';
  currentOperation = null;
  updateDisplay('');
}

// Function to perform the calculation
function performCalculation() {
  try {
    let result = eval(currentValue); // Be cautious with eval in a real-world app
    currentValue = result.toString();
    updateDisplay(result);
  } catch (e) {
    alert('Error in calculation');
  }
}

// Event listener for product-specific calculations
document.getElementById('submit-calculator').addEventListener('click', function() {
  const quantity = parseFloat(document.getElementById('calculator-quantity').value);
  const price = parseFloat(document.getElementById('calculator-price').value);
  const discount = parseFloat(document.getElementById('calculator-discount').value);

  // Validation
  if (isNaN(quantity) || quantity <= 0 || isNaN(price) || price <= 0) {
    alert('Please enter valid quantity and price.');
    return;
  }
  if (isNaN(discount) || discount < 0 || discount > 100) {
    alert('Please enter a valid discount between 0 and 100.');
    return;
  }

  // Calculation
  let totalPrice = quantity * price;
  if (discount > 0) {
    totalPrice -= totalPrice * (discount / 100);
  }

  // Update the display
  document.getElementById('display-total-price').textContent = totalPrice.toFixed(2);
});