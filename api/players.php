<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// --- Conexión a la BD (igual que en coaches.php) ---
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "young_warriors_db";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// --- Consulta a la nueva tabla players ---
$sql = "SELECT * FROM players";
$result = $conn->query($sql);

$playersData = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $player = [
            'id' => $row['id'],
            'name' => $row['name'],
            'img' => $row['img'],
            'position' => $row['position'],
            'isMVP' => (bool)$row['isMVP'], 
            'skills' => [
                'dribbling' => (int)$row['skill_dribbling'],
                'pase' => (int)$row['skill_pase'],
                'lanzamiento' => (int)$row['skill_lanzamiento']
            ],
            'teamAchievements' => json_decode($row['teamAchievements'])
        ];
        $playersData[] = $player;
    }
}

$conn->close();

echo json_encode($playersData);
?>