<?php
// admin/eliminar.php
require_once 'auth.php';
// Verificar que se haya proporcionado un ID
if(isset($_GET['id']) && !empty($_GET['id'])){
    // Conexión a la BD
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "young_warriors_db";
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Preparar la consulta SQL para eliminar
    $sql = "DELETE FROM coaches WHERE id = ?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $_GET['id']);

    if ($stmt->execute()) {
        // Redirigir a la página principal si fue exitoso
        header("Location: index.php");
        exit();
    } else {
        echo "Error al eliminar el registro.";
    }

    $stmt->close();
    $conn->close();
} else {
    // Si no se proporciona un ID, redirigir también
    header("Location: index.php");
    exit();
}
?>