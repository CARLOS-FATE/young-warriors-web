<?php
// dashboard_padres.php
session_start(); // Reanudar la sesión
// CORRECTO
require_once __DIR__ . '/db_connection.php';// Si el padre no ha iniciado sesión, lo redirigimos al login
if (!isset($_SESSION['parent_id'])) {
    header("Location: /young-warriors-web/padres");
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Portal Privado para Padres</title>
    <style>body { font-family: Arial, sans-serif; margin: 40px; }</style>
</head>
<body>
    <h1>Bienvenido, <?php echo htmlspecialchars($_SESSION['parent_username']); ?>!</h1>
    <p>Este es tu portal privado. Aquí pronto podrás ver el progreso y comunicados sobre tu hijo.</p>
    
    <br>
    
    <a href="/young-warriors-web/api/logout.php">Cerrar Sesión</a>
</body>
</html>