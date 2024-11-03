
// Sidebar toggle functionality
document.getElementById("toggle-sidebar-btn").addEventListener("click", function () {
    var sidebar = document.getElementById("mySidebar");
    var mainContent = document.getElementById("main-content");

    if (sidebar.classList.contains("sidebar-active")) {
        sidebar.classList.remove("sidebar-active");
        mainContent.style.marginLeft = "0";
    } else {
        sidebar.classList.add("sidebar-active");
        mainContent.style.marginLeft = "250px";
    }
});

// Sidebar close button functionality
function closeNav() {
    var sidebar = document.getElementById("mySidebar");
    var mainContent = document.getElementById("main-content");
    sidebar.classList.remove("sidebar-active");
    mainContent.style.marginLeft = "0";
}

// Sidebar open button functionality
function openNav() {
    var sidebar = document.getElementById("mySidebar");
    var mainContent = document.getElementById("main-content");
    sidebar.classList.add("sidebar-active");
    mainContent.style.marginLeft = "250px";
}

// Notifications Dropdown Toggle
var notificationDropdown = document.getElementById('notificationDropdown');
notificationDropdown.addEventListener('click', function () {
    var notificationMenu = notificationDropdown.nextElementSibling;
    if (notificationMenu.style.display === 'block') {
        notificationMenu.style.display = 'none';
    } else {
        notificationMenu.style.display = 'block';
    }
});

// Messages Dropdown Toggle
var messageDropdown = document.getElementById('messageDropdown');
messageDropdown.addEventListener('click', function () {
    var messageMenu = messageDropdown.nextElementSibling;
    if (messageMenu.style.display === 'block') {
        messageMenu.style.display = 'none';
    } else {
        messageMenu.style.display = 'block';
    }
});

// Collapsible Navbar for Mobile
document.querySelector('.navbar-toggler').addEventListener('click', function () {
    var navbarCollapse = document.querySelector('.navbar-collapse');
    navbarCollapse.classList.toggle('show');
})