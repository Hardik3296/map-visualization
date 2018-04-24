<?php
	// Establishing connection to database
	require_once('database.php');
	// Accessing all the values of the form 
	$stadium_name = $_GET['stadium_name'];
	$latitude = $_GET['latitude'];
	$longitude = $_GET['longitude'];
	$city = $_GET['city'];
	$country = $_GET['country'];
	$city_description = $_GET['city_description'];
	// Mysql query for the purpose
	$sql = "INSERT INTO stadiums(stadium_name,latitude,longitude,city,country) VALUES ('$stadium_name','$latitude','$longitude','$city','$country')";
	// Running the query on the database
	$result = mysqli_query($connection,$sql);
	if($result) {
		$sql_another = "INSERT INTO cities(city,city_facts) VALUES ('$city','$city_description')";
		$result_another  =  mysqli_query($connection,$sql_another);
		if($result) {
			echo "Data successfully inserted";
			mysqli_close($connection);
		}
		else {
			echo "Data could not be inserted successfully";
			mysqli_close($connection);
		}
	}
	else {
		echo "Data could not be inserted successfully";
		mysqli_close($connection);
	}
?>