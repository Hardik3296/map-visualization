<?php
	require('database.php');
	$table = $_POST['table'];
	$sql = "SELECT * FROM $table";
	$locations = array();
	$index = 0;
	$result = mysqli_query($connection,$sql);
	if(mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_assoc($result)) {
			$locations[$index++] = $row;
		}
		echo json_encode($locations);
		mysqli_close($connection);
	}
	else {
		echo json_encode(mysqli_error($connection));
		mysqli_close($connection);
	}
?>