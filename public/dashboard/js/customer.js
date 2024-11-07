
// Import necessary libraries
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// Function to filter customers by segment
function filterCustomersBySegment() {
    const segmentType = document.getElementById('segmentType').value;
    fetch(`/api/customers/segment/${segmentType}`)
        .then(response => response.json())
        .then(data => {
            const segmentedList = document.getElementById('segmentedCustomerList');
            segmentedList.innerHTML = '';
            // Clear existing list
            data.forEach(customer => {
                const row = `
                    <tr>
                        <td>${customer.Id}</td>
                        <td>${customer.name}</td>
                        <td>${customer.totalPurchases}</td>
                        <td>${customer.averageOrderValue}</td>
                    </tr>
                `;
                segmentedList.innerHTML += row;
            });
        });
}

// Event listener for filter button
document.getElementById('filterButton').addEventListener('click', filterCustomersBySegment);

// Function to open feedback modal
function openFeedbackModal() {
    document.getElementById('feedbackModal').style.display = 'block';
}

// Event listener for open feedback modal button
document.getElementById('openFeedbackModal').addEventListener('click', openFeedbackModal);

// Function to close feedback modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Event listener for close feedback modal button
document.querySelector('.close').addEventListener('click', function() {
    closeModal('feedbackModal');
});

// Event listener for feedback form submission
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const customerId = document.getElementById('feedbackCustomer').value;
    const feedbackText = document.getElementById('feedbackText').value;
    const feedbackRating = document.getElementById('feedbackRating').value;
    // Make an API call to submit feedback
    fetch('/api/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            customerId,
            feedback: feedbackText,
            rating: feedbackRating
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Feedback submitted successfully!');
        closeModal('feedbackModal');
    });
});

// Populate customer select options
fetch('/api/customers')
    .then(response => response.json())
    .then(data => {
        const customerSelect = document.getElementById('feedbackCustomer');
        data.forEach(customer => {
            const option = document.createElement('option');
            option.value = (rating);
            option.text = customer.name;
            customerSelect.appendChild(option);
        });
    });

// Create chart
const chartContainer = document.getElementById('insightsChart');
const chart = new Chart(chartContainer, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
            label: 'Customer Insights',
            data: [10, 20, 15, 30, 25],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
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

//Uncaught SyntaxError: Cannot use import statement outside a module