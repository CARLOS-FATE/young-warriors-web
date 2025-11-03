<?php
// api/login_process.php
session_start(); // ¡Muy importante! Inicia o reanuda la sesión

// CORRECTO
require_once __DIR__ . '/db_connection.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $_POST['username'];
    $pass = $_POST['password'];

    $sql = "SELECT * FROM parents WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $user);
    $stmt->execute();
    $result = $stmt->get_result();
    $parent = $result->fetch_assoc();

    // password_verify() compara la contraseña enviada con el hash guardado
    if ($parent && password_verify($pass, $parent['password_hash'])) {
        // Credenciales correctas: guardar datos en la sesión
        $_SESSION['parent_id'] = $parent['id'];
        $_SESSION['parent_username'] = $parent['username'];
        
        // Redirigir al dashboard privado
            header("Location: /dashboard_padres.php");
        exit();
    } else {
        // Credenciales incorrectas: redirigir al login con un error
            header("Location: /padres?error=1");
        exit();
    }
}else {
     // Si alguien intenta acceder directamente a este archivo sin POST, redirigir
     header("Location: /padres"); 
     exit();
    }
?>