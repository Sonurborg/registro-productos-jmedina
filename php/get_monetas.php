<?php
require 'db.php';

header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT id, codigo FROM monedas ORDER BY codigo ASC");
    $monedas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'data' => $monedas]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
