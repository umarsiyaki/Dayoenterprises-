// Fetch employee performance data
function fetchEmployeePerformance() {
  fetch('/api/employee-performance')
    .then(response => response.json())
    .then(data => {
      // Populate performance chart with data
      const ctx = document.getElementById('performanceChart').getContext('2d');
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(emp => emp.name),
          datasets: [{
            label: 'Sales Performance',
            data: data.map(emp => emp.sales),
                    }],
        },
      });
    });
}

// Fetch employee notifications
function fetchEmployeeNotifications() {
  fetch('/api/notifications')
    .then(response => response.json())
    .then(data => {
      const notificationList = document.getElementById('notificationList');
      notificationList.innerHTML =

        ''; // Clear existing notifications
      data.forEach(notification => {
        const li = document.createElement('li');
        li.textContent = notification.message;
        notificationList.appendChild(li);
      });
    });
}

// Call these functions on page load
fetchEmployeePerformance();
fetchEmployeeNotifications();