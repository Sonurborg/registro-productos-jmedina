<?php
require 'db.php';

header('Content-Type: application/json');

if (!isset($_GET['bodega_id'])) {
    echo json_encode(['success' => false, 'error' => 'ID de bodega no especificado']);
    exit;
}

$bodega_id = $_GET['bodega_id'];

try {
    $stmt = $pdo->prepare("SELECT id, nombre FROM sucursales WHERE bodega_id = ? ORDER BY nombre ASC");
    $stmt->execute([$bodega_id]);
    $sucursales = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'data' => $sucursales]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
