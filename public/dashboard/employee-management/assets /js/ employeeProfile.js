
function loadRoleBasedFeatures(role) {
    if (role === 'Admin') {
        document.getElementById('adminSection').style.display = 'block';
    } else if (role === 'Cashier') {
        document.getElementById('cashierSection').style.display = 'block';
    } else {
        document.getElementById('employeeSection').style.display = 'block';
    }
}

document.getElementById('profileForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const position = document.getElementById('position').value;
    const department = document.getElementById('department').value;
    updateUserProfile({ fullName, position, department });
});

function updateUserProfile(profile) {
    console.log('Profile updated:', profile);
    alert('Profile updated successfully!');
}