<?php
//api/posts.php


// CORRECTO
require_once __DIR__ . '/db_connection.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


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