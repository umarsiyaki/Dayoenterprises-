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