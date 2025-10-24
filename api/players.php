<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/api/db_connection.php'; // Esta línea hace la conexión a TiDB Cloud

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 

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