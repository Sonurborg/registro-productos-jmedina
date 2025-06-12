<?php
require 'db.php';

header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT id, nombre FROM bodegas ORDER BY nombre ASC");
    $bodegas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'data' => $bodegas]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
