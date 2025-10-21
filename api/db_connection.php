<?php
// api/db_connection.php

ini_set('display_errors', 1);
error_reporting(E_ALL);

$servername = getenv('DB_HOST');
$username = getenv('DB_USERNAME');
$password = getenv('DB_PASSWORD');
$dbname = getenv('DB_NAME');
$port = getenv('DB_PORT');

$conn = mysqli_init();

mysqli_ssl_set($conn, NULL, NULL, NULL, NULL, NULL); 

$connected = mysqli_real_connect($conn, $servername, $username, $password, $dbname, (int)$port, NULL, MYSQLI_CLIENT_SSL);

if (!$connected) {
    die("Connection failed: " . mysqli_connect_error()); 
}

mysqli_set_charset($conn, "utf8mb4");
?>