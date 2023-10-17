<?php
// Datos de conexión a la base de datos
require('config.db.php');

// Obtener los datos enviados por la solicitud en formato JSON
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Crear una conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    error_log("Error de conexión: " . $conn->connect_error);
    echo json_encode(array('result' => 'error', 'message' => 'Error de conexión a la base de datos.'));
    exit();
}

//$minutosEntero = 60 * 3;
//$minutos = $minutosEntero / 60; // Corregir el punto y coma
// $seno = 'Izquierdo';

// $idUser = 3;

if (empty($data["seno"]) || empty($data["tiempo"]) || empty($data["idDevice"]) ||  empty($data["idUser"]) ) {
    $response = array('result' => 'error', 'message' => 'Faltan campos requeridos.');
} else {
    // Datos a insertar en la tabla "usuarios"
    $seno = $conn->real_escape_string($data["seno"]);
    $tiempo = $conn->real_escape_string($data["tiempo"]);
    $idDispositivo = $conn->real_escape_string($data["idDevice"]);
    $idUser = $conn->real_escape_string($data["idUser"]);
    $fechaActual = date("Y-m-d H:i:s"); // Obtener la fecha y hora actual en el formato "YYYY-MM-DD HH:MM:SS"
    $fechaSumada = date("Y-m-d H:i:s", strtotime($fechaActual) + ($tiempo)); // Sumar 5 minutos (5 * 60 segundos)
    $estado = 'P';
        // Insertar datos en la tabla "notificaciones" utilizando consultas preparadas
        $sqlInsertDatos = "INSERT INTO notificaciones (lastSeno, fechaInicial, fechaFinal, estado, idDispositivo, idUser) VALUES (?, ?, ?, ?, ?, ?)";
        $sqlInsertDatos2 = $conn->prepare($sqlInsertDatos);
        $sqlInsertDatos2->bind_param("sssssi", $seno, $fechaActual, $fechaSumada, $estado, $idDispositivo, $idUser); // Corregir la vinculación de parámetros
        
        if ($sqlInsertDatos2->execute()) {
            // Los datos se insertaron correctamente
            $response = array('result' => 'success', 'message' => 'Registro exitoso.');
            echo json_encode($response);
        } else {
            // Ocurrió un error al insertar los datos en la tabla "notificaciones"
            $response = array('result' => 'error', 'message' => 'Error al insertar datos en la tabla "notificaciones": ' . $sqlInsertDatos2->error);
        }
}

// Devolver la respuesta como JSON
header('Content-Type: application/json');
echo json_encode($response);

// Cerrar la conexión
$conn->close();
?>
