<?php
// api/coaches.php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "root";
$password = "";    
$dbname = "young_warriors_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

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