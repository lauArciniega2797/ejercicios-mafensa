<?php
// header("Content-Type: application/xls");    
// header("Content-Disposition: attachment; filename=prospectos_mafensa.xls");
header("Pragma: no-cache");
include('config.php');

$sql = "SELECT * FROM prospectos";
$consulta = $conn->query($sql);
$fila = $consulta->fetchAll();

if($consulta) {
    $count = 1;
    $file .= "
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre a facturaedwedwedewr</th>
                    <th>Nombre comercial</th>
                    <th>Encargado</th>
                    <th>Ciudad</th>
                    <th>Teléfono</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
    ";

        foreach($fila as $filita) {
            $file .= "
                <tr>
                    <td>$count</td>
                    <td>".$filita['nombre_f']."</td>
                    <td>".$filita['nombre_c']."</td>
                    <td>".$filita['encargado']."</td>
                    <td>".$filita['ciudad']."</td>
                    <td>".$filita['telefono']."</td>
                    <td>".$filita['email']."</td>
                </tr>
            ";
        
            $count++;
        }

    $file .= "
            </tbody>
        </table>
    ";
}

var_dump($file);
?>