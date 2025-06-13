<?php
require 'db.php';

// db.php should contain the database connection logic
header('Content-Type: application/json');

// fetch all materials from the database
try {
    $stmt = $pdo->query("SELECT id, nombre FROM materiales ORDER BY nombre ASC");
    $materiales = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'data' => $materiales]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
