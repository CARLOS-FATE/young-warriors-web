<?php
// admin/index.php
require_once 'auth.php';
// --- Conexión a la BD ---
require_once $_SERVER['DOCUMENT_ROOT'] . '/api/db_connection.php'; // Esta línea hace la conexión a TiDB Cloud

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// --- Obtener todos los entrenadores ---
$sql = "SELECT id, name, role FROM coaches ORDER BY id DESC";
$result = $conn->query($sql);

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administración - Entrenadores</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
        h1 { color: #333; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        a { color: #007bff; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .action-links a { margin-right: 10px; }
        .add-link { display: inline-block; margin-top: 20px; padding: 10px 15px; background-color: #28a745; color: white; border-radius: 5px; }
    </style>
</head>
<body>

    <h1>Administrar Entrenadores</h1>

    <a href="crear.php" class="add-link">Añadir Nuevo Entrenador</a>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <?php
            if ($result->num_rows > 0) {
                // Imprimir los datos de cada fila
                while($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td>" . $row["id"] . "</td>";
                    echo "<td>" . $row["name"] . "</td>";
                    echo "<td>" . $row["role"] . "</td>";
                    echo "<td class='action-links'>";
                    echo "<a href='editar.php?id=" . $row["id"] . "'>Editar</a>";
                    echo "<a href='eliminar.php?id=" . $row["id"] . "' onclick=\"return confirm('¿Estás seguro de que quieres eliminar a este entrenador?');\">Eliminar</a>";                    
                    echo "</td>";
                    echo "</tr>";
                }
            } else {
                echo "<tr><td colspan='4'>No hay entrenadores registrados.</td></tr>";
            }
            $conn->close();
            ?>
        </tbody>
    </table>

</body>
</html>