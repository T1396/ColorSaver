<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

$servername = "localhost";
$username = "REMOVED"; // 000webhost default username
$password = "REMOVED"; // 000webhost default password
$dbname = "id22285156_color_db";

// connect with database
$conn = new mysqli($servername, $username, $password, $dbname);

// check connection
if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
    http_response_code(500); // Interner Serverfehler
    echo json_encode(['error' => 'Could not connect to database: ' . $conn->connect_error]);
    exit; // Beendet das Skript frühzeitig, wenn ein Fehler auftritt
}

// fetch color query
$sql = "SELECT * FROM colors";
$result = $conn->query($sql);

if ($result === false) {
    http_response_code(500); // server error
    echo json_encode(['error' => 'Errow with the sql query: ' . $conn->error]);
    $conn->close();
    exit;
}

$colors = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $colors[] = $row;
    }
}

echo json_encode($colors);
$conn->close();
?>
