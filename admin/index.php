<?php

require_once 'auth.php';
?>

<!DOCTYPE html>

<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Panel de Administración</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { text-align: center; }
        .dashboard-menu { display: flex; justify-content: center; gap: 20px; margin-top: 40px; }
        .menu-item { display: block; padding: 20px 40px; background-color: #007bff; color: white; text-decoration: none; border-radius: 8px; font-size: 1.2rem; transition: background-color 0.2s; }
        .menu-item:hover { background-color: #0056b3; }
    </style>
</head>
<body>
    <h1>Panel de Administración de Young Warriors</h1>
    <div class="dashboard-menu">
        <a href="coaches.php" class="menu-item">Administrar Entrenadores</a>
        <a href="players.php" class="menu-item">Administrar Jugadores</a>
        <a href="posts.php" class="menu-item">Administrar Blog</a>
    </div>
</body>
</html>

