<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$servername = "localhost";
$username = "REMOVED";
$password = "REMOVED;
$dbname = "id22285156_color_db";

// connect to database
$conn = new mysqli($servername, $username, $password, $dbname);

// check connection
if ($conn->connect_error) {
    error_log("Verbindung fehlgeschlagen: " . $conn->connect_error);
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}

// extract rgb values from post
$name = $_POST['name'] ?? '';
$red = $_POST['red'] ?? '';
$green = $_POST['green'] ?? '';
$blue = $_POST['blue'] ?? '';

// prepare sql request
$stmt = $conn->prepare("INSERT INTO colors (name, red, green, blue) VALUES (?, ?, ?, ?)");
$stmt->bind_param("siii", $name, $red, $green, $blue);

// debug logging
echo "Name: $name, Red: $red, Green: $green, Blue: $blue\n";
error_log("Name: $name, Red: $red, Green: $green, Blue: $blue");


// insert query
$sql = "INSERT INTO colors (name, red, green, blue) VALUES ('$name', '$red', '$green', '$blue')";

// save
if ($stmt->execute()) {
    echo "Erfolgreich gespeichert";
} else {
    echo "Fehler: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>