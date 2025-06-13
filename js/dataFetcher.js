// This module provides functions to fetch data from a given endpoint and populate HTML elements with the results.
async function fetchAndPopulateSelect(endpoint, selectId, placeholder, itemLabelFn) {
    const res = await fetch(endpoint);
    const data = await res.json();

    const select = document.getElementById(selectId);
    select.innerHTML = `<option value="">${placeholder}</option>`;
    data.data.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.id;
        opt.textContent = itemLabelFn(item);
        select.appendChild(opt);
    });
}


// Function to fetch data and populate a select dropdown
async function fetchAndPopulateMaterials(endpoint, containerId, checkboxName) {
    const res = await fetch(endpoint);
    const data = await res.json();

    const container = document.getElementById(containerId);
    container.innerHTML = '';
    data.data.forEach(mat => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="checkbox" name="${checkboxName}" value="${mat.id}" />
            ${mat.nombre}
        `;
        container.appendChild(label);
    });
}