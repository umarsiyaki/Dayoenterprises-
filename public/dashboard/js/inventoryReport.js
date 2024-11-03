// Fetch real-time stock levels
function fetchRealTimeStock() {
    fetch('/api/real-time-stock')
        .then(response => response.json())
        .then(data => {
            const stockLevelList = document.getElementById('stockLevelList');
            stockLevelList.innerHTML = ''; // Clear existing stock levels
            data.forEach(product => {
                const row = `<tr><td>${product.id}</td><td>${product.name}</td>
                             <td>${product.stock}</td></tr>`;
                stockLevelList.innerHTML += row;
            });
        });
}

// Fetch profitability analysis
function fetchProfitabilityAnalysis() {
    fetch('/api/profitability-analysis')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('profitChart').getContext('2d');
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.map(item => item.productName),
                    datasets: [{
                        label: 'Profit Margin',
                        data: data.map(item => item.profitMargin),
                    }],
                },
            });
        });
}

// Call these functions on page load
fetchRealTimeStock();
fetchProfitabilityAnalysis();
