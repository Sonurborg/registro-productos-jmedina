<?php
require 'db.php';

header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    // Collect POST data
    $codigo = $_POST['codigo'] ?? '';
    $nombre = $_POST['nombre'] ?? '';
    $bodega = $_POST['bodega'] ?? '';
    $sucursal = $_POST['sucursal'] ?? '';
    $moneda = $_POST['moneda'] ?? '';
    $precio = str_replace(',', '.', $_POST['precio'] ?? '');
    $materiales = $_POST['materiales'] ?? [];
    $descripcion = $_POST['descripcion'] ?? '';

    $errors = [];

    // Validate product code
    if (empty($codigo)) {
        $errors[] = "El código del producto no puede estar en blanco.";
    } elseif (!preg_match('/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,15}$/', $codigo)) {
        $errors[] = "El código del producto debe tener entre 5 y 15 caracteres, incluyendo letras y números.";
    } else {
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM productos WHERE codigo = ?");
        $stmt->execute([$codigo]);
        if ($stmt->fetchColumn() > 0) {
            $errors[] = "El código del producto ya está registrado.";
        }
    }

    // Validate other fields
    if (empty($nombre)) $errors[] = "El nombre del producto no puede estar en blanco.";
    if (empty($bodega)) $errors[] = "Debe seleccionar una bodega.";
    if (empty($sucursal)) $errors[] = "Debe seleccionar una sucursal.";
    if (empty($moneda)) $errors[] = "Debe seleccionar una moneda.";
    if (!is_numeric($precio) || floatval($precio) <= 0) $errors[] = "El precio debe ser un número positivo.";
    if (empty($descripcion) || strlen($descripcion) < 10) $errors[] = "La descripción debe tener al menos 10 caracteres.";
    if (!is_array($materiales) || count($materiales) < 2) {
        $errors[] = "Debe seleccionar al menos dos materiales.";
    }

    if (count($errors) > 0) {
        echo json_encode(["success" => false, "errors" => $errors]);
        exit;
    }

    // Insert product
    $stmt = $pdo->prepare("INSERT INTO productos (codigo, nombre, bodega_id, sucursal_id, moneda_id, precio, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$codigo, $nombre, $bodega, $sucursal, $moneda, $precio, $descripcion]);

    $producto_id = $pdo->lastInsertId();

    // Insert materials
    $stmt = $pdo->prepare("INSERT INTO producto_material (producto_id, material_id) VALUES (?, ?)");
    foreach ($materiales as $mat) {
        $stmt->execute([$producto_id, $mat]);
    }

    echo json_encode(["success" => true, "message" => "Producto registrado correctamente."]);
    exit;

} catch (Exception $e) {
    echo json_encode(["success" => false, "errors" => ["Error interno: " . $e->getMessage()]]);
    exit;
}

