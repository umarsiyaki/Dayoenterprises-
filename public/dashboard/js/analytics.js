// Sidebar toggle functionality
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('sidebar-active');
  document.querySelector('#main-content').classList.toggle('content-shifted');
}

// Simulate dynamic notification count
const notificationCount = document.getElementById('notification-count');
let notifications = 3;
notificationCount.innerText = notifications;

// Function to update notifications
function updateNotifications() {
  const notificationContent = document.getElementById('notificationSectionId');
  notificationContent.innerHTML = '';
  
  // Dynamically populate notifications
  for (let i = 1; i <= notifications; i++) {
    const notification = document.createElement('a');
    notification.href = "#";
    notification.innerText = `New Notification ${i}`;
    notificationContent.appendChild(notification);
  }
}

// Search functionality
document.getElementById('searchBtn').addEventListener('click', function() {
  const searchQuery = document.getElementById('globalSearch').value.toLowerCase();
  if (searchQuery.trim()) {
    alert(`Searching for "${searchQuery}"...`);
    // Execute search logic here
  } else {
    alert("Please enter a search term.");
  }
});

// Dynamic analytics filtering
document.getElementById('salesRegion').addEventListener('change', function() {
  const region = this.value;
  console.log(`Filtering by region: ${region}`);
  // Logic to filter analytics data by region goes here
});

document.getElementById('timeRange').addEventListener('change', function() {
  const timeRange = this.value;
  console.log(`Filtering by time range: ${timeRange}`);
  // Logic to filter analytics data by time range goes here
});

document.getElementById('paymentMethod').addEventListener('change', function() {
  const method = this.value;
  console.log(`Filtering by payment method: ${method}`);
  // Logic to filter analytics data by payment method goes here
});

// Report generation function
document.getElementById('generateReportBtn').addEventListener('click', function() {
  const reportTableBody = document.querySelector('#reportTable tbody');
  reportTableBody.innerHTML = ''; // Clear previous report data
  
  // Mock data generation for report table
  const sampleData = [
    { product: 'Product A', sales: 100, region: 'Sisimusu', payment: 'Cash', date: '2024-10-25' },
    { product: 'Product B', sales: 200, region: 'Main Market', payment: 'POS', date: '2024-10-26' },
    { product: 'Product C', sales: 150, region: 'Roundabout', payment: 'Bank Transfer', date: '2024-10-27' },
  ];

  sampleData.forEach(data => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${data.product}</td>
      <td>${data.sales}</td>
      <td>${data.region}</td>
      <td>${data.payment}</td>
      <td>${data.date}</td>
    `;
    reportTableBody.appendChild(row);
  });
  
  alert('Report generated successfully!');
});

// Load notifications on page load 
window.onload = updateNotifications;                    const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const rateLimit = require('express-rate-limit');
const { v4: uuidv4 } = require('uuid');

// Middleware
app.use(express.json());
app.use(rateLimit({ windowMs: 1 * 60 * 1000, max: 100 }));

// Utility function for JSON data management
const readData = (filePath) => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'data', filePath), 'utf-8'));
};

const writeData = (filePath, data) => {
    fs.writeFileSync(path.join(__dirname, 'data', filePath), JSON.stringify(data, null, 2));
};

// 1. Real-Time Notifications (Server-Sent Events for orders and messages)
app.get('/notifications', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    setInterval(() => {
        const notifications = readData('Messages.json');
        res.write(`data: ${JSON.stringify(notifications)}\n\n`);
    }, 5000);
});

// 2. CRUD for Messages
app.get('/messages', (req, res) => {
    const messages = readData('Messages.json');
    res.json(messages);
});

app.post('/messages', (req, res) => {
    const newMessage = { id: uuidv4(), ...req.body, timestamp: new Date().toISOString(), status: 'unread' };
    const messages = readData('Messages.json');
    messages.push(newMessage);
    writeData('Messages.json', messages);
    res.status(201).json(newMessage);
});

// 3. CRUD for Orders
app.get('/orders', (req, res) => {
    const orders = readData('Orders.json');
    res.json(orders);
});

app.post('/orders', (req, res) => {
    const newOrder = { orderId: uuidv4(), ...req.body, timestamp: new Date().toISOString(), status: 'pending' };
    const orders = readData('Orders.json');
    orders.push(newOrder);
    writeData('Orders.json', orders);
    res.status(201).json(newOrder);
});

// 4. Auto Invoice Generation
app.post('/generate-receipt/:orderId', (req, res) => {
    const orders = readData('Orders.json');
    const order = orders.find(o => o.orderId === req.params.orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const newReceipt = { ...order, receiptId: uuidv4(), isReceiptGenerated: true, status: 'paid' };
    const receipts = readData('Receipt.json');
    receipts.push(newReceipt);
    writeData('Receipt.json', receipts);

    res.json(newReceipt);
});

// 5. Advanced Search for Blogging
app.get('/blogs/search', (req, res) => {
    const { query } = req.query;
    const blogs = readData('Blogging.json');
    const results = blogs.filter(blog => blog.title.includes(query) || blog.content.includes(query));
    res.json(results);
});

// 6. Real-Time Inventory Tracking
app.get('/inventory', (req, res) => {
    const inventory = readData('Inventory.json');
    res.json(inventory);
});

app.patch('/inventory/settings', (req, res) => {
    const inventory = readData('Inventory.json');
    inventory.settings = { ...inventory.settings, ...req.body };
    writeData('Inventory.json', inventory);
    res.json(inventory.settings);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});// Fetch key metrics for analytics dashboard
function fetchKeyMetrics() {
  fetch('/api/key-metrics')
    .then(response => response.json())
    .then(data => {
      document.getElementById('totalSales').textContent = data.totalSales;
      document.getElementById('totalCustomers').textContent = data.totalCustomers;
      document.getElementById('totalInventoryValue').textContent = data.totalInventoryValue;
    });
}

// Open modal for custom report generation
function openCustomReportModal() {
  // Code to open a modal where users can set report parameters
}

// Call this function on page load
fetchKeyMetrics();


