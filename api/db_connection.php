<?php
// api/db_connection.php

ini_set('display_errors', 1); // <-- Añade esto para ver errores
error_reporting(E_ALL); // <-- Y esto

// Definimos una constante con la ruta raíz
define('PROJECT_ROOT', dirname(__DIR__));

$servername = getenv('DB_HOST');
$username = getenv('DB_USERNAME');
$password = getenv('DB_PASSWORD');
$dbname = getenv('DB_NAME');
$port = getenv('DB_PORT');

$conn = mysqli_init();
// Requerimiento de TiDB Cloud para usar SSL
mysqli_ssl_set($conn, NULL, NULL, "/etc/ssl/certs/ca-certificates.crt", NULL, NULL);
mysqli_real_connect($conn, $servername, $username, $password, $dbname, (int)$port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Asegurarnos de que la conexión use UTF-8
mysqli_set_charset($conn, "utf8mb4");
?>