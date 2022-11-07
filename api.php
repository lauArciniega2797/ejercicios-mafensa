<?php
    error_reporting(E_ALL);
    header("Content-type: application/json");
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");

    include('config.php');

    $res = array('error' => false);

    if (isset($_GET['action']) && !empty($_GET['action'])) {
        $action = $_GET['action'];
    }

    if($action == 'test') {
        $res['esto'] = 'Si se armo';
    }

    if($action == 'consultar_prospectos'){
        $datos = array();
        $sql = "SELECT * FROM prospectos";
        $consulta = $conn->query($sql);

        $fila = $consulta->fetchAll();
        if($consulta) {
            $res['error'] = false;
            foreach($fila as $filita){
                $row['encargado']   = $filita['encargado'];
                $row['nombre_f']    = $filita['nombre_f'];
                $row['nombre_c']    = $filita['nombre_c'];
                $row['telefono']    = $filita['telefono'];
                $row['ciudad']      = $filita['ciudad'];
                $row['email']       = $filita['email'];
                $row['id']          = $filita['id'];
    
                array_push($datos, $row);
            }
        } else {
            $res['error'] = true;
        }

        $res['datos'] = $datos;
    }
    if($action == 'registrar_prospectos') {
        $opc = $_GET['opc'];
        $datos = array();
        $data = json_decode(file_get_contents('php://input'), true);
        $nombre_f = $data['nombre_f'];
        $nombre_c = $data['nombre_c'];
        $encargado = $data['encargado'];
        $ciudad = $data['ciudad'];
        $telefono = $data['telefono'];
        $email = $data['email'];
        $code = $data['code'];

        $res['opc'] = $opc;
        if ($opc == 'i') {
            $sql = "INSERT INTO prospectos(nombre_f, nombre_c, encargado, ciudad, telefono, email) VALUES('$nombre_f', '$nombre_c', '$encargado', '$ciudad', $telefono, '$email')";

            $res['consulta'] = $sql;
            $consulta = $conn->query($sql);

            if($consulta) {
                $res['message'] = "El prospecto $nombre_c se ha registrado correctamente";
                $res['error'] = false;
            } else {
                $res['error'] = true;

            }
        }
        else if ($opc == 'u') {
            $sql = "UPDATE prospectos SET nombre_f = '$nombre_f', nombre_c = '$nombre_c', encargado = '$encargado', ciudad = '$ciudad', telefono = $telefono, email = '$email' WHERE id = '$code'";
    
            // $res['consulta'] = $sql;
            $consulta = $conn->query($sql);
    
            if($consulta) {
                $res['message'] = "Se actualizo al prospecto correctamente";
                $res['error'] = false;
            } else {
                $res['error'] = true;
    
            }
        }
    }

    if($action == 'deleteProspecto') {
        $data = json_decode(file_get_contents('php://input'), true);

        $code = $data['llave'];

        $sql = "DELETE FROM prospectos WHERE id = $code";
        
        $consulta = $conn->query($sql);

        if($consulta){
            $res['message'] = "Se elimino el registro correctamente";
            $res['error'] = false;
        }
        else {
            $res['error'] = true;
        }
    }

    if($action == 'editProspecto') {
        $data = json_decode(file_get_contents('php://input'), true);
        $code = $data['llave'];
        $datos = array();

        $sql = "SELECT * FROM prospectos WHERE id = $code";
        
        $consulta = $conn->query($sql);
        $filas = $consulta->fetchAll();

        if($consulta) {
            $res['error'] = false;

            foreach ($filas as $fila) {
                $row['encargado']   = $fila['encargado'];
                $row['nombre_f']    = $fila['nombre_f'];
                $row['nombre_c']    = $fila['nombre_c'];
                $row['telefono']    = $fila['telefono'];
                $row['ciudad']      = $fila['ciudad'];
                $row['email']       = $fila['email'];
                $row['id']          = $fila['id'];

                array_push($datos, $row);
            }

            $res['datos'] = $datos;
        }
        else {
            $res['error'] = true;
        }
    }

    $conn = null; #para cerrar la conexión
    echo json_encode($res);
    die();
?>