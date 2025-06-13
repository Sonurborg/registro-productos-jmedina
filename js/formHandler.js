// Function to save the product
function saveProduct() {
    if (!isFormValid()) return;

    const formData = collectFormData();
    submitProduct(formData);
}

// Check if the form is valid before submission
function isFormValid() {
    const valid = validateForm();
    if (!valid) showCustomAlert('Por favor, completa todos los campos correctamente.');
    return valid;
}

// Function to load warehouses and populate the select dropdown
function setupWarehouseChangeEvent() {
    const warehouseSelect = document.getElementById('bodega');
    warehouseSelect.addEventListener('change', () => {
        loadBranches(warehouseSelect.value);
    });
}

// Function to collect form data
function collectFormData() {
    const form = document.getElementById('product-form');
    const formData = new FormData(form);

    getSelectedMaterials().forEach(m => formData.append('materiales[]', m));
    return formData;
}

// Fetch and load checkboxes for materials
function getSelectedMaterials() {
    return Array.from(document.querySelectorAll('#materials-container input[type="checkbox"]:checked'))
        .map(cb => cb.value);
}

// Function to submit the product data to the server
function submitProduct(formData) {
    fetch('php/save_product.php', {
        method: 'POST',
        body: formData
    })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            return res.json();
        })
        .then(handleSubmissionResponse)
        .catch(handleSubmissionError);
}

// Function to handle the response after submission
function handleSubmissionResponse(response) {
    if (response.success) {
        showCustomAlert('Producto registrado correctamente.');
        resetForm();
    } else {
        showCustomAlert('Error al registrar producto: \n' + response.errors.join('\n'));
    }
}

// Handle submission errors
function handleSubmissionError(err) {
    console.error('Error de conexión o de formato:', err);
    showCustomAlert('Error en la conexión con el servidor.');
}


// Function to reset the form fields
function resetForm() {
    const form = document.getElementById('product-form');
    form.reset();
    document.getElementById('code-message').textContent = '';
}