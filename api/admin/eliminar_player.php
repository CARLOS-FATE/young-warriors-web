<?php
// admin/eliminar_player.php
require_once 'auth.php';
if(isset($_GET['id']) && !empty($_GET['id'])){
require_once $_SERVER['DOCUMENT_ROOT'] . '/api/db_connection.php';
    // Preparar la consulta para la tabla 'players'
    $sql = "DELETE FROM players WHERE id = ?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $_GET['id']);

    if ($stmt->execute()) {
        // Redirigir a la lista de jugadores
        header("Location: players.php");
        exit();
    } else {
        echo "Error al eliminar el registro.";
    }

    $stmt->close();
    $conn->close();
} else {
    header("Location: players.php");
    exit();
}
?>