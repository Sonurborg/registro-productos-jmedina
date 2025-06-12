<?php
// php/config.php

$config = parse_ini_file(__DIR__ . '/../.env');

return [
    'db' => [
        'host' => 'localhost',
        'port' => '5432',
        'dbname' => 'registro_db',
        'user' => 'postgres',
        'pass' => $config['DB_PASS'], // Secret password from .env file
    ]
];
