$(document).ready(function(){
	var cityDescription = '';
	var cityName = '';
	var nameOfStadium = '';
	var edition = '';
	var mymap = L.map('map',{zoomControl: false});
	mymap.setView([20, 20],2);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 20,
    minZoom: 2,
  	maxBoundsViscosity: 1,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiaGFyZGlrZ2F1ciIsImEiOiJjamZ2OWlkcHkxNzk3MnFxa3MwNHE5ZXl5In0.XSaRawrhbY-26R42NwK6lQ'
	}).addTo(mymap);

	// Changing the dashboard on changing the zoom level of the map
	mymap.on('zoomend', function(event) {
		var stadiumSelection = document.getElementById('stadium-selection');
		var yearSelection = document.getElementById('year-selection');
		// Changing the visibility of the stadium selection button in the next two if statements
		if(event.target.getZoom() >= 8) {
			if(stadiumSelection.style.visibility == 'hidden')
				stadiumSelection.style.visibility = 'visible';
		}
		if(event.target.getZoom() < 8) {
			if(document.getElementById('city-selection').style.visibility == 'visible') {
				document.getElementById('city-selection').style.visibility = 'hidden';
				if(document.getElementById('location-selection').style.visibility == 'visible')
					document.getElementById('location-selection').style.visibility = 'hidden';
			}
			if(stadiumSelection.style.visibility != 'hidden') {
				stadiumSelection.style.visibility = 'hidden';
			}
		}
		// Changing the visibility of the year selection button in the next two if statements
		if(event.target.getZoom() < 5) {
			if(document.getElementById('city-selection').style.visibility == 'visible') {
				document.getElementById('city-selection').style.visibility = 'hidden';
				if(document.getElementById('location-selection').style.visibility == 'visible')
					document.getElementById('location-selection').style.visibility = 'hidden';
			}
			if(yearSelection.style.visibility != 'hidden') {
				yearSelection.style.visibility = 'hidden';
				removeAppliedLayers();
				if(edition != '')
				{
					$.ajax({
						url: 'php/main_stadium.php',
						dataType: 'json',
						data: ({year:edition}),
						type: 'POST',
						success: function(response) {
							latitude = response['latitude'];
							longitude = response['longitude'];			
						}
					});
					$.ajax({
						url: 'php/tournament_facts.php',
						dataType: 'json',
						data: ({year:edition}),
						type: 'POST',
						success: function(argument) {
							//Placing the marker on the map
							console.log('tournament facts');
							console.log(argument);
							var greenMarker = L.AwesomeMarkers.icon({ 
								extraClasses:'ion-location',
								iconColor: 'white',
								markerColor: 'darkgreen'
							});
							var markerExample = L.marker([latitude,longitude], {icon: greenMarker});		
							markerExample.bindPopup("<b>Host :</b>"+argument['host']+"<br>"+"<b>Winning Team :</b>"+argument['winning_team']+"<br>"+"<b>Winning Coach :</b>"+argument['winning_coach']+"<br>"+"<b>Top Scorer :</b>"+argument['top_scorer']+"<br>"+"<b>Most Valuable Player :</b>"+argument['most_valuable_player']);
							mymap.setView([latitude,longitude],3);
							markerExample.addTo(mymap);
						},
						error: function (argument,error_statement) {
							console.log(argument);
							console.log(error_statement);
						}
					});
				}
			}
		}
		if(event.target.getZoom() >= 5) {
			if(yearSelection.style.visibility == 'hidden') {
				yearSelection.style.visibility = 'visible';
				$.ajax({
					url: 'php/stadium.php',
					dataType: 'json',
					data: ({year:edition}),
					type: 'POST',
					success: function(response) {
						var list = document.getElementById('selected-stadium');
						var liList = document.querySelectorAll("#selected-stadium li");
						if(liList.length > 0) {
							$('#selected-stadium li').remove();
						}
						//Creating li elements and adding to stadium list
						for (var i = 0; i < response.length; i++) {
							var li = document.createElement("li");
							var text = document.createTextNode(response[i]['stadium_name']);
							li.appendChild(text);
							li.className = 'list-years list-years:hover';
							list.appendChild(li);	
						}
						//Placing the marker on the map
						markerplacement(response);
					}
				});
			}
		}
	});

	// Checking for clicking of 2017
	$('#2017').click(function(){
		edition = 2017;
		latitude = '';
		longitude = '';
		$.ajax({
			url: 'php/main_stadium.php',
			dataType: 'json',
			data: ({year:edition}),
			type: 'POST',
			success: function(response) {
				latitude = response['latitude'];
				longitude = response['longitude'];			
			}
		});
		$.ajax({
			url: 'php/tournament_facts.php',
			dataType: 'json',
			data: ({year:edition}),
			type: 'POST',
			success: function(argument) {
				//Placing the marker on the map
				console.log('tournament facts');
				console.log(argument);
				var greenMarker = L.AwesomeMarkers.icon({
					extraClasses:'ion-location',
					iconColor: 'white',
					markerColor: 'darkgreen'
				});
				var markerExample = L.marker([latitude,longitude], {icon: greenMarker});		
				markerExample.bindPopup("<b>Host :</b>"+argument['host']+"<br>"+"<b>Winning Team :</b>"+argument['winning_team']+"<br>"+"<b>Winning Coach :</b>"+argument['winning_coach']+"<br>"+"<b>Top Scorer :</b>"+argument['top_scorer']+"<br>"+"<b>Most Valuable Player :</b>"+argument['most_valuable_player']);
				mymap.setView([latitude,longitude],3);
				markerExample.addTo(mymap);
			},
			error: function (argument,error_statement) {
				console.log(argument);
				console.log(error_statement);
			}
		});
	});

	// Checking for clicking of 2015
	$('#2015').click(function(){
		edition = 2015;
		$.ajax({
			url: 'php/main_stadium.php',
			dataType: 'json',
			data: ({year:edition}),
			type: 'POST',
			success: function(response) {
				latitude = response['latitude'];
				longitude = response['longitude'];			
			}
		});
		$.ajax({
			url: 'php/tournament_facts.php',
			dataType: 'json',
			data: ({year:edition}),
			type: 'POST',
			success: function(argument) {
				//Placing the marker on the map
				console.log('tournament facts');
				console.log(argument);
				var greenMarker = L.AwesomeMarkers.icon({
					extraClasses:'ion-location',
					iconColor: 'white',
					markerColor: 'darkgreen'

				});
				var markerExample = L.marker([latitude,longitude], {icon: greenMarker});		
				markerExample.bindPopup("<b>Host :</b>"+argument['host']+"<br>"+"<b>Winning Team :</b>"+argument['winning_team']+"<br>"+"<b>Winning Coach :</b>"+argument['winning_coach']+"<br>"+"<b>Top Scorer :</b>"+argument['top_scorer']+"<br>"+"<b>Most Valuable Player :</b>"+argument['most_valuable_player']);
				mymap.setView([latitude,longitude],3);
				markerExample.addTo(mymap);
			},
			error: function (argument,error_statement) {
				console.log(argument);
				console.log(error_statement);
			}
		});
	});

	// Checking for clicking of 2013
	$('#2013').click(function(){
		edition = 2013;
		$.ajax({
			url: 'php/main_stadium.php',
			dataType: 'json',
			data: ({year:edition}),
			type: 'POST',
			success: function(response) {
				latitude = response['latitude'];
				longitude = response['longitude'];			
			}
		});
		$.ajax({
			url: 'php/tournament_facts.php',
			dataType: 'json',
			data: ({year:edition}),
			type: 'POST',
			success: function(argument) {
				//Placing the marker on the map
				console.log('tournament facts');
				console.log(argument);
				var greenMarker = L.AwesomeMarkers.icon({
					extraClasses:'ion-location',
					iconColor: 'white',
					markerColor: 'darkgreen'
				});
				var markerExample = L.marker([latitude,longitude], {icon: greenMarker});		
				markerExample.bindPopup("<b>Host :</b>"+argument['host']+"<br>"+"<b>Winning Team :</b>"+argument['winning_team']+"<br>"+"<b>Winning Coach :</b>"+argument['winning_coach']+"<br>"+"<b>Top Scorer :</b>"+argument['top_scorer']+"<br>"+"<b>Most Valuable Player :</b>"+argument['most_valuable_player']);
				mymap.setView([latitude,longitude],3);
				markerExample.addTo(mymap);
			},
			error: function (argument,error_statement) {
				console.log(argument);
				console.log(error_statement);
			}
		});
	});

	// Checking for clicking of 2012
	$('#2012').click(function(){
		edition = 2012;
		$.ajax({
			url: 'php/main_stadium.php',
			dataType: 'json',
			data: ({year:edition}),
			type: 'POST',
			success: function(response) {
				latitude = response['latitude'];
				longitude = response['longitude'];			
			}
		});
		$.ajax({
			url: 'php/tournament_facts.php',
			dataType: 'json',
			data: ({year:edition}),
			type: 'POST',
			success: function(argument) {
				//Placing the marker on the map
				console.log('tournament facts');
				console.log(argument);
				var greenMarker = L.AwesomeMarkers.icon({
					extraClasses:'ion-location',
					iconColor: 'white',
					markerColor: 'darkgreen'
				});
				var markerExample = L.marker([latitude,longitude], {icon: greenMarker});		
				markerExample.bindPopup("<b>Host :</b>"+argument['host']+"<br>"+"<b>Winning Team :</b>"+argument['winning_team']+"<br>"+"<b>Winning Coach :</b>"+argument['winning_coach']+"<br>"+"<b>Top Scorer :</b>"+argument['top_scorer']+"<br>"+"<b>Most Valuable Player :</b>"+argument['most_valuable_player']);
				mymap.setView([latitude,longitude],3);
				markerExample.addTo(mymap);
			},
			error: function (argument,error_statement) {
				console.log(argument);
				console.log(error_statement);
			}
		});
	});

	// Checking for clicking of 2010
	$('#2010').click(function(){
		edition = 2010;
		$.ajax({
			url: 'php/main_stadium.php',
			dataType: 'json',
			data: ({year:edition}),
			type: 'POST',
			success: function(response) {
				latitude = response['latitude'];
				longitude = response['longitude'];			
			}
		});
		$.ajax({
			url: 'php/tournament_facts.php',
			dataType: 'json',
			data: ({year:edition}),
			type: 'POST',
			success: function(argument) {
				//Placing the marker on the map
				console.log('tournament facts');
				console.log(argument);
				var greenMarker = L.AwesomeMarkers.icon({
					extraClasses:'ion-location',
					markerColor: 'black'
				});
				var markerExample = L.marker([latitude,longitude], {icon: greenMarker});		
				markerExample.bindPopup("<b>Host :</b>"+argument['host']+"<br>"+"<b>Winning Team :</b>"+argument['winning_team']+"<br>"+"<b>Winning Coach :</b>"+argument['winning_coach']+"<br>"+"<b>Top Scorer :</b>"+argument['top_scorer']+"<br>"+"<b>Most Valuable Player :</b>"+argument['most_valuable_player']);
				mymap.setView([latitude,longitude],3);
				markerExample.addTo(mymap);
			},
			error: function (argument,error_statement) {
				console.log(argument);
				console.log(error_statement);
			}
		});
	});

	// Checking for clicking of 2008
	$('#2008').click(function(){
		edition = 2008;
		$.ajax({
			url: 'php/main_stadium.php',
			dataType: 'json',
			data: ({year:edition}),
			type: 'POST',
			success: function(response) {
				latitude = response['latitude'];
				longitude = response['longitude'];			
			}
		});
		$.ajax({
			url: 'php/tournament_facts.php',
			dataType: 'json',
			data: ({year:edition}),
			type: 'POST',
			success: function(argument) {
				//Placing the marker on the map
				console.log('tournament facts');
				console.log(argument);
				var greenMarker = L.AwesomeMarkers.icon({
					extraClasses:'ion-location',
					markerColor: 'black'
				});
				var markerExample = L.marker([latitude,longitude], {icon: greenMarker});		
				markerExample.bindPopup("<b>Host :</b>"+argument['host']+"<br>"+"<b>Winning Team :</b>"+argument['winning_team']+"<br>"+"<b>Winning Coach :</b>"+argument['winning_coach']+"<br>"+"<b>Top Scorer :</b>"+argument['top_scorer']+"<br>"+"<b>Most Valuable Player :</b>"+argument['most_valuable_player']);
				mymap.setView([latitude,longitude],3);
				markerExample.addTo(mymap);
			},
			error: function (argument,error_statement) {
				console.log(argument);
				console.log(error_statement);
			}
		});
	});

	//Checking for click to the newly added elements to the stadium tab
	$('#selected-stadium').delegate('li','click',function() {
		nameOfStadium = this.innerHTML;
		//Sending asynchronous request to the database 
		$.ajax({
			url: 'php/set_stadium.php',
			dataType: 'json',
			data: ({stadium_name:this.innerHTML}),
			type: 'POST',
			success: function(response) {
				mymap.setView([response['latitude'],response['longitude']],14);
			},
			error: function (argument,error_statement) {
				alert(error_statement)
			}
		});
		//Sending asynchronous request to the database 
		$.ajax({
			url: 'php/stadium_details.php',
			 dataType: 'json',
			data: ({stadium_name:this.innerHTML}),
			type: 'POST',
			success: function(response) {
				cityDescription = response['city_facts'];
				cityName = response['city'];
			},
			error: function (argument,error_statement) {
				//console.log(argument);
				console.log(error_statement);
			}
		});
		//Making city description tab visible
		if(document.getElementById('city-selection').style.visibility == 'hidden') {
			document.getElementById('city-selection').style.visibility = 'visible';
		}
	});

	$('#myModal').on('shown.bs.modal', function (event) {
		//console.log(nameOfStadium);
		switch(nameOfStadium) {
			case 'Accra Sports Stadium':
			document.getElementById('image-heading').style.display = 'block';
			document.getElementById('image-heading').innerHTML = 'Images for Accra Sports Stadium';
			document.getElementById('image1').style.display = 'block';
			document.getElementById('image2').style.display = 'block';
			document.getElementById('image3').style.display = 'block';
			document.getElementById('image4').style.display = 'block';
			document.getElementById('image1').src = '/leaflet/js/stadiums/Accra_Sports_Stadium/image1.jpg';
			document.getElementById('image2').src = '/leaflet/js/stadiums/Accra_Sports_Stadium/image2.jpg';
			document.getElementById('image3').src = '/leaflet/js/stadiums/Accra_Sports_Stadium/image3.jpg';
			document.getElementById('image4').src = '/leaflet/js/stadiums/Accra_Sports_Stadium/image4.jpg';
			break;
			case 'Baba Yara Stadium':
			document.getElementById('image-heading').style.display = 'block';
			document.getElementById('image-heading').innerHTML = 'Images for Baba Yara Stadium';
			document.getElementById('image1').style.display = 'block';
			document.getElementById('image2').style.display = 'block';
			document.getElementById('image3').style.display = 'block';
			document.getElementById('image4').style.display = 'block';
			document.getElementById('image1').src = '/leaflet/js/stadiums/Baba_Yara_Stadium/image1.jpg';
			document.getElementById('image2').src = '/leaflet/js/stadiums/Baba_Yara_Stadium/image2.jpg';
			document.getElementById('image3').src = '/leaflet/js/stadiums/Baba_Yara_Stadium/image3.jpg';
			document.getElementById('image4').src = '/leaflet/js/stadiums/Baba_Yara_Stadium/image4.jpg';
			break;
			case 'Estadio 11 de Novembro':
			document.getElementById('image-heading').style.display = 'block';
			document.getElementById('image-heading').innerHTML = 'Images for Estadio 11 de Novembro';
			document.getElementById('image1').style.display = 'block';
			document.getElementById('image2').style.display = 'block';
			document.getElementById('image3').style.display = 'block';
			document.getElementById('image4').style.display = 'block';
			document.getElementById('image1').src = '/leaflet/js/stadiums/Estadio_11_de_Novembro/image1.jpg';
			document.getElementById('image2').src = '/leaflet/js/stadiums/Estadio_11_de_Novembro/image2.jpg';
			document.getElementById('image3').src = '/leaflet/js/stadiums/Estadio_11_de_Novembro/image3.jpg';
			document.getElementById('image4').src = '/leaflet/js/stadiums/Estadio_11_de_Novembro/image4.jpg';
			break;
			case 'Estadio de Bata':
			document.getElementById('image-heading').style.display = 'block';
			document.getElementById('image-heading').innerHTML = 'Images for Estadio de Bata';
			document.getElementById('image1').style.display = 'block';
			document.getElementById('image2').style.display = 'block';
			document.getElementById('image3').style.display = 'block';
			document.getElementById('image4').style.display = 'block';
			document.getElementById('image1').src = '/leaflet/js/stadiums/Estadio_de_Bata/image1.jpg';
			document.getElementById('image2').src = '/leaflet/js/stadiums/Estadio_de_Bata/image2.jpg';
			document.getElementById('image3').src = '/leaflet/js/stadiums/Estadio_de_Bata/image3.jpg';
			document.getElementById('image4').src = '/leaflet/js/stadiums/Estadio_de_Bata/image4.jpg';
			break;
			case 'Estadio Nacional do Chiazi':
			document.getElementById('image-heading').style.display = 'block';
			document.getElementById('image-heading').innerHTML = 'Images for Estadio Nacional do Chiazi';
			document.getElementById('image1').style.display = 'block';
			document.getElementById('image2').style.display = 'block';
			document.getElementById('image3').style.display = 'block';
			document.getElementById('image4').style.display = 'block';
			document.getElementById('image1').src = '/leaflet/js/stadiums/Estadio_Nacional_do_Chiazi/image1.jpg';
			document.getElementById('image2').src = '/leaflet/js/stadiums/Estadio_Nacional_do_Chiazi/image2.jpg';
			document.getElementById('image3').src = '/leaflet/js/stadiums/Estadio_Nacional_do_Chiazi/image3.jpg';
			document.getElementById('image4').src = '/leaflet/js/stadiums/Estadio_Nacional_do_Chiazi/image4.jpg';
			break;
			case 'FNB Stadium':
			document.getElementById('image-heading').style.display = 'block';
			document.getElementById('image-heading').innerHTML = 'Images for FNB Stadium';
			document.getElementById('image1').style.display = 'block';
			document.getElementById('image2').style.display = 'block';
			document.getElementById('image3').style.display = 'block';
			document.getElementById('image4').style.display = 'block';
			document.getElementById('image1').src = '/leaflet/js/stadiums/FNB_Stadium/image1.jpg';
			document.getElementById('image2').src = '/leaflet/js/stadiums/FNB_Stadium/image2.jpg';
			document.getElementById('image3').src = '/leaflet/js/stadiums/FNB_Stadium/image3.jpg';
			document.getElementById('image4').src = '/leaflet/js/stadiums/FNB_Stadium/image4.jpg';
			break;
			case 'Moses Mabhida Stadium':
			document.getElementById('image-heading').style.display = 'block';
			document.getElementById('image-heading').innerHTML = 'Images for Moses Mabhida Stadium';
			document.getElementById('image1').style.display = 'block';
			document.getElementById('image2').style.display = 'block';
			document.getElementById('image3').style.display = 'block';
			document.getElementById('image4').style.display = 'block';
			document.getElementById('image1').src = '/leaflet/js/stadiums/Moses_Mabhida_Stadium/image1.jpg';
			document.getElementById('image2').src = '/leaflet/js/stadiums/Moses_Mabhida_Stadium/image2.jpg';
			document.getElementById('image3').src = '/leaflet/js/stadiums/Moses_Mabhida_Stadium/image3.jpg';
			document.getElementById('image4').src = '/leaflet/js/stadiums/Moses_Mabhida_Stadium/image4.jpg';
			break;
			case 'Nuevo Estadio de Malabo':
			document.getElementById('image-heading').style.display = 'block';
			document.getElementById('image-heading').innerHTML = 'Images for Nuevo Estadio de Malabo';
			document.getElementById('image1').style.display = 'block';
			document.getElementById('image2').style.display = 'block';
			document.getElementById('image3').style.display = 'block';
			document.getElementById('image4').style.display = 'block';
			document.getElementById('image1').src = '/leaflet/js/stadiums/Nuevo_Estadio_de_Malabo/image1.jpg';
			document.getElementById('image2').src = '/leaflet/js/stadiums/Nuevo_Estadio_de_Malabo/image2.jpg';
			document.getElementById('image3').src = '/leaflet/js/stadiums/Nuevo_Estadio_de_Malabo/image3.jpg';
			document.getElementById('image4').src = '/leaflet/js/stadiums/Nuevo_Estadio_de_Malabo/image4.jpg';
			break;
			case 'Stade de Angondje':
			document.getElementById('image-heading').style.display = 'block';
			document.getElementById('image-heading').innerHTML = 'Images for Stade de Angondje';
			document.getElementById('image1').style.display = 'block';
			document.getElementById('image2').style.display = 'block';
			document.getElementById('image3').style.display = 'block';
			document.getElementById('image4').style.display = 'block';
			document.getElementById('image1').src = '/leaflet/js/stadiums/Stade_de_Angondje/image1.jpg';
			document.getElementById('image2').src = '/leaflet/js/stadiums/Stade_de_Angondje/image2.jpg';
			document.getElementById('image3').src = '/leaflet/js/stadiums/Stade_de_Angondje/image3.jpg';
			document.getElementById('image4').src = '/leaflet/js/stadiums/Stade_de_Angondje/image4.jpg';
			break;
			case 'Stade de Franceville':
			document.getElementById('image-heading').style.display = 'block';
			document.getElementById('image-heading').innerHTML = 'Images for Stade de Franceville';
			document.getElementById('image1').style.display = 'block';
			document.getElementById('image2').style.display = 'block';
			document.getElementById('image3').style.display = 'block';
			document.getElementById('image4').style.display = 'block';
			document.getElementById('image1').src = '/leaflet/js/stadiums/Stade_de_Franceville/image1.jpg';
			document.getElementById('image2').src = '/leaflet/js/stadiums/Stade_de_Franceville/image2.jpg';
			document.getElementById('image3').src = '/leaflet/js/stadiums/Stade_de_Franceville/image3.jpg';
			document.getElementById('image4').src = '/leaflet/js/stadiums/Stade_de_Franceville/image4.jpg';
			break;
			case 'Stade de Oyem':
			document.getElementById('image-heading').style.display = 'block';
			document.getElementById('image-heading').innerHTML = 'Images for Stade de Oyem';
			document.getElementById('image1').style.display = 'block';
			document.getElementById('image2').style.display = 'block';
			document.getElementById('image3').style.display = 'block';
			document.getElementById('image4').style.display = 'block';
			document.getElementById('image1').src = '/leaflet/js/stadiums/Stade_de_Oyem/image1.jpg';
			document.getElementById('image2').src = '/leaflet/js/stadiums/Stade_de_Oyem/image2.jpg';
			document.getElementById('image3').src = '/leaflet/js/stadiums/Stade_de_Oyem/image3.jpg';
			document.getElementById('image4').src = '/leaflet/js/stadiums/Stade_de_Oyem/image4.jpg';
			break;
			case 'Stade de Port-Gentil':
			document.getElementById('image-heading').style.display = 'block';
			document.getElementById('image-heading').innerHTML = 'Images for Stade de Port-Gentil';
			document.getElementById('image1').style.display = 'block';
			document.getElementById('image2').style.display = 'block';
			document.getElementById('image3').style.display = 'block';
			document.getElementById('image4').style.display = 'block';
			document.getElementById('image1').src = '/leaflet/js/stadiums/Stade_de_Port-Gentil/image1.jpg';
			document.getElementById('image2').src = '/leaflet/js/stadiums/Stade_de_Port-Gentil/image2.jpg';
			document.getElementById('image3').src = '/leaflet/js/stadiums/Stade_de_Port-Gentil/image3.jpg';
			document.getElementById('image4').src = '/leaflet/js/stadiums/Stade_de_Port-Gentil/image4.jpg';
			break;
			default:
			document.getElementById('image-heading').style.display = 'none';
			document.getElementById('image1').style.display = 'none';
			document.getElementById('image2').style.display = 'none';
			document.getElementById('image3').style.display = 'none';
			document.getElementById('image4').style.display = 'none';
			break;
		}
	});

	//Checking for click on the city description button
	$('#city-selection').click(function() {
		$('#city-name').text(cityName);
		$('#modal-description').text(cityDescription);
		var queryCity = '';
		//console.log(cityName);
		switch(cityName.toLowerCase()) {
			case 'accra':
			queryCity = 'accra';
			break;
			case 'benguela':
			queryCity = 'benguela';
			break;
			case 'durban':
			queryCity = 'durban';
			break;
			case 'johannesburg':
			queryCity = 'johannesburg';
			break;
			case 'kumasi':
			queryCity = 'kumasi';
			break;
			case 'libreville':
			queryCity = 'libreville';
			break;
			case 'lubango':
			queryCity = 'lubango';
			break;
			case 'mbombela':
			queryCity = 'mbombela';
			break;
			case 'port-elizabeth':
			queryCity = 'port_elizabeth';
			break;
			case 'rustenburg':
			queryCity = 'rustenberg';
			break;
		}
		if(queryCity !='') { 
			if(document.getElementById('location-selection').style.visibility == 'hidden')
				document.getElementById('location-selection').style.visibility = 'visible';
			}
		else {
			if(document.getElementById('location-selection').style.visibility == 'visible')
				document.getElementById('location-selection').style.visibility = 'hidden';
			}
	});

	//Checking for selection of option for adding details to database
	$('#adding-details').click(function() {
		if($('#myDetailForm').is(':visible')) {
			$('#adding-details').data('clicked', true);
			$('#detailclose').data('clicked', false);
			$("#myDetailForm").modal("hide");	
		}
	});

	// Function to check if the close button was clicked or not
	$("#detail-close").click(function() {
		// Setting the close button clicked property as true
    	$('#detail-close').data('clicked', true);
    	// Setting the adding details button property as false
    	$('#adding-details').data('clicked', false);
    	// Hiding the modal
    	$("#myDetailForm").modal("hide");
	});

	// Resetting the form input before loading of the modal
	$('#myDetailForm').on('show.bs.modal', function (event) {
  		document.getElementById("form-details").reset();
	});

	// Preventing refreshing of the page on submission of the form and hiding the modal
	$('#form-details').submit(function(event){
		event.preventDefault();
		$("#myDetailForm").modal("hide");
	});

	// Adding the details to the database before the modal fades away
	$("#myDetailForm").on('hide.bs.modal', function(event) {
		if($('#detail-close').data('clicked') && $('#adding-details').data('clicked') == false) {
			// Setting the clicked property of adding details button to false
			$('#adding-details').data('clicked', false);
			// Setting the clicked property of the close button to false
			$('#detail-close').data('clicked', false);
		}
		else {
			// Selecting all the entries of the form
			stadiumName = document.getElementById('form-details').elements.namedItem('stadium-name').value;
			latitude = document.getElementById('form-details').elements.namedItem('latitude').value;
			longitude = document.getElementById('form-details').elements.namedItem('longitude').value;
			city = document.getElementById('form-details').elements.namedItem('city').value;
			country = document.getElementById('form-details').elements.namedItem('country').value;
			city_Description = document.getElementById('form-details').elements.namedItem('city-description').value;
			if(stadiumName == '' || latitude == '' || longitude == '' || city == '' || country == '') {
				event.preventDefault();
			}
			else { 
				// Sending asynchronous request to the server to add details into the database 
				$.ajax({
					url: 'php/insert.php',
					dataType: 'text',
					data: ({stadium_name:stadiumName, latitude:latitude, longitude:longitude, city:city, country:country, city_description:city_Description}),
					type: 'GET',
					success: function(response) {
						$('#result-message').text(response);
						$("#insertSuccess").modal("show");
					},
					error: function (argument,error_statement) {
						$('#result-message').text(argument);
					}
				});
			}
		}
	});

	$('#location-selection').click(function(){
		var queryCity = '';
		switch(cityName.toLowerCase()) {
			case 'accra':
			queryCity = 'accra';
			break;
			case 'benguela':
			queryCity = 'benguela';
			break;
			case 'durban':
			queryCity = 'durban';
			break;
			case 'johannesburg':
			queryCity = 'johannesburg';
			break;
			case 'kumasi':
			queryCity = 'kumasi';
			break;
			case 'libreville':
			queryCity = 'libreville';
			break;
			case 'lubango':
			queryCity = 'lubango';
			break;
			case 'mbombela':
			queryCity = 'mbombela';
			break;
			case 'port-elizabeth':
			queryCity = 'port_elizabeth';
			break;
			case 'rustenburg':
			queryCity = 'rustenberg';
			break;
		}
		if(queryCity !='') { 
		//Sending asynchronous request to the database 
			$.ajax({
				url: 'php/location_details.php',
				 dataType: 'json',
				data: ({table:queryCity}),
				type: 'POST',
				success: function(response) {
					//console.log(response);
					locationMarkers(response);
				},
				error: function (argument,error_statement) {
					console.log(argument);
					console.log(error_statement);
				}
			});
		}
		else {
			if(document.getElementById('location-selection').style.visibility == 'visible') 
				document.getElementById('location-selection').style.visibility = 'hidden';
		}
	});

	function locationMarkers(response) {
		var blueMarker = L.AwesomeMarkers.icon({
			extraClasses:'ion-ios7-person',
			iconColor: 'black',
			markerColor: 'orange'
		});
		for (var i = 0; i < response.length; i++) {
			var markerExample = L.marker([response[i]['latitude'],response[i]['longitude']], {icon: blueMarker});
			markerExample.bindPopup("<b>"+response[i]['location_name']+"</b>"+"<br>"+response[i]['description']);
			markerExample.addTo(mymap);
		}
	}

	function removeAppliedLayers() {
		//Removing all the pre applied layers to the map
		mymap.eachLayer(function(layer) {
			if(layer['_url'] == undefined) {
				//console.log(layer);
				layer.remove();
			}
		});
	}

	//Function to add markers to the map
	function markerplacement(response) {
		removeAppliedLayers();
		//Defining the markers to be placed
		var redMarker = L.AwesomeMarkers.icon({
			extraClasses:'ion-ios7-football-outline',
			markerColor:  'red'
		});
		//Creating the layer group and adding the markers to the map
		var stadiumGroup = L.layerGroup();
		for (var i = 0; i < response.length; i++) {
			var markerExample = L.marker([response[i]['latitude'],response[i]['longitude']], {icon: redMarker});
			markerExample.bindPopup("<b>Stadium Name: </b>"+response[i]['stadium_name']+"<br>"+"<b>City: </b>"+response[i]['city']+"<br>"+"<b>Country: </b>"+response[i]['country']);
			stadiumGroup.addLayer(markerExample);
		}
		//Setting the view to the corresponding marker
		mymap.setView([response[response.length-1]['latitude'],response[response.length-1]['longitude']],5);
		stadiumGroup.addTo(mymap);
	}
});