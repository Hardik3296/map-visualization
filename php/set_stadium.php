<?php
	require('database.php');
	$stadium_name = $_POST['stadium_name'];
	$sql = "SELECT longitude,latitude FROM stadiums WHERE stadium_name = '$stadium_name'";
	$result = mysqli_query($connection,$sql);
	if(mysqli_num_rows($result) > 0) {
		$row = mysqli_fetch_assoc($result);
		echo json_encode($row);
	}
	else {
		echo json_encode(mysqli_error($connection));
	}
	mysqli_close($connection);
?>