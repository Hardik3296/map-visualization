<?php
	require('database.php');
	$year = $_POST['year'];
	//$sql = "SELECT stadium_name FROM venues_$year";
	$sql = "SELECT stadium_name,latitude,longitude,city FROM stadiums NATURAL JOIN venues_$year";
	$stadium_name = array();
	$index = 0;
	$result = mysqli_query($connection,$sql);
	if(mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_assoc($result)) {
			$stadium_name[$index++] = $row;
		}
		echo json_encode($stadium_name);
	}
	else {
		echo mysqli_error($connection);
	}
	mysqli_close($connection);
?>