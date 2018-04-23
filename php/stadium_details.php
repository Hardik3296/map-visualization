<?php
	require('database.php');
	if(mysqli_connect_errno()) {
		echo json_encode("failed to connect to databse");
	}
	$stadium = $_POST['stadium_name'];
	$sql = "SELECT city_facts,city FROM cities WHERE city = (SELECT city FROM stadiums WHERE stadium_name='$stadium')";
	$result = mysqli_query($connection,$sql);
	if(mysqli_num_rows($result) > 0) {
		$row = mysqli_fetch_assoc($result);
		echo json_encode($row);
	}
	mysqli_close($connection);
?>