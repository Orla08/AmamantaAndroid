<?php
// Datos de conexión a la base de datos
require('config.db.php');
// Crear una conexión
$conn = new mysqli($servername, $username, $password, $dbname);
// Verificar la conexión
if ($conn->connect_error) {
    error_log("Error de conexión: " . $conn->connect_error);
    echo json_encode(array('result' => 'error', 'message' => 'Error de conexión a la base de datos.'));
    exit();
}

// Consulta SQL para obtener el tiempo acumulado
$sqlInsertDatos = "SELECT TIME_FORMAT(SEC_TO_TIME(SUM(TIME_TO_SEC(tiempo))), '%H:%i:%s') AS suma_de_tiempos FROM datos WHERE idUser=2";
$result = $conn->query($sqlInsertDatos);

if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {
        echo "Tiempo acumulado: " . $row["suma_de_tiempos"];
    }
} else {
    echo "0 results";
}

// Cerrar la conexión
$conn->close();
?>
