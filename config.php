<?php 
    $usuario = 'root';
    $contraseña = '';

    try {
        $conn = new PDO('mysql:host=localhost;dbname=prospectos_test', $usuario, $contraseña);
    } catch (PDOException $e) {
        print "¡Error!: " . $e->getMessage() . "<br/>";
        die();
    }
?>