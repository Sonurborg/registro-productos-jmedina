<?php
require 'db.php';

// Recoger datos POST
$codigo = $_POST['codigo'];
$nombre = $_POST['nombre'];
$bodega = $_POST['bodega'];
$sucursal = $_POST['sucursal'];
$moneda = $_POST['moneda'];
$precio = $_POST['precio'];
$materiales = $_POST['materiales']; // array
$descripcion = $_POST['descripcion'];

// Validar formato con regex, longitudes, etc. (igual que en JS)
$errores = [];

// Ejemplo: validación del código
if (empty($codigo)) {
    $errores[] = "El código del producto no puede estar en blanco.";
} elseif (!preg_match('/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,15}$/', $codigo)) {
    $errores[] = "El código debe tener entre 5 y 15 caracteres con letras y números.";
} else {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM productos WHERE codigo = ?");
    $stmt->execute([$codigo]);
    if ($stmt->fetchColumn() > 0) {
        $errores[] = "El código del producto ya está registrado.";
    }
}

// (valida los demás campos igual...)

if (count($errores) > 0) {
    echo json_encode(["success" => false, "errors" => $errores]);
    exit;
}

// Inserta en la tabla principal
$stmt = $pdo->prepare("INSERT INTO productos (codigo, nombre, bodega_id, sucursal_id, moneda_id, precio, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->execute([$codigo, $nombre, $bodega, $sucursal, $moneda, $precio, $descripcion]);

$producto_id = $pdo->lastInsertId();

// Inserta materiales (si tienes tabla intermedia producto_material)
foreach ($materiales as $mat) {
    $stmt = $pdo->prepare("INSERT INTO producto_material (producto_id, material_id) VALUES (?, ?)");
    $stmt->execute([$producto_id, $mat]);
}

echo json_encode(["success" => true, "message" => "Producto registrado correctamente."]);
?>