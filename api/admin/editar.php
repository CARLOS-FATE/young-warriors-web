<?php
// admin/editar.php
require_once 'auth.php';
// --- Conexión a la BD (la necesitaremos en ambos casos) ---
require_once $_SERVER['DOCUMENT_ROOT'] . '/api/db_connection.php'; // Esta línea hace la conexión a TiDB Cloud


// --- Parte 1: Lógica para ACTUALIZAR los datos cuando se envía el formulario ---
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los datos del formulario
    $id = $_POST['id'];
    $name = $_POST['name'];
    $role = $_POST['role'];
    $bio = $_POST['bio'];
    $quote = $_POST['quote'];

    // Preparar la consulta SQL para actualizar
    $sql = "UPDATE coaches SET name = ?, role = ?, bio = ?, quote = ? WHERE id = ?";
    
    $stmt = $conn->prepare($sql);
    // 'ssssi' -> 4 strings y al final 1 integer (el id)
    $stmt->bind_param("ssssi", $name, $role, $bio, $quote, $id);

    if ($stmt->execute()) {
        header("Location: index.php"); // Redirigir a la lista si fue exitoso
        exit();
    } else {
        echo "Error al actualizar: " . $conn->error;
    }
    $stmt->close();
}

// --- Parte 2: Lógica para OBTENER los datos del entrenador y mostrarlos en el formulario ---
// Obtener el ID del entrenador desde la URL
$id = $_GET['id'];
$sql = "SELECT * FROM coaches WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$coach = $result->fetch_assoc();

$stmt->close();
$conn->close();

if (!$coach) {
    die("Entrenador no encontrado.");
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar Entrenador</title>
    <link rel="stylesheet" href="styles.css"> <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
        h1 { color: #333; }
        form { max-width: 600px; margin-top: 20px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; }
        input[type="text"], textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        textarea { height: 100px; }
        button { padding: 10px 15px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; }
        a { color: #007bff; }
    </style>
</head>
<body>
    <h1>Editar Entrenador: <?php echo htmlspecialchars($coach['name']); ?></h1>
    
    <form action="editar.php" method="post">
        <input type="hidden" name="id" value="<?php echo $coach['id']; ?>">
        
        <div class="form-group">
            <label for="name">Nombre:</label>
            <input type="text" id="name" name="name" value="<?php echo htmlspecialchars($coach['name']); ?>" required>
        </div>
        <div class="form-group">
            <label for="role">Rol:</label>
            <input type="text" id="role" name="role" value="<?php echo htmlspecialchars($coach['role']); ?>" required>
        </div>
        <div class="form-group">
            <label for="bio">Biografía:</label>
            <textarea id="bio" name="bio"><?php echo htmlspecialchars($coach['bio']); ?></textarea>
        </div>
        <div class="form-group">
            <label for="quote">Frase:</label>
            <textarea id="quote" name="quote"><?php echo htmlspecialchars($coach['quote']); ?></textarea>
        </div>
        <button type="submit">Guardar Cambios</button>
    </form>
    
    <br>
    <a href="index.php">Cancelar y volver a la lista</a>
</body>
</html>