<?php
require 'db.php';

// db.php should contain the database connection code
header('Content-Type: application/json');

// Check if the 'codigo' parameter is provided
if (!isset($_POST['codigo'])) {
    echo json_encode(['success' => false, 'error' => 'Product code not provided.']);
    exit;
}

// Get the product code from POST data
$codigo = $_POST['codigo'];

// Validate the product code
try {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM productos WHERE codigo = ?");
    $stmt->execute([$codigo]);
    $exists = $stmt->fetchColumn() > 0;
    echo json_encode(['success' => true, 'exists' => $exists]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
