// moderator-dashboard.js
const userManagementTable = document.getElementById('user-management-table');
const contentManagementTable = document.getElementById('content-management-table');
const commentManagementTable = document.getElementById('comment-management-table');

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

// Populate content data
fetch('/api/content')
  .then((res) => res.json())
  .then((data) => {
    data.forEach((content) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${content.title}</td>
        <td>${content.author}</td>
        <td>${content.date}</td>
        <td>
          <button>Edit</button>
          <button>Delete</button>
        </td>
      `;
      contentManagementTable.appendChild(row);
    });
  });

// Populate comment data
fetch('/api/comments')
  .then((res) => res.json())
  .then((data) => {
      data.forEach((comment) => {
            const row = document.createElement('tr');
            row.innerHTML = `
        <td>${comment.comment}</td>
        <td>${comment.author}</td>
        <td>${comment.date}</td>
        <td>
          <button>Edit</button>
          <button>Delete</button>
        </td>