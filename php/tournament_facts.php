<?php
	//PHp file to query the database and find all the different factes about the particular edition of the tournament
	require('database.php');
	$year = $_POST['year'];
	$sql = "SELECT * FROM facts WHERE `year` = $year";
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
