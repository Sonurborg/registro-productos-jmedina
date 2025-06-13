<?php
// php/config.php

try {

    // Check if the .env file exists
    if (!file_exists(__DIR__ . '/../.env')) {
        throw new Exception('.env file not found');
    }
    // Load the .env file
    $config = parse_ini_file(__DIR__ . '/../.env');
    if ($config === false) {
        throw new Exception('Failed to parse .env file');
    }

} catch (Exception $e) {
    die('Error: ' . $e->getMessage());
}

// Return the database configuration as an associative array
return [
    'db' => [
        'host' => $config['DB_HOST'],   // Database host from .env file
        'port' => $config['DB_PORT'],   // Database port from .env file
        'dbname' => $config['DB_NAME'], // Database name from .env file
        'user' => $config['DB_USER'],   // Username from .env file
        'pass' => $config['DB_PASS'],   // Secret password from .env file
    ]
];
