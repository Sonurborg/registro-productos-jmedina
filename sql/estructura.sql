-- Create table: bodegas (warehouses)
CREATE TABLE bodegas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Create table: sucursales (branches)
CREATE TABLE sucursales (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    bodega_id INTEGER NOT NULL REFERENCES bodegas(id)
);

-- Create table: monedas (currencies)
CREATE TABLE monedas (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(10) NOT NULL
);

-- Create table: materiales (materials)
CREATE TABLE materiales (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Create table: productos (products)
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(15) NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    bodega_id INTEGER NOT NULL REFERENCES bodegas(id),
    sucursal_id INTEGER NOT NULL REFERENCES sucursales(id),
    moneda_id INTEGER NOT NULL REFERENCES monedas(id),
    precio NUMERIC(10,2) NOT NULL CHECK (precio >= 0),
    descripcion TEXT NOT NULL
);

-- Create junction table: products ↔ materials (many-to-many)
CREATE TABLE producto_material (
    producto_id INTEGER REFERENCES productos(id) ON DELETE CASCADE,
    material_id INTEGER REFERENCES materiales(id),
    PRIMARY KEY (producto_id, material_id)
);

-- Insert sample data into bodegas, sucursales, monedas, materiales, and productos

-- Insert sample warehouses
INSERT INTO bodegas (nombre) VALUES
('Bodega Central'),
('Bodega Norte'),
('Bodega Sur');

-- Insert sample branches
INSERT INTO sucursales (nombre, bodega_id) VALUES
('Sucursal Centro', 1),
('Sucursal Norte', 2),
('Sucursal Sur', 3);

-- Insert sample currencies
INSERT INTO monedas (codigo) VALUES
('CLP'),
('USD'),
('EUR');

-- Insert sample materials
INSERT INTO materiales (nombre) VALUES
('Acero'),
('Plástico'),
('Madera'),
('Vidrio'),
('Cerámica');

-- Insert sample products
INSERT INTO productos (codigo, nombre, bodega_id, sucursal_id, moneda_id, precio, descripcion) VALUES
('PROD001', 'Producto A', 1, 1, 1, 100.00, 'Descripción del Producto A'),
('PROD002', 'Producto B', 2, 2, 2, 200.00, 'Descripción del Producto B'),
('PROD003', 'Producto C', 3, 3, 3, 300.00, 'Descripción del Producto C');

-- Link sample products to materials
INSERT INTO producto_material (producto_id, material_id) VALUES
(1, 1), -- Product A with Acero
(1, 2), -- Product A with Plástico
(2, 3), -- Product B with Madera
(3, 4), -- Product C with Vidrio
(3, 5); -- Product C with Cerámica
