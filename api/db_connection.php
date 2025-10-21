<?php
// api/db_connection.php

// Enable error reporting for debugging on Vercel
ini_set('display_errors', 1);
error_reporting(E_ALL);

$servername = getenv('DB_HOST');
$username = getenv('DB_USERNAME');
$password = getenv('DB_PASSWORD');
$dbname = getenv('DB_NAME');
$port = getenv('DB_PORT');

$conn = mysqli_init();

// Try connecting with SSL enabled, but without specifying the cert path
mysqli_ssl_set($conn, NULL, NULL, NULL, NULL, NULL); 

// Ensure you provide the port explicitly
$connected = mysqli_real_connect($conn, $servername, $username, $password, $dbname, (int)$port, NULL, MYSQLI_CLIENT_SSL);

if (!$connected) {
    // If connection fails, output the specific mysqli connection error
    die("Connection failed: " . mysqli_connect_error()); 
}

mysqli_set_charset($conn, "utf8mb4");
?>