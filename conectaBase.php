<?php
header("Access-Control-Allow-Origin: *");
$codigo = $_GET['codigo'];


//lo primero para hacer el select es crear la conexion.
$conn=mysqli_connect("remotemysql.com:3306","mEZnhrxLWk","6D9dPZhNaK","mEZnhrxLWk");

//checar la conexion es el segundo paso-
if(!$conn)die("Connection failed: " . mysqli_connect_error());

$sql = "SELECT nombre,placas FROM Estacionamiento WHERE codigo='$codigo'";

$res=mysqli_query($conn,$sql);
if($res){

    while($fila = mysqli_fetch_assoc($res))
    {   
        $j = implode(",",$fila);
            echo $j;


        
    }


    
}else{
    
 echo '0';
}

mysqli_close($conn);


?>