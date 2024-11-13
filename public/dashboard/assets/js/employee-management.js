

// Employee Management JavaScript

// Get HTML elements
const employeeTable = document.getElementById('employee-table');
const attendanceTable = document.getElementById('attendance-table');
const payrollTable = document.getElementById('payroll-table');
const performanceTable = document.getElementById('performance-table');
const trainingTable = document.getElementById('training-table');
const benefitsTable = document.getElementById('benefits-table');
const leaveTable = document.getElementById('leave-table');
const promotionTable = document.getElementById('promotion-table');
const terminationTable = document.getElementById('termination-table');

// Fetch employee data
fetch('/api/employees')
  .then(response => response.json())
  .then(data => {
    data.forEach(employee => {
      const row = `
        <tr>
          <td>${employee.id}</td>
          <td>${employee.name}</td>
          <td>${employee.email}</td>
          <td>${employee.department}</td>
          <td>${employee.designation}</td>
          <td><button onclick="deleteEmployee(${employee.id})">Delete</button></td>
          <td><button onclick="editEmployee(${employee.id})">Edit</button></td>
        </tr>
      `;
      employeeTable.innerHTML += row;
    });
  });

// Fetch attendance data
fetch('/api/attendance')
  .then(response => response.json())
  .then(data => {
    data.forEach(attendance => {
      const row = `
        <tr>
          <td>${attendance.date}</td>
          <td>${attendance.employeeId}</td>
          <td>${attendance.status}</td>
          <td><button onclick="deleteAttendance(${attendance.id})">Delete</button></td>
        </tr>
      `;
      attendanceTable.innerHTML += row;
    });
  });

// Fetch payroll data
fetch('/api/payroll')
  .then(response => response.json())
  .then(data => {
    data.forEach(payroll => {
      const row = `
        <tr>
          <td>${payroll.date}</td>
          <td>${payroll.employeeId}</td>
          <td>${payroll.basicSalary}</td>
          <td>${payroll.allowances}</td>
          <td>${payroll.deductions}</td>
          <td><button onclick="deletePayroll(${payroll.id})">Delete</button></td>
        </tr>
      `;
      payrollTable.innerHTML += row;
    });
  });

// Fetch performance data
fetch('/api/performance')
  .then(response => response.json())
  .then(data => {
    data.forEach(performance => {
      const row = `
        <tr>
          <td>${performance.date}</td>
          <td>${performance.employeeId}</td>
          <td>${performance.rating}</td>
          <td><button onclick="deletePerformance(${performance.id})">Delete</button></td>
        </tr>
      `;
      performanceTable.innerHTML += row;
    });
  });

// Fetch training data
fetch('/api/training')
  .then(response => response.json())
  .then(data => {
    data.forEach(training => {
      const row = `
        <tr>
          <td>${training.date}</td>
          <td>${training.employeeId}</td>
          <td>${training.trainingName}</td>
          <td><button onclick="deleteTraining(${training.id})">Delete</button></td>
        </tr>
      `;
      trainingTable.innerHTML += row;
    });
  });

// Fetch benefits data
fetch('/api/benefits')
  .then(response => response.json())
  .then(data => {
    data.forEach(benefit => {
      const row = `
        <tr>
          <td>${benefit.date}</td>
          <td>${benefit.employeeId}</td>
          <td>${benefit.benefitName}</td>
          <td><button onclick="deleteBenefit(${benefit.id})">Delete</button></td>
        </tr>
      `;
      benefitsTable.innerHTML += row;
    });
  });

// Fetch leave data
fetch('/api/leave')
  .then(response => response.json())
  .then(data => {
    data.forEach(leave => {
      const row = `
        <tr>
          <td>${leave.date}</td>
          <td>${leave.employeeId}</td>
          <td>${leave.leaveType}</td>
          <td><button onclick="deleteLeave(${leave.id})">Delete</button></td>
        </tr>
      `;
      leaveTable.innerHTML += row;
    });
  });

// Fetch promotion data
fetch('/api/promotion')
  .then(response => response.json())
  .then(data => {
    data.forEach(promotion => {
      const row = `
        <tr>
          <td>${promotion.date}</td>
          <td>${promotion.employeeId}</td>
          <td>${promotion.newDesignation}</td>
          <td><button onclick="deletePromotion(${promotion.id})">Delete</button></td>
        </tr>
      `;
      promotionTable.innerHTML += row;
    });
  });

// Fetch termination data
fetch('/api/termination')
  .then(response => response.json())
  .then(data => {
    data.forEach(termination => {
      const row = `
        <tr>
          <td>${termination.date}</td>
          <td>${termination.employeeId}</td>
          <td>${termination.reason}</td>
          <td><button onclick="deleteTermination(${termination.id})">Delete</button></td>
        </tr>
      `;
      terminationTable.innerHTML += row;
    });
  });

// Event listeners for buttons
document.addEventListener('click', function(event) {
  const targetId = event.target.id;
  if (targetId === 'add-employee-btn') {
    addEmployee();
  } else if (targetId === 'add-attendance-btn') {
    addAttendance();
  } else if (targetId === 'add-payroll-btn') {
    addPayroll();
  } else if (targetId === 'add-performance-btn') {
    addPerformance();
  } else if (targetId === 'add-training-btn') {
    addTraining();
  } else if (targetId === 'add-benefits-btn') {
    addBenefits();
  } else if (targetId === 'add-leave-btn') {
    addLeave();
  } else if (targetId === 'add-promotion-btn') {
    addPromotion();
  } else if (targetId === 'add-termination-btn') {
    addTermination();
  }
});

// Functions to add new data (examples shown, repeat pattern for all add functions)
function addEmployee() {
  const name = document.getElementById('name-input').value;
  const email = document.getElementById('email-input').value;
  const department = document.getElementById('department-input').value;
  const designation = document.getElementById('designation-input').value;

  fetch('/api/employees', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, department, designation }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      location.reload();
    });
}

// Functions to delete data (examples shown, repeat pattern for all delete functions)
function deleteEmployee(id) {
  fetch(`/api/employees/${id}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      location.reload();
    });
}

// Functions to edit data (examples shown, repeat pattern for all edit functions)
function editEmployee(id) {
  const name = document.getElementById('name-input').value;
  const email = document.getElementById('email-input').value;
  const department = document.getElementById('department-input').value;
  const designation = document.getElementById('designation-input').value;

  fetch(`/api/employees/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, department, designation }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      location.reload();
    });
}

// Function to display employee details
function displayEmployeeDetails(id) {
  fetch(`/api/employees/${id}`)
    .then(response => response.json())
    .then(data => {
      const employeeDetails = `
        <h2>Employee Details</h2>
        <p>Name: ${data.name}</p>
        <p>Email: ${data.email}</p>
        <p>Department: ${data.department}</p>
        <p>Designation: ${data.designation}</p>
      `;
      document.getElementById('employee-details').innerHTML = employeeDetails;
    });
}

// Function to display attendance details
function displayAttendanceDetails(id) {
  fetch(`/api/attendance/${id}`)
    .then(response => response.json())
    .then(data => {
      const attendanceDetails = `
        <h2>Attendance Details</h2>
        <p>Date: ${data.date}</p>
        <p>Employee ID: ${data.employeeId}</p>
        <p>Status: ${data.status}</p>
      `;
      document.getElementById('attendance-details').innerHTML = attendanceDetails;
    });
}

// Ensure IDs for details buttons are set correctly
document.getElementById('employee-details-btn').addEventListener('click', function() {
  const id = document.getElementById('employee-id-input').value;
  displayEmployeeDetails(id);
});

document.getElementById('attendance-details-btn').addEventListener('click', function() {
  const id = document.getElementById('attendance-id-input').value;
  displayAttendanceDetails(id);
});