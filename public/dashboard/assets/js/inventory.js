// Function to fetch suppliers
function fetchSuppliers() {
  fetch('/api/suppliers')
    .then(response => response.json())
    .then(data => {
      const supplierList = document.getElementById('supplierList');
      supplierList.innerHTML = ''; // Clear existing suppliers
      data.forEach(supplier => {
        const row = `<tr><td>${supplier.id}</td><td>${supplier.name}</td>
                             <td>${supplier.contactInfo}</td>
                             <td><button onclick="deleteSupplier(${supplier.id})">Delete</button></td></tr>`;
        supplierList.innerHTML += row;
      });
    });
}

// Function to delete a supplier
function deleteSupplier(supplierId) {
  if (confirm('Are you sure you want to delete this supplier?')) {
    fetch(`/api/delete-supplier/${supplierId}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          fetchSuppliers(); // Refresh supplier list
          alert('Supplier deleted successfully');
        }
      });
  }
}

// Call this function on page load
fetchSuppliers();