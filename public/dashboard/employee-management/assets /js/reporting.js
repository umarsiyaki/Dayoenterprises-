
// Assuming Chart.js is imported in the project
function loadCharts() {
    const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
    new Chart(attendanceCtx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April'],
            datasets: [{
                label: 'Attendance Rate',
                data: [85, 90, 78, 95],
                borderColor: 'blue',
                fill: false
            }]
        }
    });

    const payrollCtx = document.getElementById('payrollChart').getContext('2d');
    new Chart(payrollCtx, {
        type: 'bar',
        data: {
            labels: ['John', 'Jane', 'Alex', 'Mary'],
            datasets: [{
                label: 'Monthly Payroll',
                data: [5000, 6000, 5500, 6200],
                backgroundColor: 'green'
            }]
        }
    });
}

// Call loadCharts on document load
document.addEventListener('DOMContentLoaded', loadCharts);