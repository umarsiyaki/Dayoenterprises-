
document.addEventListener('DOMContentLoaded', () => {
    loadAccounts(); // Load account data when the page loads
});

// Fetch and display accounts
async function loadAccounts() {
    const response = await fetch('/api/accounts');
    const accounts = await response.json();
    const tableBody = document.getElementById('account-list');
    tableBody.innerHTML = ''; // Clear existing rows

    accounts.forEach(account => {
        const row = `<tr>
          <td>${account.id}</td>
          <td>${account.accountType}</td>
          <td>NGN ${account.balance.toLocaleString()}</td>
          <td>
            <button onclick="editAccountType(${account.id})">Edit</button>
            <button onclick="deleteAccount(${account.id})">Delete</button>
          </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Handle account type editing
function editAccountType(id) {
    const accountType = prompt('Enter new account type (customer, user, cash/moderator, admin):');
    if (accountType) {
        fetch(`/api/accounts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accountType })
        }).then(loadAccounts);
    }
}

// Handle account deletion
function deleteAccount(id) {
    if (confirm('Are you sure you want to delete this account?')) {
        fetch(`/api/accounts/${id}`, { method: 'DELETE' })
            .then(loadAccounts);
    }
}

// Filter accounts by type
function filterAccounts() {
    const filter = document.getElementById('accountTypeFilter').value;
    loadAccounts(); // Refresh account list before filtering

    setTimeout(() => {
        const rows = document.querySelectorAll('#account-list tr');
        rows.forEach(row => {
            const accountType = row.children[1].textContent;
            if (filter !== 'all' && accountType !== filter) {
                row.style.display = 'none';
            } else {
                row.style.display = '';
            }
        });
    }, 100); // Add a slight delay to ensure rows have loaded
}