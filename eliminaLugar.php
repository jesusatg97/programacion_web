<?php
header("Access-Control-Allow-Origin: *");
$Placas = $_GET['Placas'];


//lo primero para hacer el select es crear la conexion.
$conn=mysqli_connect("remotemysql.com:3306","mEZnhrxLWk","6D9dPZhNaK","mEZnhrxLWk");

//checar la conexion es el segundo paso-
if(!$conn)
{
    die("Connection failed: " . mysqli_connect_error());
}
else
{
     $sql = "DELETE FROM LugarE WHERE Placas = '$Placas'";

	//echo($sql)
	if(mysqli_query($conn,$sql)){
		
		
		
		echo mysqli_affected_rows($conn);
		
	}
	else
	{
		echo "0";
	}
}
mysqli_close($conn);
?>