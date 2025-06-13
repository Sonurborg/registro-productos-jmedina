// Get references once
const alertBox = document.getElementById('custom-alert');
const alertMessage = document.getElementById('custom-alert-message');
const okButton = document.getElementById('custom-alert-ok');

// Format the alert message (array or string)
function formatAlertMessage(messages) {
    if (Array.isArray(messages)) {
        return messages.map(msg => `<div> ${msg}</div>`).join('');
    } else {
        const formatted = messages.replace(/\n/g, '<br> - ');
        return `<div> ${formatted}</div>`;
    }
}

// Insert formatted message into the alert box
function updateAlertContent(formattedHTML) {
    alertMessage.innerHTML = formattedHTML;
}

// Show the alert box
function showAlert() {
    alertBox.classList.remove('hidden');
}

// Hide the alert box
function hideAlert() {
    alertBox.classList.add('hidden');
}

// Public function to show a custom alert
function showCustomAlert(messages) {
    updateAlertContent(formatAlertMessage(messages));
    showAlert();
}

// Register close behavior (do this once when script loads)
okButton.addEventListener('click', hideAlert);
