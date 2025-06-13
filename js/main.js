// JavaScript code to handle the product creation form

// Ensure the DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    loadWarehouses();
    loadCurrencies();
    loadMaterials();

    const warehouseSelect = document.getElementById('bodega');
    const inputCode = document.getElementById('code');


    warehouseSelect.addEventListener('change', () => {
        loadBranches(warehouseSelect.value);
    });

    inputCode.addEventListener('blur', () => {
        validateProductCodeUniqueness(inputCode.value);
    });

    // Add event listener for form submission
    // This prevents the default form submission and allows us to handle it with JavaScript
    const form = document.getElementById('product-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveProduct();
    });
});

// Function to load warehouses and populate the select dropdown
function loadWarehouses() {
    fetch('php/get_warehouse.php')
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById('bodega');
            select.innerHTML = '<option value="">-- Selecciona una bodega --</option>';
            data.data.forEach(warehouse => {
                const opt = document.createElement('option');
                opt.value = warehouse.id;
                opt.textContent = warehouse.nombre;
                select.appendChild(opt);
            });
        });
}

// Function to load branches based on selected warehouse
function loadBranches(warehouseId) {
    const select = document.getElementById('sucursal');
    if (!warehouseId) {
        select.innerHTML = '<option value="">-- Selecciona una bodega primero --</option>';
        return;
    }
    fetch(`php/get_branch.php?bodega_id=${warehouseId}`)
        .then(res => res.json())
        .then(data => {
            select.innerHTML = '<option value="">-- Selecciona una sucursal --</option>';
            data.data.forEach(branch => {
                const opt = document.createElement('option');
                opt.value = branch.id;
                opt.textContent = branch.nombre;
                select.appendChild(opt);
            });
        });
}

// Function to load currencies and populate the select dropdown
function loadCurrencies() {
    fetch('php/get_currency.php')
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById('moneda');
            select.innerHTML = '<option value="">-- Selecciona una moneda --</option>';
            data.data.forEach(currency => {
                const opt = document.createElement('option');
                opt.value = currency.id;
                opt.textContent = currency.codigo;
                select.appendChild(opt);
            });
        });
}


// Function to load materials and populate the checkboxes
function loadMaterials() {
    fetch('php/get_materials.php')
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('materials-container');
            container.innerHTML = ''; // clear previous

            data.data.forEach(material => {
                const label = document.createElement('label');
                label.innerHTML = `
                    <input type="checkbox" name="materials" value="${material.id}" />
                    ${material.nombre}
                `;
                container.appendChild(label);
            });
        });
}

// Function to validate product code uniqueness
function validateProductCodeUniqueness(code) {
    fetch(`php/validate_product_code.php?codigo=${code}`)
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

// Function to save the product
function saveProduct() {
    if (!validateForm()) {
        alert('Por favor, completa todos los campos correctamente.');
        return;
    }

    const formData = collectFormData();
    submitProduct(formData);
}

// Function to collect form data
function collectFormData() {
    const form = document.getElementById('product-form');
    const formData = new FormData(form);

    const selectedMaterials = [];
    document.querySelectorAll('#materials-container input[type="checkbox"]:checked')
        .forEach(cb => selectedMaterials.push(cb.value));

    selectedMaterials.forEach(m => formData.append('materiales[]', m));

    return formData;
}

// Function to submit the product data to the server
function submitProduct(formData) {
    fetch('php/save_product.php', {
        method: 'POST',
        body: formData
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(response => {
            if (response.success) {
                alert('Producto registrado correctamente.');
                resetForm();
            } else {
                alert('Error al registrar producto:\n' + response.errors.join('\n'));
            }
        })
        .catch(err => {
            console.error('Error de conexión o de formato:', err);
            alert('Error en la conexión con el servidor.');
        });
}

// Function to reset the form fields
function resetForm() {
    const form = document.getElementById('product-form');
    form.reset();
    document.getElementById('code-message').textContent = '';
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
