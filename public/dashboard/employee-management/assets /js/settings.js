
document.getElementById('settingsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const notifications = document.getElementById('notifications').checked;
    saveSettings({ username, email, notifications });
});

function saveSettings(settings) {
    // Simulated save function
    console.log('Settings saved:', settings);
    alert('Settings updated successfully!');
}