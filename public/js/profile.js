// IPinfo API token
const ipInfoToken = '74051fb6a07fc7';

// Login function
async function login(username, password) {
    const response = await fetch('/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const result = await response.json();
    if (response.ok) {
        alert('Login successful');
        await checkDeviceAndIP(result.user); // Check IP/Device on login
    } else {
        alert(result.message);
    }
}

// Register function
async function register(username, password, email, role) {
    const response = await fetch('/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email, role })
    });
    const result = await response.json();
    if (response.ok) {
        alert('Registration successful');
        // Redirect or update UI
    } else {
        alert(result.message);
    }
}

// Update profile function
async function updateProfile(username, email) {
    const response = await fetch('/users/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email })
    });
    const result = await response.json();
    if (response.ok) {
        alert('Profile updated successfully');
    } else {
        alert(result.message);
    }
}
const sessionTimeouts = {}; // Store user session timeouts

function createSession(userId) {
  sessionStore[userId] = { createdAt: Date.now() };
  // Set session to expire in 30 minutes
  sessionTimeouts[userId] = setTimeout(() => {
    delete sessionStore[userId];
    console.log(`Session for user ${userId} has expired.`);
  }, 1800000);
}

function extendSession(userId) {
  if (sessionTimeouts[userId]) {
    clearTimeout(sessionTimeouts[userId]);
    createSession(userId); // Recreate session with a new timeout
  }
}
// Function to handle adding notifications
async function addNotification(userId, message, type) {
    const response = await fetch('/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, message, type })
    });
    const result = await response.json();
    if (response.ok) {
        alert('Notification added');
    } else {
        alert(result.message);
    }
}

// Function to track daily, weekly, and monthly revenue
async function fetchRevenue(period) {
    const response = await fetch(`/revenue/${period}`);
    const result = await response.json();
    if (response.ok) {
        console.log('Revenue data:', result);
    } else {
        alert(result.message);
    }
}

// Function to handle password reset
async function resetPassword(token, newPassword) {
    const response = await fetch('/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
    });
    const result = await response.json();
    if (response.ok) {
        alert('Password reset successful');
    } else {
        alert(result.message);
    }
}

// Function to handle printing receipts
async function printReceipt(receiptId) {
    const response = await fetch(`/receipts/${receiptId}/print`);
    const result = await response.json();
    if (response.ok) {
        alert('Receipt printed');
    } else {
        alert(result.message);
    }
}

// Function to handle receipt deletion
async function deleteReceipt(receiptId) {
    const response = await fetch(`/receipts/${receiptId}`, {
        method: 'DELETE'
    });
    const result = await response.json();
    if (response.ok) {
        alert('Receipt deleted');
    } else {
        alert(result.message);
    }
}

// Place order function
async function placeOrder(userId, total) {
    const response = await fetch('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, total })
    });
    const result = await response.json();
    if (response.ok) {
        alert('Order placed successfully');
    } else {
        alert(result.message);
    }
}

// IP Tracking and Store Location Integration
async function getNearestStore() {
    const ipInfoResponse = await fetch(`https://ipinfo.io/json?token=${ipInfoToken}`);
    const locationData = await ipInfoResponse.json();

    if (locationData && locationData.city) {
        const userLocation = locationData.loc.split(','); // lat, long
        const userLat = parseFloat(userLocation[0]);
        const userLong = parseFloat(userLocation[1]);

        // Store locations in Kaiama, Kwara State ( locations)
        const stores = [
            { name: 'Store 1', lat: 8.998, long: 5.010 },
            { name: 'Store 2', lat: 9.003, long: 5.020 },
            { name: 'Store 3', lat: 9.007, long: 5.030 }
        ];

        let nearestStore = null;
        let minDistance = Infinity;

        stores.forEach(store => {
            const distance = getDistance(userLat, userLong, store.lat, store.long);
            if (distance < minDistance) {
                minDistance = distance;
                nearestStore = store;
            }
        });

        if (nearestStore) {
            alert(`Nearest store: ${nearestStore.name}`);
            loadGoogleMap(userLat, userLong, nearestStore.lat, nearestStore.long);
        }
    } else {
        alert('Unable to fetch location data.');
    }
}

// Calculate distance between two lat/long points (Haversine formula)
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

// Load Google Maps
function loadGoogleMap(userLat, userLong, storeLat, storeLong) {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: userLat, lng: userLong },
        zoom: 13,
    });

    new google.maps.Marker({
        position: { lat: userLat, lng: userLong },
        map,
        title: "Your Location",
    });

    new google.maps.Marker({
        position: { lat: storeLat, lng: storeLong },
        map,
        title: "Nearest Store",
    });
}

// Role-Based Dashboard Management
function redirectToDashboard(user) {
    switch (user.role) {
        case 'user':
            window.location.href = 'user.html';
            break;
        case 'cashier':
            window.location.href = 'cashier.html';
            break;
        case 'admin':
            window.location.href = 'admin.html';
            break;
        default:
            alert('No role found. Please contact support.');
    }
}

// Device/IP Check and OTP Authentication
async function checkDeviceAndIP(user) {
    const storedIP = user.lastLoginIP;
    const storedDevice = user.lastDevice;

    const ipInfoResponse = await fetch(`https://ipinfo.io/json?token=${ipInfoToken}`);
    const locationData = await ipInfoResponse.json();
    const currentIP = locationData.ip;
    const currentDevice = navigator.userAgent;

    if (storedIP !== currentIP || storedDevice !== currentDevice) {
        requestOTP(user);
    } else {
        redirectToDashboard(user);
    }
}

// OTP Request
function requestOTP(user) {
    alert('New device or IP detected. OTP verification required.');
    // OTP verification logic here
}

// Social Media Login (Google and Facebook)
function handleGoogleSignIn(response) {
    // Process Google Sign-In response
    console.log('Google Sign-In response:', response);
}

function handleFacebookSignIn(response) {
    // Process Facebook Sign-In response
    console.log('Facebook Sign-In response:', response);
}

// Share Files via Facebook
function shareOnFacebook(url) {
    FB.ui({
        method: 'share',
        href: url,
    }, function(response) {
        if (response && !response.error_message) {
            alert('File shared successfully.');
        } else {
            alert('Error while sharing.');
        }
    });
}

// Example usage of nearest store tracking
getNearestStore();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).json({ message: 'File uploaded successfully', file: req.file });
});

router.post('/verify-mfa', async (req, res) => {
    const { userId, mfaCode } = req.body;
    const isValid = await mfaService.verifyMFA(userId, mfaCode);
    if (isValid) {
        return res.status(200).json({ message: 'MFA verified, access granted.' });
    } else {
        return res.status(400).json({ message: 'Invalid MFA code.' });
    }
});
```

### 9. **Report Generation for Admins**

Admins can generate detailed reports (e.g., revenue, user activity, etc.) and download them in CSV or PDF format.

**Backend Report Generation:**

```javascript
router.get('/generate-report', checkRole(['admin']), (req, res) => {
    const reportData = generateReport(); // function to generate report data
    res.status(200).json(reportData);
});
```

**CSV Generation Example:**

```javascript
const { Parser } = require('json2csv');

function generateReport() {
    const report = [
        { userId: 1, action: 'Login', timestamp: '2024-10-10' },
        { userId: 2, action: 'Purchase', timestamp: '2024-10-11' },
        // More data
    ];

    const parser = new Parser();
    const csv = parser.parse(report);
    return csv;
}
```

### 10. **Product Recommendations Based on User Behavior**

Implement a recommendation system that provides personalized product suggestions based on user activity and browsing history.

**Backend Recommendation Route:**

```javascript
router.get('/recommendations', async (req, res) => {
    const userId = req.user.id;
    const recommendations = await recommendationService.getRecommendations(userId);
    res.status(200).json(recommendations);
});
```

**Recommendation Service (`recommendationService.js`)**:

```javascript
async function getRecommendations(userId) {
    // Logic to fetch and recommend products based on user activity
    const recommendedProducts = [
        { productId: 1, name: 'Coke 35cl' },
        { productId: 2, name: 'Pepsi 50cl' },
    ];
    return recommendedProducts;
}

module.exports = { getRecommendations };
