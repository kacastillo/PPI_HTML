document.addEventListener('DOMContentLoaded', function () {

  // Show/hide "Other" field
  document.getElementById('howMet').addEventListener('change', function () {
    const otherRow = document.getElementById('otherRow');
    if (this.value === 'Other') {
      otherRow.style.display = 'flex';
    } else {
      otherRow.style.display = 'none';
      document.getElementById('howMetOther').value = '';
    }
  });

  // --- Blur validators ---

  document.getElementById('firstName').addEventListener('blur', function () {
    if (!this.value.trim()) {
      showError('firstName', 'firstName-error', 'First name is required');
    } else {
      clearFieldError('firstName', 'firstName-error');
    }
  });

  document.getElementById('lastName').addEventListener('blur', function () {
    if (!this.value.trim()) {
      showError('lastName', 'lastName-error', 'Last name is required');
    } else {
      clearFieldError('lastName', 'lastName-error');
    }
  });

  document.getElementById('email').addEventListener('blur', function () {
    validateEmail();
  });

  document.getElementById('linkedin').addEventListener('blur', function () {
    const linkedin = this.value.trim();
    if (linkedin && !linkedin.startsWith('https://linkedin.com/in/')) {
      showError('linkedin', 'linkedin-error', 'LinkedIn URL must start with https://linkedin.com/in/');
    } else {
      clearFieldError('linkedin', 'linkedin-error');
    }
  });

  document.getElementById('howMet').addEventListener('blur', function () {
    if (this.value === '') {
      showError('howMet', 'howMet-error', 'Please select how we met');
    } else {
      clearFieldError('howMet', 'howMet-error');
    }
  });

  // --- Submit validator ---

  document.getElementById('guestbookForm').addEventListener('submit', function (e) {
    clearErrors();
    let isValid = true;

    const firstName = document.getElementById('firstName').value.trim();
    if (!firstName) {
      showError('firstName', 'firstName-error', 'First name is required');
      isValid = false;
    }

    const lastName = document.getElementById('lastName').value.trim();
    if (!lastName) {
      showError('lastName', 'lastName-error', 'Last name is required');
      isValid = false;
    }

    if (!validateEmail()) {
      isValid = false;
    }

    const linkedin = document.getElementById('linkedin').value.trim();
    if (linkedin && !linkedin.startsWith('https://linkedin.com/in/')) {
      showError('linkedin', 'linkedin-error', 'LinkedIn URL must start with https://linkedin.com/in/');
      isValid = false;
    }

    const howMet = document.getElementById('howMet').value;
    if (howMet === '') {
      showError('howMet', 'howMet-error', 'Please select how we met');
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
      const firstError = document.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
    }
  });

  // --- Helpers ---

  function validateEmail() {
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      showError('email', 'email-error', 'Email address is required');
      return false;
    } else if (!emailRegex.test(email)) {
      showError('email', 'email-error', 'Please enter a valid email address (must contain @ and .)');
      return false;
    } else {
      clearFieldError('email', 'email-error');
      return true;
    }
  }

  function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    error.textContent = message;
    error.style.display = 'block';
    input.classList.add('error');
  }

  function clearFieldError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    error.style.display = 'none';
    input.classList.remove('error');
  }

  function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  }

});