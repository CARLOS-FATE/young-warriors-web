<?php

require_once 'auth.php';
// admin/editar_player.php
// CORRECTO
require_once __DIR__ . '/../db_connection.php';
// --- Lógica para ACTUALIZAR si se envía el formulario ---
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $position = $_POST['position'];
    $isMVP = isset($_POST['isMVP']) ? 1 : 0;
    $skill_dribbling = $_POST['skill_dribbling'];
    $skill_pase = $_POST['skill_pase'];
    $skill_lanzamiento = $_POST['skill_lanzamiento'];
    
    $achievements_array = array_map('trim', explode(',', $_POST['teamAchievements']));
    $teamAchievements = json_encode($achievements_array);

    $sql = "UPDATE players SET name=?, position=?, isMVP=?, skill_dribbling=?, skill_pase=?, skill_lanzamiento=?, teamAchievements=? WHERE id=?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssiiissi", $name, $position, $isMVP, $skill_dribbling, $skill_pase, $skill_lanzamiento, $teamAchievements, $id);

    if ($stmt->execute()) {
        header("Location: players.php");
        exit();
    } else {
        echo "Error al actualizar: " . $stmt->error;
    }
    $stmt->close();
}

// --- Lógica para OBTENER los datos y mostrarlos en el formulario ---
$id = $_GET['id'];
$sql = "SELECT * FROM players WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$player = $result->fetch_assoc();
$stmt->close();

if (!$player) {
    die("Jugador no encontrado.");
}

// Convertir los logros de JSON a un string separado por comas para el textarea
$achievements_string = implode(', ', json_decode($player['teamAchievements']));
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar Jugador</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
        h1 { color: #333; }
        form { max-width: 600px; margin-top: 20px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; }
        input[type="text"], input[type="number"], textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        textarea { height: 80px; }
        button { padding: 10px 15px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; }
        .skills-group { display: flex; gap: 15px; }
        .skills-group .form-group { flex: 1; }
        .checkbox-group { display: flex; align-items: center; gap: 10px; }
        .checkbox-group input { width: auto; }
        a { color: #007bff; }
    </style>
</head>
<body>
    <h1>Editar Jugador: <?php echo htmlspecialchars($player['name']); ?></h1>
    
    <form action="editar_player.php" method="post">
        <input type="hidden" name="id" value="<?php echo $player['id']; ?>">
        
        <div class="form-group">
            <label for="name">Nombre:</label>
            <input type="text" id="name" name="name" value="<?php echo htmlspecialchars($player['name']); ?>" required>
        </div>
        <div class="form-group">
            <label for="position">Posición:</label>
            <input type="text" id="position" name="position" value="<?php echo htmlspecialchars($player['position']); ?>" required>
        </div>
        
        <label>Habilidades (0-100):</label>
        <div class="skills-group">
            <div class="form-group">
                <label for="skill_dribbling">Dribbling:</label>
                <input type="number" id="skill_dribbling" name="skill_dribbling" min="0" max="100" value="<?php echo $player['skill_dribbling']; ?>" required>
            </div>
            <div class="form-group">
                <label for="skill_pase">Pase:</label>
                <input type="number" id="skill_pase" name="skill_pase" min="0" max="100" value="<?php echo $player['skill_pase']; ?>" required>
            </div>
            <div class="form-group">
                <label for="skill_lanzamiento">Lanzamiento:</label>
                <input type="number" id="skill_lanzamiento" name="skill_lanzamiento" min="0" max="100" value="<?php echo $player['skill_lanzamiento']; ?>" required>
            </div>
        </div>

        <div class="form-group">
            <label for="teamAchievements">Logros Colectivos (separados por comas):</label>
            <textarea id="teamAchievements" name="teamAchievements"><?php echo htmlspecialchars($achievements_string); ?></textarea>
        </div>

        <div class="form-group checkbox-group">
            <input type="checkbox" id="isMVP" name="isMVP" <?php if ($player['isMVP']) echo 'checked'; ?>>
            <label for="isMVP">¿Es MVP del Mes?</label>
        </div>

        <button type="submit">Guardar Cambios</button>
    </form>
    
    <br>
    <a href="players.php">Cancelar y volver a la lista</a>
</body>
</html>