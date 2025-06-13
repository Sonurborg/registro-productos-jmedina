// JavaScript code to handle the product creation form

// Ensure the DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    initializeForm();
    setupWarehouseChangeEvent();
    setupCodeValidationEvent();
    setupFormSubmitEvent();
});

// Function to load warehouses and populate the select dropdown
function initializeForm() {
    loadWarehouses();
    loadCurrencies();
    loadMaterials();
}

// Function to submit the product data to the server
function setupFormSubmitEvent() {
    const form = document.getElementById('product-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveProduct();
    });
}
