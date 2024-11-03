// Function to filter customers by segment
function filterCustomersBySegment() {
  const segmentType = document.getElementById('segmentType').value;

  fetch(`/api/customers/segment/${segmentType}`)
    .then(response => response.json())
    .then(data => {
      const segmentedList = document.getElementById('segmentedCustomerList');
      segmentedList.innerHTML = ''; // Clear existing list
      data.forEach(customer => {
        const row = `<tr><td>${customer.id}</td><td>${customer.name}</td>
                             <td>${customer.totalPurchases}</td></tr>`;
        segmentedList.innerHTML += row;
      });
    });
}

// Event listener for feedback form
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const customerId = document.getElementById('feedbackCustomer').value;
  const feedbackText = document.getElementById('feedbackText').value;

  // Make an API call to submit feedback
  fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId, feedback: feedbackText }),
    })
    .then(response => response.json())
    .then(data => {
      alert('Feedback submitted successfully!');
      closeModal('feedbackModal');
    });
});