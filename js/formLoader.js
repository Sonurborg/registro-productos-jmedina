
// Function to load warehouses and populate the select dropdown
function loadWarehouses() {
    fetchAndPopulateSelect(
        'php/get_warehouse.php',
        'bodega',
        '-- Selecciona una bodega --',
        (item) => item.nombre
    );
}

// Function to load branches based on selected warehouse
function loadBranches(warehouseId) {
    const select = document.getElementById('sucursal');
    if (!warehouseId) {
        select.innerHTML = '<option value="">-- Selecciona una bodega primero --</option>';
        return;
    }

    fetchAndPopulateSelect(
        `php/get_branch.php?bodega_id=${warehouseId}`,
        'sucursal',
        '-- Selecciona una sucursal --',
        (item) => item.nombre
    );
}

// Function to load currencies and populate the select dropdown
function loadCurrencies() {
    fetchAndPopulateSelect(
        'php/get_currency.php',
        'moneda',
        '-- Selecciona una moneda --',
        (item) => item.codigo
    );
}


// Function to load materials and populate the checkboxes
function loadMaterials() {
    fetchAndPopulateMaterials(
        'php/get_materials.php',
        'materials-container',
        'materials'
    );
}