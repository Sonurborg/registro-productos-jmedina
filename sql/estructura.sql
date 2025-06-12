-- Crear tabla de bodegas
CREATE TABLE bodegas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Crear tabla de sucursales
CREATE TABLE sucursales (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    bodega_id INTEGER NOT NULL REFERENCES bodegas(id)
);

-- Crear tabla de monedas
CREATE TABLE monedas (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(10) NOT NULL
);

-- Crear tabla de materiales
CREATE TABLE materiales (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Crear tabla de productos
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

-- Relación muchos a muchos: productos ↔ materiales
CREATE TABLE producto_material (
    producto_id INTEGER REFERENCES productos(id) ON DELETE CASCADE,
    material_id INTEGER REFERENCES materiales(id),
    PRIMARY KEY (producto_id, material_id)
);

-- Insertar datos de ejemplo en bodegas, sucursales, monedas, materiales y productos

-- Insertar datos de ejemplo en bodegas
INSERT INTO bodegas (nombre) VALUES
('Bodega Central'),
('Bodega Norte'),
('Bodega Sur');
-- Insertar datos de ejemplo en sucursales
INSERT INTO sucursales (nombre, bodega_id) VALUES
('Sucursal Centro', 1),
('Sucursal Norte', 2),
('Sucursal Sur', 3);
-- Insertar datos de ejemplo en monedas
INSERT INTO monedas (codigo) VALUES
('CLP'),
('USD'),
('EUR');
-- Insertar datos de ejemplo en materiales
INSERT INTO materiales (nombre) VALUES
('Acero'),
('Plástico'),
('Madera'),
('Vidrio'),
('Cerámica');
-- Insertar datos de ejemplo en productos
INSERT INTO productos (codigo, nombre, bodega_id, sucursal_id, moneda_id, precio, descripcion) VALUES
('PROD001', 'Producto A', 1, 1, 1, 100.00, 'Descripción del Producto A'),
('PROD002', 'Producto B', 2, 2, 2, 200.00, 'Descripción del Producto B'),
('PROD003', 'Producto C', 3, 3, 3, 300.00, 'Descripción del Producto C');
-- Insertar datos de ejemplo en la relación productos ↔ materiales
INSERT INTO producto_material (producto_id, material_id) VALUES
(1, 1), -- Producto A con Acero
(1, 2), -- Producto A con Plástico
(2, 3), -- Producto B con Madera
(3, 4), -- Producto C con Vidrio
(3, 5); -- Producto C con Cerámica
