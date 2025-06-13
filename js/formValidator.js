// Function to validate product code uniqueness
function validateProductCodeUniqueness(code) {
    fetch(`php/check_code.php?codigo=${code}`)
        .then(res => res.json())
        .then(data => {
            const message = document.getElementById('code-message');
            if (data.exists) {
                message.textContent = 'El código ya existe. Por favor, elige otro.';
                message.style.color = 'red';
            } else {
                message.textContent = 'El código es único.';
                message.style.color = 'green';
            }
        });
}

// Function to validate the form before submission
function validateForm() {
    const form = document.getElementById('product-form');
    const inputs = form.querySelectorAll('input, select');
    let valid = true;

    inputs.forEach(input => {
        if (!input.value) {
            valid = false;
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
        }
    });

    return valid;
}

// Function to check if the code is unique when the input loses focus
function setupCodeValidationEvent() {
    const inputCode = document.getElementById('code');
    inputCode.addEventListener('blur', () => {
        validateProductCodeUniqueness(inputCode.value);
    });
}
