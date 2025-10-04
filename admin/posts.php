<?php
// admin/posts.php

require_once 'auth.php';

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "young_warriors_db";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) { die("Connection failed: " . $conn->connect_error); }

// Seleccionamos los datos de la tabla 'posts'
$sql = "SELECT id, title, category FROM posts ORDER BY id DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Panel - Administrar Blog</title>
    <style>
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
    <h1>Administrar Artículos del Blog</h1>
    <a href="crear_post.php" class="add-link">Añadir Nuevo Artículo</a>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Categoría</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <?php
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td>" . $row["id"] . "</td>";
                    echo "<td>" . htmlspecialchars($row["title"]) . "</td>";
                    echo "<td>" . htmlspecialchars($row["category"]) . "</td>";
                    echo "<td class='action-links'>";
                    echo "<a href='editar_post.php?id=" . $row["id"] . "'>Editar</a>";
                    echo "<a href='eliminar_post.php?id=" . $row["id"] . "' onclick=\"return confirm('¿Estás seguro?');\">Eliminar</a>";
                    echo "</td>";
                    echo "</tr>";
                }
            } else {
                echo "<tr><td colspan='4'>No hay artículos registrados.</td></tr>";
            }
            $conn->close();
            ?>
        </tbody>
    </table>
</body>
</html>