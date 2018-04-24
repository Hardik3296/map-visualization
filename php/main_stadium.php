<?php
	require('database.php');
	$year = $_POST['year'];
	$sql = "SELECT stadium_name,latitude,longitude,city,country FROM stadiums NATURAL JOIN venues_$year WHERE `hosted_final` = 1 ";
	$result = mysqli_query($connection,$sql);
	if(mysqli_num_rows($result) > 0) {
		$row = mysqli_fetch_assoc($result);
		mysqli_close($connection);
		echo json_encode($row);
	}
	else {
		mysqli_close($connection);
		echo json_encode(mysqli_error($connection));
	}
?>