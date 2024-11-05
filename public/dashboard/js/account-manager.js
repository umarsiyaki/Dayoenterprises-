// Cache and Config
let cache = { accounts: null, lastFetch: 0 };
const CACHE_EXPIRATION = 300000; // 5 minutes
const PAGE_LIMIT = 10; // Items per page

// Pagination
let currentPage = 1;

// Account list element and filter
const accountList = document.getElementById('account-list');
const accountTypeFilter = document.getElementById('accountTypeFilter');
const searchAccountId = document.getElementById('searchAccountId');

// Throttled search function to improve performance
const throttleSearch;
let searchTimeout;
function throttleSearch() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(advancedSearch, 300);
}

// Load accounts data from API
async function loadAccounts() {
    try {
        const now = Date.now();
        
        // Use cache if data is not expired
        if (cache.accounts && (now - cache.lastFetch) < CACHE_EXPIRATION) {
            renderAccounts(getPaginatedData(cache.accounts));
            return;
        }

        const response = await fetch('/api/accounts');
        if (!response.ok) throw new Error('Failed to fetch account data.');

        const accounts = await response.json();
        cache = { accounts, lastFetch: now }; // Update cache
        renderAccounts(getPaginatedData(accounts));
    } catch (error) {
        console.error('Error loading accounts:', error);
        accountList.innerHTML = `<tr><td colspan="4">Failed to load account data.</td></tr>`;
    }
}

// Render accounts table with pagination
function renderAccounts(accounts) {
    accountList.innerHTML = accounts.map(account => `
        <tr>
            <td>${account.id}</td>
            <td>${account.accountType}</td>
            <td>NGN ${account.balance.toLocaleString()}</td>
            <td>
                <button onclick="editAccountType(${account.id})">Edit Type</button>
                <button onclick="updateBalance(${account.id})">Update Balance</button>
                <button onclick="deleteAccount(${account.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Pagination: Get accounts for the current page
function getPaginatedData(accounts) {
    const start = (currentPage - 1) * PAGE_LIMIT;
    return accounts.slice(start, start + PAGE_LIMIT);
}

// Next page
function nextPage() {
    if ((currentPage * PAGE_LIMIT) < cache.accounts.length) {
        currentPage++;
        renderAccounts(getPaginatedData(cache.accounts));
    }
}

// Previous page
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        renderAccounts(getPaginatedData(cache.accounts));
    }
}

// Filter accounts by type
function filterAccounts() {
    const filter = accountTypeFilter.value;
    const filteredAccounts = filter === 'all' ? cache.accounts : cache.accounts.filter(account => account.accountType === filter);
    renderAccounts(getPaginatedData(filteredAccounts));
}

// Advanced Search: Combination of ID search and Account Type filter
function advancedSearch() {
    const filterType = accountTypeFilter.value;
    const query = searchAccountId.value.trim();

    let filteredAccounts = cache.accounts;

    if (filterType !== 'all') {
        filteredAccounts = filteredAccounts.filter(account => account.accountType === filterType);
    }

    if (query) {
        filteredAccounts = filteredAccounts.filter(account => account.id.toString().includes(query));
    }

    renderAccounts(getPaginatedData(filteredAccounts));
}

// Edit account type
async function editAccountType(id) {
    const accountType = prompt('Enter new account type (customer, user, cash/moderator, admin):');
    if (accountType) {
        try {
            const response = await fetch(`/api/accounts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ accountType })
            });
            if (!response.ok) throw new Error('Failed to update account.');

            cache.accounts = null; // Clear cache to force reload
            await loadAccounts();
        } catch (error) {
            console.error('Error updating account:', error);
            alert('Failed to update account.');
        }
    }
}

// Update account balance
async function updateBalance(id) {
    const newBalance = prompt('Enter the new balance:');
    if (newBalance) {
        try {
            const response = await fetch(`/api/accounts/${id}/balance`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ balance: parseFloat(newBalance) })
            });
            if (!response.ok) throw new Error('Failed to update balance.');

            cache.accounts = null; // Clear cache to force reload
            await loadAccounts();
        } catch (error) {
            console.error('Error updating balance:', error);
            alert('Failed to update balance.');
        }
    }
}

// Delete account
async function deleteAccount(id) {
    if (confirm('Are you sure you want to delete this account?')) {
        try {
            const response = await fetch(`/api/accounts/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete account.');

            cache.accounts = cache.accounts.filter(account => account.id !== id);
            renderAccounts(getPaginatedData(cache.accounts));
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('Failed to delete account.');
        }
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', loadAccounts);

// Attach event listeners for search input and filter
searchAccountId.addEventListener('input', throttleSearch);
accountTypeFilter.addEventListener('change', advancedSearch);
