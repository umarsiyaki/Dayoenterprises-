
const forms = document.querySelectorAll('form');

forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Handle form submission
    });
});

// Add event listeners for settings changes
document.getElementById('theme').addEventListener('change', (e) => {
    // Update theme
});

document.getElementById('language').addEventListener('change', (e) => {
    // Update language
});


// Add event listeners for settings changes
document.getElementById('layout').addEventListener('change', (e) => {
    // Update layout
});

document.getElementById('font-size').addEventListener('change', (e) => {
    // Update font size
});

// Form validation
const validateForm = (form) => {
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;

    inputs.forEach((input) => {
        if (input.type === 'text' && input.value.trim() === '') {
            alert(`Please fill in ${input.name}`);
            isValid = false;
        }

        if (input.type === 'email' && !validateEmail(input.value)) {
            alert(`Invalid ${input.name}`);
            isValid = false;
        }

        if (input.type === 'password' && input.value.length < 8) {
            alert(`Password must be at least 8 characters`);
            isValid = false;
        }
    });

    return isValid;
};

const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

// Save settings
const saveSettings = () => {
    // Save settings logic
    alert('Settings saved successfully!');
};

// Event listeners for save buttons
document.getElementById('save-info-settings').addEventListener('click', () => {
    const form = document.getElementById('info-settings-form');
    if (validateForm(form)) {
        saveSettings();
    }
});

document.getElementById('save-experience-settings').addEventListener('click', () => {
    const form = document.getElementById('experience-settings-form');
    if (validateForm(form)) {
        saveSettings();
    }
});

document.getElementById('save-messaging-settings').addEventListener('click', () => {
    const form = document.getElementById('messaging-settings-form');
    if (validateForm(form)) {
        saveSettings();
    }
});

document.getElementById('save-ui-settings').addEventListener('click', () => {
    const form = document.getElementById('ui-settings-form');
    if (validateForm(form)) {
        saveSettings();
    }
});

document.getElementById('save-user-info').addEventListener('click', () => {
    const form = document.getElementById('user-info-form');
    if (validateForm(form)) {
        saveSettings();
    }
});
// Get all form elements
const forms = document.querySelectorAll('form');

// Add event listener for form submissions
forms.forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateForm(form);
  });
});

// Validate form function
function validateForm(form) {
  const formData = new FormData(form);
  const errors = {};

  // Check for empty fields
  for (const [key, value] of formData) {
    if (!value.trim()) {
      errors[key] = 'Field cannot be empty';
    }
  }

  // Check for invalid email format
  const email = formData.get('email');
  if (!validateEmail(email)) {
    errors['email'] = 'Invalid email format';
  }

  // Check for password mismatch
  const password = formData.get('password');
  const confirmPassword = formData.get('confirm-password');
  if (password !== confirmPassword) {
    errors['confirm-password'] = 'Passwords do not match';
  }

  // Check for password length
  if (password.length < 8) {
    errors['password'] = 'Password must be at least 8 characters';
  }

  // Display errors
  if (Object.keys(errors).length > 0) {
    displayErrors(errors);
  } else {
    // Form is valid, submit data
    submitFormData(formData);
  }
}

// Validate email function
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Display errors function
function displayErrors(errors) {
  const errorMessages = [];
  for (const [key, value] of Object.entries(errors)) {
    errorMessages.push(`${key}: ${value}`);
  }
  alert(errorMessages.join('\n'));
}

// Submit form data function
function submitFormData(formData) {
  // Submit form data logic
  alert('Form submitted successfully!');
}