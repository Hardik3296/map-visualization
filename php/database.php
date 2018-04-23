<?php
	$username = "root";
	$password = "";
	$dbname = "skylark_drones";
	$servername = "localhost";
	$connection = mysqli_connect($servername, $username, $password, $dbname);
	if(mysqli_connect_errno()) {
		$return = array('error'=>'true');
		echo $return;
	}
?>