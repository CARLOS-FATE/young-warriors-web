<?php
// admin/eliminar_post.php
require_once 'auth.php';
if(isset($_GET['id']) && !empty($_GET['id'])){
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "young_warriors_db";
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Preparar la consulta para la tabla 'posts'
    $sql = "DELETE FROM posts WHERE id = ?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $_GET['id']);

    if ($stmt->execute()) {
        // Redirigir a la lista de posts
        header("Location: posts.php");
        exit();
    } else {
        echo "Error al eliminar el registro.";
    }

    $stmt->close();
    $conn->close();
} else {
    header("Location: posts.php");
    exit();
}
?>