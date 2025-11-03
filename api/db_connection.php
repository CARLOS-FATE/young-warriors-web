<?php
// api/db_connection.php

ini_set('display_errors', '1');
error_reporting(E_ALL);

$servername = getenv('DB_HOST');
$username = getenv('DB_USERNAME'); 
$password = getenv('DB_PASSWORD');
$dbname = getenv('DB_NAME');
$port = getenv('DB_PORT');

$ca_path = __DIR__ . '/ca-tidb.crt'; 

$conn = mysqli_init();

mysqli_ssl_set($conn, NULL, NULL, $ca_path, NULL, NULL);


$connection_success = mysqli_real_connect(
    $conn, 
    $servername, 
    $username, 
    $password, 
    $dbname, 
    (int)$port, 
    NULL, 
    MYSQLI_CLIENT_SSL 
);

if (!$connection_success) {
    die("Connection failed: " . mysqli_connect_error());
}


mysqli_set_charset($conn, "utf8mb4");


?>