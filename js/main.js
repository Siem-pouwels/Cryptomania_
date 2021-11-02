function getAllCoins() {
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "https://api.coincap.io/v2/assets",

		success: function (data) {
			// console.log(figure.parseInt(data.data[0].priceUsd));
			for (let i = 0; i < data.data.length; i++) {
				data.data[i] = data.data[i]
			}

			$.each(data.data, function (index, value) {
				value.priceUsd = roundFigures(parseFloat(value.priceUsd))
				value.marketCapUsd = roundFigures(parseFloat(value.marketCapUsd))
				value.volumeUsd24Hr = roundFigures(parseFloat(value.volumeUsd24Hr))
				value.symbolLowerCase = value.symbol.toLowerCase();
			})

			var template = $("#all-coins-template").html();
			var renderTemplate = Mustache.render(template, data);
			$("#coins-table tbody").append(renderTemplate);
		}
	});
}



function roundFigures(figure) {
	nr = Math.round((figure + Number.EPSILON) * 100) / 100;
	//console.log(nr)
	return nr;
}

function generateChart(chartDate, chartPrice) {
	// if (chart) {
	// 	chart.destroy()
	// }
	console.log('dsafdsafadsafdsfdsafdsaafdsfdsfdssfda')
	var ctx = document.getElementById('coin-history-chart').getContext('2d');
	
	
	// console.log(ctx)
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

	getAllCoins();

});