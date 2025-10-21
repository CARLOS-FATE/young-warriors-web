<?php
// admin/crear.php
require_once 'auth.php';
// --- Lógica para procesar el formulario cuando se envía ---
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Conexión a la BD
require_once  '../api/db_connection.php'; 

    // Recoger los datos del formulario
    $name = $_POST['name'];
    $role = $_POST['role'];
    $bio = $_POST['bio'];
    $quote = $_POST['quote'];
    $img = '/images/coach-placeholder.jpg'; // Imagen por defecto

    // Preparar y ejecutar la consulta SQL para insertar los datos
    $sql = "INSERT INTO coaches (name, role, bio, quote, img) VALUES (?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    // 'sssss' significa que estamos enviando 5 strings
    $stmt->bind_param("sssss", $name, $role, $bio, $quote, $img);

    if ($stmt->execute()) {
        // Redirigir a la página principal si fue exitoso
        header("Location: index.php");
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Añadir Nuevo Entrenador</title>
    <style>
        /* Mismos estilos que index.php para consistencia */
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
        h1 { color: #333; }
        form { max-width: 600px; margin-top: 20px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; }
        input[type="text"], textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        textarea { height: 100px; }
        button { padding: 10px 15px; background-color: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; }
        a { color: #007bff; }
    </style>
</head>
<body>
    <h1>Añadir Nuevo Entrenador</h1>
    
    <form action="crear.php" method="post">
        <div class="form-group">
            <label for="name">Nombre:</label>
            <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
            <label for="role">Rol:</label>
            <input type="text" id="role" name="role" required>
        </div>
        <div class="form-group">
            <label for="bio">Biografía:</label>
            <textarea id="bio" name="bio"></textarea>
        </div>
        <div class="form-group">
            <label for="quote">Frase:</label>
            <textarea id="quote" name="quote"></textarea>
        </div>
        <button type="submit">Guardar Entrenador</button>
    </form>
    
    <br>
    <a href="index.php">Volver a la lista</a>
</body>
</html>