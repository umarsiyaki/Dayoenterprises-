
       const app = firebase.initializeApp(firebaseConfig);
       const messaging = firebase.messaging();

       // Get registration token for push notifications
       messaging.getToken({ vapidKey: 'YOUR_VAPID_KEY' }).then((currentToken) => {
           if (currentToken) {
               console.log('Token:', currentToken);
               // Send token to server to subscribe for push notifications
           } else {
               console.log('No registration token available. Request permission to generate one.');
           }
       }).catch((err) => {
           console.log('An error occurred while retrieving token.', err);
       });

       // Listen for incoming messages
       messaging.onMessage((payload) => {
           console.log('Message received. ', payload);
           // Display push notification
           alert(`New Notification: ${payload.notification.title}`);
       });
       
// Send push notification for new order
const sendPushNotification = async (token, message) => {
    const payload = {
        notification: {
            title: 'New Order',
            body: `Order #${message.orderId} has been placed.`,
        }
    };

    try {
        await admin.messaging().sendToDevice(token, payload);
        console.log('Push notification sent');
    } catch (error) {
        console.error('Error sending push notification:', error);
    }
};

// Trigger when new order event occurs
socket.on('newOrder', (orderData) => {
    const message = {
        orderId: orderData.orderId
    };
    // Send notification to the user's device token
    sendPushNotification(userDeviceToken, message);
});
   </script>