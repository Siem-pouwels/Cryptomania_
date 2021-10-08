function getAllCoins() {
	$.ajax({ 
		type: "GET",
		dataType: "json",
		url: "https://api.coincap.io/v2/assets",
 
		success: function(data){
			console.log(data.data[0].id);
			for (let i = 0; i < data.data.length; i++) {
				data.data[i] = data.data[i]
			  }
			var template = $("#all-coins-template").html();
			var renderTemplate = Mustache.render(template, data);
			$("#coins-table tbody").append(renderTemplate);
		}
	 });
}

function getCoinInfo(selectedButton) {

	//get the value from the table
	var cryptoId = $(selectedButton).closest("tr").find(".crypto-id").text();
	var cryptoPrice = $(selectedButton).closest("tr").find(".crypto-price").text();
	console.log(cryptoId);
	
	$('#myModal').modal('show');
	//step 1 get the template
	var template = $("#more-info").html();
	var renderTemplate = Mustache.render(template, data);
	$("#coins-table tbody").append(renderTemplate);

	var dateArray = [];
	var priceArray = [];

	$.each(historicalData.data, function(index, value){
		dateArray.push(value.date);
		priceArray.push(value.priceUsd);
	})

	//Generate the chart with the generated data
	generateChart(dateArray, priceArray)

	//step 2 Render output with Mustache.js


	//step 3 append the data to the body


	// $.ajax({ 
	// 	type: "GET",
	// 	dataType: "json",
	// 	url: "https://api.coincap.io/v2/assets/"+cryptoId+"/history",
 
	// 	success: function(data){
	// 		console.log(data.data[0].id);
	// 		for (let i = 0; i < data.data.length; i++) {
	// 			data.data[i] = data.data[i]
	// 		  }
	// 		var template = $("#all-coins-template").html();
	// 		var renderTemplate = Mustache.render(template, data);
	// 		$("#coins-table tbody").append(renderTemplate);
	// 	}
	//  });
	
	
}


function roundFigures(figure){
	
}

function getPortfolio() {

	$.ajax({ 
	   type: "GET",
	   dataType: "json",
	//    headers: [
	// 	'Access-Control-Allow-Origin',
	//    ],
	   url: "http://127.0.0.1:8000/api/portfolio",
	   success: function(data){   
			// coins = data;
			console.log(data)
			// var template = $("#all-coins").html();
			// var renderTemplate = Mustache.render(template, coins);
			// $("#coins-table tbody").append(renderTemplate);
	   }
	});
}


//function to get a single character
function getCharacter(selectedButton) {
	characterId = $(selectedButton).closest("tr").find(".character-id").text();
}

function generateChart(chartDate, chartPrice) {

	var ctx = document.getElementById('coin-history-chart').getContext('2d');

	var chart = new Chart(ctx, {
			// The type of chart we want to create
			type: 'line',

			// The data for our dataset
			data: {
				labels: chartDate,
					datasets: [{
						type: "line",
							label: "Price",
							borderColor: '#3e95cd',
							data: chartPrice,
					}]
			},

			// Configuration options go here
			options: {
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Date'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Price'
						}
					}]
				},
				elements: { point: { radius: 0 } }
			}
	});
}


$(document).ready(function(){
	// getPortfolio();
	getAllCoins();

	$(document).on('click','.coins-info-btn',function() {
		getCoinInfo(this);
	});
	
	// $('.coins-info-btn').click(function () {
	// 	// id = $(this).attr('id');
	// 	console.log(this)
	// 	alert("hi");
	// 	//  $.ajax({
	// 	//  type: "POST",
	// 	//  url: "inc/functions.php",
	// 	//  data: {requestType : "deleteProject", projectId: projectId
	// 	//  },
	// 	//  success: function(data) {
	// 	// 	 console.log(data);
	// 	//  },
	// 	//  error: function(xhr, status, error) {
	// 	//  console.error(xhr);
	// 	//  }
	// 	//  });
	// });




});






// $('#myModal').modal('toggle');
// $('#myModal').modal('show');
// $('#myModal').modal('hide');