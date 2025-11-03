<?php
// admin/crear_player.php

require_once 'auth.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
// CORRECTO
require_once __DIR__ . '/../db_connection.php';
    // Recoger datos del formulario
    $name = $_POST['name'];
    $position = $_POST['position'];
    // Para el checkbox, si está marcado, se envía 'on', si no, no se envía nada.
    $isMVP = isset($_POST['isMVP']) ? 1 : 0; // 1 para TRUE, 0 para FALSE
    $skill_dribbling = $_POST['skill_dribbling'];
    $skill_pase = $_POST['skill_pase'];
    $skill_lanzamiento = $_POST['skill_lanzamiento'];
    
    // Convertir los logros (separados por comas) en un string JSON
    $achievements_array = array_map('trim', explode(',', $_POST['teamAchievements']));
    $teamAchievements = json_encode($achievements_array);

    $img = '/images/players/player-placeholder.jpg'; // Imagen por defecto

    $sql = "INSERT INTO players (name, position, isMVP, skill_dribbling, skill_pase, skill_lanzamiento, teamAchievements, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    // 'ssiiisss' -> string, string, integer, integer, integer, string, string, string
    $stmt->bind_param("ssiiisss", $name, $position, $isMVP, $skill_dribbling, $skill_pase, $skill_lanzamiento, $teamAchievements, $img);

    if ($stmt->execute()) {
        header("Location: players.php");
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Añadir Nuevo Jugador</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
        h1 { color: #333; }
        form { max-width: 600px; margin-top: 20px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; }
        input[type="text"], input[type="number"], textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        textarea { height: 80px; }
        button { padding: 10px 15px; background-color: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; }
        .skills-group { display: flex; gap: 15px; }
        .skills-group .form-group { flex: 1; }
        .checkbox-group { display: flex; align-items: center; gap: 10px; }
        .checkbox-group input { width: auto; }
        a { color: #007bff; }
    </style>
</head>
<body>
    <h1>Añadir Nuevo Jugador</h1>
    
    <form action="crear_player.php" method="post">
        <div class="form-group">
            <label for="name">Nombre:</label>
            <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
            <label for="position">Posición:</label>
            <input type="text" id="position" name="position" required>
        </div>
        
        <label>Habilidades (0-100):</label>
        <div class="skills-group">
            <div class="form-group">
                <label for="skill_dribbling">Dribbling:</label>
                <input type="number" id="skill_dribbling" name="skill_dribbling" min="0" max="100" required>
            </div>
            <div class="form-group">
                <label for="skill_pase">Pase:</label>
                <input type="number" id="skill_pase" name="skill_pase" min="0" max="100" required>
            </div>
            <div class="form-group">
                <label for="skill_lanzamiento">Lanzamiento:</label>
                <input type="number" id="skill_lanzamiento" name="skill_lanzamiento" min="0" max="100" required>
            </div>
        </div>

        <div class="form-group">
            <label for="teamAchievements">Logros Colectivos (separados por comas):</label>
            <textarea id="teamAchievements" name="teamAchievements"></textarea>
        </div>

        <div class="form-group checkbox-group">
            <input type="checkbox" id="isMVP" name="isMVP">
            <label for="isMVP">¿Es MVP del Mes?</label>
        </div>

        <button type="submit">Guardar Jugador</button>
    </form>
    
    <br>
    <a href="players.php">Volver a la lista</a>
</body>
</html>