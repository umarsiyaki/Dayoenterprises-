// Get Todo items from database
const todoItems = db.getTodoItems();

// Create calendar events from Todo items
todoItems.forEach((item) => {
  const event = {
    summary: item.title,
    description: item.description,
    start: item.dueDate,
    end: item.dueDate,
  };
  google.calendar.events.insert({
    calendarId: 'primary',
    resource: event,
  }, (err, event) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Event created: ${event.htmlLink}`);
    }
  });
});