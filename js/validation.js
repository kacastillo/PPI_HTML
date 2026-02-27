document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('howMet').addEventListener('change', function () {
        const otherRow = document.getElementById('otherRow');
        if (this.value === 'Other') {
            otherRow.style.display = 'flex';
        } else {
            otherRow.style.display = 'none';
            document.getElementById('howMetOther').value = '';
        }
    });

    document.getElementById('guestbookForm').addEventListener('submit', function (e) {
        clearErrors();

        let isValid = true;

        // Validate first name
        const firstName = document.getElementById('firstName').value.trim();
        if (!firstName) {
            showError('firstName', 'firstName-error', 'First name is required');
            isValid = false;
        }

        // Validate last name
        const lastName = document.getElementById('lastName').value.trim();
        if (!lastName) {
            showError('lastName', 'lastName-error', 'Last name is required');
            isValid = false;
        }

        // Validate email
        const email = document.getElementById('email').value.trim();
        const mailingList = document.getElementById('mailingList').checked;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (mailingList && !email) {
            showError('email', 'email-error', 'Email is required when subscribing to mailing list');
            isValid = false;
        } else if (email && !emailRegex.test(email)) {
            showError('email', 'email-error', 'Please enter a valid email address (must contain @ and .)');
            isValid = false;
        }

        // Validate LinkedIn URL
        const linkedin = document.getElementById('linkedin').value.trim();
        if (linkedin && !linkedin.startsWith('https://linkedin.com/in/')) {
            showError('linkedin', 'linkedin-error', 'LinkedIn URL must start with https://linkedin.com/in/');
            isValid = false;
        }

        // Validate "How we met" dropdown
        const howMet = document.getElementById('howMet').value;
        if (howMet === '') {
            showError('howMet', 'howMet-error', 'Please select how we met');
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
            // Scroll to first error so the user sees it
            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });

    function showError(inputId, errorId, message) {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);
        error.textContent = message;
        error.style.display = 'block';
        input.classList.add('error');
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    }

});