document.getElementById('performanceForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('employeeName').value;
  const rating = document.getElementById('performanceRating').value;
  const comments = document.getElementById('comments').value;
  savePerformanceRecord(name, rating, comments);
});

function savePerformanceRecord(name, rating, comments) {
  // Code to save performance data in database (simulated)
  alert(`Performance saved for ${name} with rating ${rating}`);
  loadPerformanceHistory();
}

// Mock load function for performance history
function loadPerformanceHistory() {
  const history = [
    { name: 'John Doe', rating: 'Excellent', comments: 'Great work!', date: '2024-03-14' },
        // more history records...
    ];

  const tableBody = document.getElementById('performanceHistoryTable').querySelector('tbody');
  tableBody.innerHTML = ''; // Clear table first
  history.forEach(entry => {
    const row = document.createElement('tr');
    row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.rating}</td>
            <td>${entry.comments}</td>
            <td>${entry.date}</td>
        `;
    tableBody.appendChild(row);
  });
}

// Run history load on page load
loadPerformanceHistory();