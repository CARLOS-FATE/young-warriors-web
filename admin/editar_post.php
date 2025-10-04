<?php

require_once 'auth.php';
// admin/editar_post.php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "young_warriors_db";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) { die("Connection failed: " . $conn->connect_error); }

// --- Lógica para ACTUALIZAR el post ---
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    $category = $_POST['category'];
    $content = $_POST['content'];

    // Regeneramos el slug por si el título cambió
    $slug = strtolower($title);
    $slug = preg_replace('/[^a-z0-9\s-]/', '', $slug);
    $slug = preg_replace('/[\s-]+/', '-', $slug);
    $slug = trim($slug, '-');

    $sql = "UPDATE posts SET slug=?, title=?, description=?, category=?, content=? WHERE id=?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssi", $slug, $title, $description, $category, $content, $id);

    if ($stmt->execute()) {
        header("Location: posts.php");
        exit();
    } else {
        echo "Error al actualizar: " . $stmt->error;
    }
    $stmt->close();
}

// --- Lógica para OBTENER los datos del post ---
$id = $_GET['id'];
$sql = "SELECT * FROM posts WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$post = $result->fetch_assoc();
$stmt->close();

if (!$post) {
    die("Artículo no encontrado.");
}
$conn->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar Artículo</title>
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
        button { padding: 10px 15px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; }
        a { color: #007bff; }
    </style>
</head>
<body>
    <h1>Editar Artículo</h1>
    
    <form action="editar_post.php" method="post">
        <input type="hidden" name="id" value="<?php echo $post['id']; ?>">
        
        <div class="form-group">
            <label for="title">Título:</label>
            <input type="text" id="title" name="title" value="<?php echo htmlspecialchars($post['title']); ?>" required>
        </div>
        <div class="form-group">
            <label for="category">Categoría:</label>
            <input type="text" id="category" name="category" value="<?php echo htmlspecialchars($post['category']); ?>" required>
        </div>
        <div class="form-group">
            <label for="description">Descripción (Resumen):</label>
            <textarea id="description" name="description" required><?php echo htmlspecialchars($post['description']); ?></textarea>
        </div>
        <div class="form-group">
            <label for="content">Contenido Completo del Artículo (acepta HTML):</label>
            <textarea id="content" name="content" required><?php echo htmlspecialchars($post['content']); ?></textarea>
        </div>
        
        <button type="submit">Guardar Cambios</button>
    </form>
    
    <br>
    <a href="posts.php">Cancelar y volver a la lista</a>
</body>
</html>