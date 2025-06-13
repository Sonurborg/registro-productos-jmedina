// JavaScript code to handle the product creation form

// Ensure the DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    initializeForm();
    setupWarehouseChangeEvent();
    setupCodeValidationEvent();
    setupFormSubmitEvent();
});

function initializeForm() {
    loadWarehouses();
    loadCurrencies();
    loadMaterials();
}


function setupFormSubmitEvent() {
    const form = document.getElementById('product-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveProduct();
    });
}
