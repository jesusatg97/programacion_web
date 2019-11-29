<?php
    $servername = "remotemysql.com:3306";
    $username = "mEZnhrxLWk";
    $password = "6D9dPZhNaK";
    $database = "mEZnhrxLWk";
    
    $codigo = $_GET['codigo'];
    $clave = $_GET['password'];
    
    // Creación de la conexión . . .
    $conn = mysqli_connect($servername, $username, $password, $database);
    
    // Comprobar la conexión . . .
    if (!$conn) {
        die("Conexion Fallida: " . mysqli_connect_error());
    }
    
    // Instrucción SQL . . .
    $sql = "SELECT * FROM Estacionamiento WHERE Codigo = '$codigo' AND password = '$clave'";
    $result = mysqli_query($conn, $sql);
    
    // Instrucción para obtener los datos de la consulta SQL en un array . . .
    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
        $array[] = $row;
    }
    
    // Comprobar la realización de la instrucción SQL . . .
    if (mysqli_num_rows($result)>0) {
        // Convierte el array con los datos de la consulta a un objeto JSON . . .
        echo json_encode($array);
    } else {
        echo "Datos Desconocidos";
        //echo "Error. " . "<br>" . mysqli_error($conn);
    }
    
    mysqli_close($conn);
    
?>