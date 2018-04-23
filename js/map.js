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

	// Changing the dashboard on changing the zoom level of the ap
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
				document.getElementById('para').innerHTML = '';
			}
			if(stadiumSelection.style.visibility != 'hidden')
				stadiumSelection.style.visibility = 'hidden';
		}
		// Changing the visibility of the year selection button in the next two if statements
		if(event.target.getZoom() < 5) {
			if(document.getElementById('city-selection').style.visibility == 'visible') {
				document.getElementById('city-selection').style.visibility = 'hidden';
				document.getElementById('para').innerHTML = '';
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
		document.getElementById('para').innerHTML = "";
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
				markerplacement(response);
			}
		});	
	});

	// Checking for clicking of 2015
	$('#2015').click(function(){
		document.getElementById('para').innerHTML = "";
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
				//Creating li elements and adding to stadium list
				for (var i = 0; i < response.length; i++) {
					var li = document.createElement("li");
					var text = document.createTextNode(response[i]['stadium_name']);
					li.appendChild(text);
					li.className = 'list-years list-years:hover';
					list.appendChild(li);	
				}
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
				markerplacement(response);
			}
		});
	});

	// Checking for clicking of 2012
	$('#2012').click(function(){
		document.getElementById('para').innerHTML = "";
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
				markerplacement(response);
			}
		});
	});

	// Checking for clicking of 2010
	$('#2010').click(function(){
		document.getElementById('para').innerHTML = "";
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
				markerplacement(response);
			}
		});
	});

	// Checking for clicking of 2008
	$('#2008').click(function(){
		document.getElementById('para').innerHTML = "";
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
		$('.modal-title').text(cityName);
		$('#modal-description').text(cityDescription);
	});
});