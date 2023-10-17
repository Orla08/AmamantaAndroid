<?php
 // Este es el bat que se ejecuta cada un minuto
require('config.db.php');
require('onSignal.php');

$json = file_get_contents("php://input");
$data = json_decode($json, true);

$fechaActual = date("Y-m-d H:i:s"); // Obtener la fecha y hora actual en el formato "YYYY-MM-DD HH:MM:SS"
$sql = "SELECT * FROM notificaciones WHERE estado = 'P' and fechaFinal<='$fechaActual' ";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = array();
    while ($row = $result->fetch_assoc()) {

        $id = $row['id'];
        $idDispositivo = $row['idDispositivo'];

        $sql2 = "UPDATE notificaciones SET estado='E' WHERE id = '$id' ";
        if ($conn->query($sql2) === TRUE) {
            send($id, $idDispositivo);
        } else {
            echo "Error updating record: " . $conn->error;
        }

        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo "0 results";
}

$conn->close();
?>

