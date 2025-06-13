<?php
require 'db.php';

// db.php should contain the database connection code
header('Content-Type: application/json');

// Check if bodega_id is provided
if (!isset($_GET['bodega_id'])) {
    echo json_encode(['success' => false, 'error' => 'ID de bodega no especificado']);
    exit;
}

// Get the bodega_id from the request
$bodega_id = $_GET['bodega_id'];

// Validate bodega_id
// Ensure it's a numeric value to prevent SQL injection
try {
    $stmt = $pdo->prepare("SELECT id, nombre FROM sucursales WHERE bodega_id = ? ORDER BY nombre ASC");
    $stmt->execute([$bodega_id]);
    $sucursales = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'data' => $sucursales]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
