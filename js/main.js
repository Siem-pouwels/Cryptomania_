function getAllCoins() {
	$.ajax({ 
		type: "GET",
		dataType: "json",
		url: "https://api.coincap.io/v2/assets",
 
		success: function(data){
			// console.log(figure.parseInt(data.data[0].priceUsd));
			for (let i = 0; i < data.data.length; i++) {
				data.data[i] = data.data[i]
			  }

			$.each(data.data, function(index, value){
				value.priceUsd = roundFigures(parseFloat(value.priceUsd))
				value.marketCapUsd = roundFigures(parseFloat(value.marketCapUsd))
				value.volumeUsd24Hr = roundFigures(parseFloat(value.volumeUsd24Hr))
				value.symbolLowerCase = value.symbol.toLowerCase();
				// if(value.volumeUsd24Hr > 0)
				// {
				// 	document.getElementById("text").innerHTML = event.data;
        		// 	document.getElementById("text").style.color = color;
				// }
				console.log(value);
			})

			var template = $("#all-coins-template").html();
			var renderTemplate = Mustache.render(template, data);
			$("#coins-table tbody").append(renderTemplate);
		}
	 });
}

function getCoinInfo(selectedButton) {
	var cryptoId = $(selectedButton).closest("tr").find(".crypto-id").text();
	var cryptoPrice = $(selectedButton).closest("tr").find(".crypto-price").text();
	//console.log(cryptoId);

	$.ajax({
		type: "GET",
		dataType: "json",
		url: "https://api.coincap.io/v2/assets/"+cryptoId+"/history?interval=d1",
 
		success: function(historicalData){
			var dateArray = [];
			var priceArray = [];

			$.each(historicalData.data, function(index, value){
				dateArray.push(value.date);
				priceArray.push(value.priceUsd);
			})
			generateChart(dateArray, priceArray)
			$('#more-info-modal').modal('show');
		}
	 });
}

function addCoinInfo() 
{
	var cryptoId = $(selectedButton).closest("tr").find(".crypto-id").text();
	var cryptoPrice = $(selectedButton).closest("tr").find(".crypto-price").text();
	//console.log(cryptoId);
}

function roundFigures(figure){
	nr = Math.round((figure + Number.EPSILON) * 100) / 100;
	//console.log(nr)
	return nr;
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

function addCrypto() {
	var form = $("form #add-crypto-form")
	//console.log(form)
}

function generateChart(chartDate, chartPrice) {
	if (chart) {
		chart.destroy()
	}
	//console.log('dsafdsafadsafdsfdsafdsaafdsfdsfdssfda')
	var ctx = document.getElementById('coin-history-chart').getContext('2d');
	
	
	//console.log(ctx)
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
	$(".loading-container").fadeOut("slow");
	if ($(document).data('#more-info-modal') == undefined) {
		if (typeof chart == undefined) {
			console.log("this");
			chart.destroy()
		}
	}
	
	// getPortfolio();
	getAllCoins();

	$(document).on('click','.coins-info-btn',function() {
		getCoinInfo(this);
	});

	$(document).on('click','.coins-add-btn',function() {
		addCoinInfo(this);
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