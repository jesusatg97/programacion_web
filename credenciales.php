<?php
$codigo=$_GET['codigo'];
$password = $_GET['password'];

$conn=mysqli_connect("remotemysql.com:3306","mEZnhrxLWk","6D9dPZhNaK","mEZnhrxLWk");
    
    //check connection
if(!$conn) die("Connection failed: " . mysqli_connect_error());

 $sql = "SELECT COUNT(*) as credentials FROM Estacionamiento WHERE codigo='$codigo' AND password='$password'";
            $resultado=mysqli_query($conn,$sql);
            if(!$resultado){
                echo 'algo salio mal credenciales';
            } else {
                while($filaResult = mysqli_fetch_assoc($resultado)){
                    if($filaResult['credentials'] == 0) echo 'datos incorrectos';
                    else {
                        $sqlName="SELECT nombre FROM Estacionamiento WHERE codigo='$codigo'";
                        $resultadoName=mysqli_query($conn,$sqlName);
                        if(!$resultadoName) echo 'algo salio mal nombre';
                        else {
                            if($filaName = mysqli_fetch_assoc($resultadoName)){
                                echo $filaName['nombre'];
                            }
                           
                        }
                    }
                }
            }

mysqli_close($conn);

?>
    