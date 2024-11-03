const { google } = require('googleapis');

// Set up authentication
const auth = new google.auth.GoogleAuth({
  client_id: 'YOUR_CLIENT_ID',
  client_secret: 'YOUR_CLIENT_SECRET',
  redirect_uri: 'YOUR_REDIRECT_URI'
});

// Set up calendar API
const calendar = google.calendar('v3');

// Authenticate and authorize
auth.authenticate().then(() => {
  // Get calendar events
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    singleEvents: true,
    orderBy: 'startTime'
  }, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log(res.data.items);
    }
  });
});