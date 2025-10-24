<?php
//api/posts.php


require_once $_SERVER['DOCUMENT_ROOT'] . '/api/db_connection.php'; // Esta línea hace la conexión a TiDB Cloud

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