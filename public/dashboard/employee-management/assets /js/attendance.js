
// attendance.js
export function markAttendance(employeeId, status) {
    // Perform attendance update
    fetch(`/api/attendance/mark`, {
        method: 'POST',
        body: JSON.stringify({ employeeId, status }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Attendance marked successfully!');
            loadAttendanceData();
        }
    });
}

export function loadAttendanceData() {
    fetch('/api/attendance')
        .then(response => response.json())
        .then(data => {
            const attendanceTable = document.getElementById('attendanceTableBody');
            attendanceTable.innerHTML = ''; // Clear table before adding rows
            data.forEach(record => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${record.employeeName}</td>
                    <td>${record.checkIn}</td>
                    <td>${record.checkOut}</td>
                    <td>${record.status}</td>
                    <td><button onclick="markAttendance('${record.employeeId}', 'Present')">Mark Present</button></td>
                `;
                attendanceTable.appendChild(row);
            });
        });
}

document.getElementById('markAttendanceBtn').addEventListener('click', () => {
  const employeeId = document.getElementById('employeeSelect').value;
  fetch('/api/attendance/mark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employee_id: employeeId, status: 'Present' }),
    })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      loadAttendanceData();
    })
    .catch((error) => console.error('Error:', error));
});

function loadAttendanceData() {
  const employeeId = document.getElementById('employeeSelect').value;
  fetch(`/api/attendance/${employeeId}`)
    .then((response) => response.json())
    .then((data) => {
      const attendanceTable = document.getElementById('attendanceTable');
      attendanceTable.innerHTML = '';
      data.forEach((record) => {
        const row = `<tr>
                    <td>${record.employee_name}</td>
                    <td>${record.check_in}</td>
                    <td>${record.status}</td>
                </tr>`;
        attendanceTable.innerHTML += row;
      });
    });
}

document.getElementById('assignTasks').addEventListener('click', () => {
  openModal('taskModal');
});

document.getElementById('viewExecutiveOrders').addEventListener('click', () => {
  openModal('executiveOrdersModal');
  loadExecutiveOrders();
});

function loadExecutiveOrders() {
  // Simulate loading executive orders from a database
  const orders = [
    { date: '2024-01-15', order: 'Reduce overtime by 15%' },
    { date: '2024-02-10', order: 'Improve training for cashiers' },
        // more orders...
    ];

  const orderList = document.getElementById('executiveOrderList');
  orderList.innerHTML = ''; // Clear existing list
  orders.forEach(order => {
    const item = document.createElement('li');
    item.textContent = `${order.date}: ${order.order}`;
    orderList.appendChild(item);
  });
}

// Task assignment functionality
document.getElementById('taskForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const employeeName = document.getElementById('employeeName').value;
  const taskDetails = document.getElementById('taskDetails').value;
  assignTaskToEmployee(employeeName, taskDetails);
});

function assignTaskToEmploy <div class = "card" >
<h2>Payroll Processing & Analysis</h2> <
div id = "payrollAnalytics" >
  <!-- Dynamic charts will display salary distributions, bonuses, etc. -->
    </div> <table id = "payrollTable" >
  <thead>
            <tr>
                <th>Employee Name</th>
                <th>Salary</th>
                <th>Bonus</th>
                <th>Deductions</th>
                <th>Total Pay</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead> <
  tbody >
  <!-- Payroll data will be dynamically injected -->
        </tbody> <
  /table> <
  button id = "processPayrollBtn"
class = "btn-primary" > Process Payroll < /button> <
  /div>ee(name, task) {
// Code to assign the task to the specified employee
alert(`Task "${task}" assigned to ${name}`);
}