<?php
// admin/players.php

require_once 'auth.php';

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "young_warriors_db";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) { die("Connection failed: " . $conn->connect_error); }

$sql = "SELECT id, name, position FROM players ORDER BY id DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Panel - Administrar Jugadores</title>
    <link rel="stylesheet" href="styles.css"> <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
        h1 { color: #333; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        a { color: #007bff; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .action-links a { margin-right: 10px; }
        .add-link { display: inline-block; margin: 20px 0; padding: 10px 15px; background-color: #28a745; color: white; border-radius: 5px; }
        .back-link { display: block; margin-bottom: 20px; }
    </style>
</head>
<body>
    <a href="index.php" class="back-link">← Volver al Dashboard</a>
    <h1>Administrar Jugadores</h1>
    <a href="crear_player.php" class="add-link">Añadir Nuevo Jugador</a>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Posición</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <?php
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td>" . $row["id"] . "</td>";
                    echo "<td>" . $row["name"] . "</td>";
                    echo "<td>" . $row["position"] . "</td>";
                    echo "<td class='action-links'>";
                    echo "<a href='editar_player.php?id=" . $row["id"] . "'>Editar</a>";
                    echo "<a href='eliminar_player.php?id=" . $row["id"] . "' onclick=\"return confirm('¿Estás seguro?');\">Eliminar</a>";
                    echo "</td>";
                    echo "</tr>";
                }
            } else {
                echo "<tr><td colspan='4'>No hay jugadores registrados.</td></tr>";
            }
            $conn->close();
            ?>
        </tbody>
    </table>
</body>
</html>