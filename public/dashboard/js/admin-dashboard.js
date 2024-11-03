// admin-dashboard.js
const userManagementTable = document.getElementById('user-management-table');
const moderatorManagementTable = document.getElementById('moderator-management-table');

// Populate user data
fetch('/api/users')
  .then((res) => res.json())
  .then((data) => {
    data.forEach((user) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>
          <button>Edit</button>
          <button>Delete</button>
        </td>
      `;
      userManagementTable.appendChild(row);
    });
  });

// Populate moderator data
fetch('/api/moderators')
  .then((res) => res.json())
  .then((data) => {
    data.forEach((moderator) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${moderator.username}</td>
        <td>${moderator.email}</td>
        <td>${moderator.role}</td>
        <td>
          <button>Edit</button>
          <button>Delete</button>
        </td>
      `;
      moderatorManagementTable.appendChild(row);
    });
  });

// Render analytics charts
fetch('/api/analytics')
  .then((res) => res.json())
  .then((data) => {
    const userActivityChart = document.getElementById('user-activity-chart');
    const systemPerformanceChart = document.getElementById('system-performance-chart');

    // Render charts using chart library (e.g., Chart.js)
  });
  
  document.addEventListener('DOMContentLoaded', () => {
  loadUserData();
  loadFlaggedContent();
  loadSupportTickets();
  loadMessages();
  loadProductRecommendations();

  document.getElementById('moderationSettingsForm').addEventListener('submit', saveSettings);
  document.getElementById('sendMessageForm').addEventListener('submit', sendMessage);
});

// Function to load user data
function loadUserData() {
  fetch('../../data/user.json') // Fetch user data from the JSON file
    .then(response => response.json())
    .then(users => {
      const userTable = document.getElementById('userTable').querySelector('tbody');
      users.forEach(user => {
        const row = userTable.insertRow();
        row.innerHTML = `
                    <td>${user.userId}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.status}</td>
                    <td><button onclick="approveUser(${user.userId})">Approve</button></td>
                `;
      });
    })
    .catch(error => console.error('Error loading user data:', error));
}

// Function to load flagged content
function loadFlaggedContent() {
  fetch('../../data/flaggedContent.json') // Change this to your actual flagged content endpoint
    .then(response => response.json())
    .then(contentArray => {
      const contentTable = document.getElementById('contentTable').querySelector('tbody');
      contentArray.forEach(content => {
        const row = contentTable.insertRow();
        row.innerHTML = `
                    <td>${content.contentId}</td>
                    <td>${content.userId}</td>
                    <td>${content.contentType}</td>
                    <td>${content.status}</td>
                    <td><button onclick="resolveContent(${content.contentId})">Resolve</button></td>
                `;
      });
    })
    .catch(error => console.error('Error loading flagged content:', error));
}

// Function to load support tickets
function loadSupportTickets() {
  fetch('../../data/supportTickets.json') // Change this to your actual support tickets endpoint
    .then(response => response.json())
    .then(tickets => {
      const supportTable = document.getElementById('supportTable').querySelector('tbody');
      tickets.forEach(ticket => {
        const row = supportTable.insertRow();
        row.innerHTML = `
                    <td>${ticket.ticketId}</td>
                    <td>${ticket.userId}</td>
                    <td>${ticket.issueDescription}</td>
                    <td>${ticket.status}</td>
                    <td><button onclick="resolveTicket(${ticket.ticketId})">Resolve</button></td>
                `;
      });
    })
    .catch(error => console.error('Error loading support tickets:', error));
}

// Function to load messages
function loadMessages() {
  fetch('../../data/messages.json') // Change this to your actual messages endpoint
    .then(response => response.json())
    .then(messages => {
      const messageList = document.getElementById('messageList');
      messages.forEach(message => {
        const messageItem = document.createElement('div');
        messageItem.textContent = `${message.sender}: ${message.content}`;
        messageList.appendChild(messageItem);
      });
    })
    .catch(error => console.error('Error loading messages:', error));
}

// Function to send a message
function sendMessage(event) {
  event.preventDefault();
  const messageContent = document.getElementById('messageContent').value;

  // Here, you'd typically send this message to your server.
  console.log('Sending message:', messageContent);

  // Clear the input field after sending the message
  document.get

  ElementById('messageContent').value = '';
}

// Function to load product recommendations
function loadProductRecommendations() {
  fetch('../../data/recommendations.json') // Change this to your actual recommendations endpoint
    .then(response => response.json())
    .then(recommendations => {
      const recommendationTable = document.getElementById('recommendationTable').querySelector('tbody');
      recommendations.forEach(recommendation => {
        const row = recommendationTable.insertRow();
        row.innerHTML = `
                    <td>${recommendation.recommendationId}</td>
                    <td>${recommendation.userId}</td>
                    <td>${recommendation.product}</td>
                    <td>${recommendation.status}</td>
                    <td><button onclick="removeRecommendation(${recommendation.recommendationId})">Remove</button></td>
                `;
      });
    })
    .catch(error => console.error('Error loading recommendations:', error));
}

// Function to save moderation settings
function saveSettings(event) {
  event.preventDefault();
  const threshold = document.getElementById('contentThreshold').value;

  // Here, you'd typically send this data to your server to save it.
  console.log('Saving moderation settings:', threshold);
}

// Placeholder functions for resolving content and tickets
function resolveContent(contentId) {
  console.log('Resolving content ID:', contentId);
}

function resolveTicket(ticketId) {
  console.log('Resolving ticket ID:', ticketId);
}

function removeRecommendation(recommendationId) {
  console.log('Removing recommendation ID:', recommendationId);
}