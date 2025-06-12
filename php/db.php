<?php
// php/db.php

$config = require __DIR__ . '/config.php';

$host = $config['db']['host'];
$port = $config['db']['port'];
$dbname = $config['db']['dbname'];
$user = $config['db']['user'];
$pass = $config['db']['pass'];

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

