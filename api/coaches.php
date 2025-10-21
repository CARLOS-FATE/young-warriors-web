<?php
// api/coaches.php
require_once $_SERVER['DOCUMENT_ROOT'] . '/api/db_connection.php'; // Esta línea hace la conexión a TiDB Cloud

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$sql = "SELECT id, name, role, img, bio, quote FROM coaches";
$result = $conn->query($sql);

$coachesData = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $coachesData[] = $row;
    }
}

$conn->close(); 

echo json_encode($coachesData);
?>