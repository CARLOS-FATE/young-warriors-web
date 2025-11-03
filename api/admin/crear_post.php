<?php
// admin/crear_post.php
require_once 'auth.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // --- Conexión a la BD ---
require_once $_SERVER['DOCUMENT_ROOT'] . '/api/db_connection.php';
    // --- Recoger datos del formulario ---
    $title = $_POST['title'];
    $description = $_POST['description'];
    $category = $_POST['category'];
    $content = $_POST['content'];
    $image = '/images/blog/placeholder.jpg'; // Imagen por defecto para nuevos posts

    // --- Generar el SLUG a partir del título ---
    $slug = strtolower($title); // Convertir a minúsculas
    $slug = preg_replace('/[^a-z0-9\s-]/', '', $slug); // Quitar caracteres especiales
    $slug = preg_replace('/[\s-]+/', '-', $slug); // Reemplazar espacios y guiones con un solo guión
    $slug = trim($slug, '-'); // Quitar guiones al principio y al final

    // --- Insertar en la base de datos ---
    $sql = "INSERT INTO posts (slug, title, description, category, content, image) VALUES (?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssss", $slug, $title, $description, $category, $content, $image);

    if ($stmt->execute()) {
        header("Location: posts.php");
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
    <title>Añadir Nuevo Artículo</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
        h1 { color: #333; }
        form { max-width: 800px; margin-top: 20px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; }
        input[type="text"], textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        textarea { resize: vertical; }
        #description { height: 100px; }
        #content { height: 300px; }
        button { padding: 10px 15px; background-color: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; }
        a { color: #007bff; }
    </style>
</head>
<body>
    <h1>Añadir Nuevo Artículo</h1>
    
    <form action="crear_post.php" method="post">
        <div class="form-group">
            <label for="title">Título:</label>
            <input type="text" id="title" name="title" required>
        </div>
        <div class="form-group">
            <label for="category">Categoría:</label>
            <input type="text" id="category" name="category" required>
        </div>
        <div class="form-group">
            <label for="description">Descripción (Resumen para la tarjeta del blog):</label>
            <textarea id="description" name="description" required></textarea>
        </div>
        <div class="form-group">
            <label for="content">Contenido Completo del Artículo (acepta HTML):</label>
            <textarea id="content" name="content" required></textarea>
        </div>
        
        <button type="submit">Guardar Artículo</button>
    </form>
    
    <br>
    <a href="posts.php">Volver a la lista</a>
</body>
</html>