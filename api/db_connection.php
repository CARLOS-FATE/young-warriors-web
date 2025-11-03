<?php
// api/db_connection.php

// Muestra errores de PHP en el log de Vercel (¡muy útil!)
ini_set('display_errors', '1');
error_reporting(E_ALL);

// 1. Obtenemos las variables de Vercel
$servername = getenv('DB_HOST');
$username = getenv('DB_USERNAME'); // <-- ¡Asegúrate de corregir esto en Vercel!
$password = getenv('DB_PASSWORD');
$dbname = getenv('DB_NAME');
$port = getenv('DB_PORT');

// 2. Ruta al certificado CA que descargaste y pusiste en /api/
$ca_path = __DIR__ . '/ca-tidb.crt'; 

// 3. Inicializamos mysqli
$conn = mysqli_init();

// 4. CONFIGURACIÓN SSL (El paso clave)
// Le decimos a mysqli que use nuestro archivo CA para verificar la identidad del servidor
mysqli_ssl_set($conn, NULL, NULL, $ca_path, NULL, NULL);

// 5. Conexión Real
// Usamos MYSQLI_CLIENT_SSL para forzar una conexión segura
$connection_success = mysqli_real_connect(
    $conn, 
    $servername, 
    $username, 
    $password, 
    $dbname, 
    (int)$port, // Convertimos el puerto a entero
    NULL, 
    MYSQLI_CLIENT_SSL // ¡FORZAR SSL!
);

// 6. Manejo de error
if (!$connection_success) {
    // Esto es lo que veremos en el log de Vercel si algo falla
    die("Connection failed: " . mysqli_connect_error());
}

// 7. Configurar charset
mysqli_set_charset($conn, "utf8mb4");

// ¡No pongas más código aquí! 
// Este archivo solo debe crear la variable $conn.
?>