$(document).ready(function(){
	cityDescription = '';
	cityName = '';
	var mymap = L.map('map',{zoomControl: false});
	mymap.setView([20, 20],2);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 20,
    minZoom: 2,
  	maxBoundsViscosity: 1,
    id: 'mapbox.dark',
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
			}
			if(stadiumSelection.style.visibility != 'hidden')
				stadiumSelection.style.visibility = 'hidden';
		}
		// Changing the visibility of the year selection button in the next two if statements
		if(event.target.getZoom() < 5) {
			if(document.getElementById('city-selection').style.visibility == 'visible') {
				document.getElementById('city-selection').style.visibility = 'hidden';
			}
			if(yearSelection.style.visibility != 'hidden')
				yearSelection.style.visibility = 'hidden';
		}
		if(event.target.getZoom() >= 5) {
			if(yearSelection.style.visibility == 'hidden')
				yearSelection.style.visibility = 'visible';
		}
	});

	// Checking for clicking of 2017
	$('#2017').click(function(){
		//Sending asynchronous request to the database 
		$.ajax({
			url: 'php/stadium.php',
			dataType: 'json',
			data: ({year:'2017'}),
			type: 'POST',
			success: function(response) {
				//console.log('function processed successfully');
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
	});

	// Checking for clicking of 2015
	$('#2015').click(function(){
		//Sending asynchronous request to the database 
		$.ajax({
			url: 'php/stadium.php',
			dataType: 'json',
			data: ({year:'2015'}),
			type: 'POST',
			success: function(response) {
				var list = document.getElementById('selected-stadium');
				var liList = document.querySelectorAll("#selected-stadium li");
				if(liList.length > 0) {
					$('#selected-stadium li').remove();
				}
				//Creating li elements and adding them to stadium list
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
	});

	// Checking for clicking of 2013
	$('#2013').click(function(){
		//Sending asynchronous request to the database 
		$.ajax({
			url: 'php/stadium.php',
			dataType: 'json',
			data: ({year:'2013'}),
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
	});

	// Checking for clicking of 2012
	$('#2012').click(function(){
		//Sending asynchronous request to the database 
			$.ajax({
			url: 'php/stadium.php',
			dataType: 'json',
			data: ({year:'2012'}),
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
	});

	// Checking for clicking of 2010
	$('#2010').click(function(){
		//Sending asynchronous request to the database 
		$.ajax({
			url: 'php/stadium.php',
			dataType: 'json',
			data: ({year:'2010'}),
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
	});

	// Checking for clicking of 2008
	$('#2008').click(function(){
		//Sending asynchronous request to the database 
		$.ajax({
			url: 'php/stadium.php',
			dataType: 'json',
			data: ({year:'2008'}),
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
	});

	//Function to add markers to the map
	function markerplacement(response) {
		//Removing all the pre applied layers to the map
		mymap.eachLayer(function(layer) {
			if(layer['_url'] == undefined)
				layer.remove();
		});
		//Defining the markers to be placed
		var redMarker = L.AwesomeMarkers.icon({
			icon: 'star',
			markerColor: 'red'
		});
		//Creating the layer group and adding the markers to the map
		var stadiumGroup = L.layerGroup();
		for (var i = 0; i < response.length; i++) {
			var markerExample = L.marker([response[i]['latitude'],response[i]['longitude']], {icon: redMarker});
			markerExample.bindPopup("<b>Stadium Name: </b>"+response[i]['stadium_name']+"<br>"+"<b>City: </b>"+response[i]['city']);
			stadiumGroup.addLayer(markerExample);
		}
		//Setting the view to the corresponding marker
		mymap.setView([response[response.length-1]['latitude'],response[response.length-1]['longitude']],5);
		stadiumGroup.addTo(mymap);
	}

	//Checking for click to the newly added elements to the stadium tab
	$('#selected-stadium').delegate('li','click',function() {
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
		//Making city description tab visible
		if(document.getElementById('city-selection').style.visibility == 'hidden')
			document.getElementById('city-selection').style.visibility = 'visible';
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
				console.log(argument);
				console.log(error_statement);
			}
		});
	});

	//Checking for click on the city description button
	$('#city-selection').click(function() {
		$('#city-name').text(cityName);
		$('#modal-description').text(cityDescription);
	});

	//Checking for selection of option for adding details to database
	$('#adding-details').click(function() {
		if($('#myModal').is(':visible')) {
			$('#adding-details').data('clicked', true);
			$('.close').data('clicked', false);
			$("#myDetailForm").modal("hide");	
		}
	});

	// Function to check if the close button was clicked or not
	$(".close").click(function() {
		// Setting the close button clicked property as true
    	$('.close').data('clicked', true);
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
		if($('.close').data('clicked') && $('#adding-details').data('clicked') == false) {
			// Setting the clicked property of adding details button to false
			$('#adding-details').data('clicked', false);
			// Setting the clicked property of the close button to false
			$('.close').data('clicked', false);
		}
		else {
			// Selecting all the entrie of the form
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
						$("#insertSuccess").modal("show");
					},
					error: function (argument,error_statement) {
						console.log(argument);
						console.log(error_statement);
					}
				});
			}
		}
	});
});