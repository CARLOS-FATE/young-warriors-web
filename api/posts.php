<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// --- Conexión a la BD ---
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "young_warriors_db";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// --- Consulta a la nueva tabla posts ---
$sql = "SELECT * FROM posts";
$result = $conn->query($sql);

$postsData = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $postsData[] = $row;
    }
}

$conn->close();

echo json_encode($postsData);
?>