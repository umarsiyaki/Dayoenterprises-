
// Function to simulate real-time payroll analytics
function loadPayrollAnalytics() {
    const analyticsData = {
        totalSalary: 500000,
        totalBonuses: 12000,
        totalDeductions: 7000
    };

    document.getElementById('payrollAnalytics').innerHTML = `
        <p>Total Salary Paid: $${analyticsData.totalSalary}</p>
        <p>Total Bonuses: $${analyticsData.totalBonuses}</p>
        <p>Total Deductions: $${analyticsData.totalDeductions}</p>
    `;
}

// Run analytics upon page load
loadPayrollAnalytics();