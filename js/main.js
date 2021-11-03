var deleteChart;

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
	var ctx = document.getElementById('coin-history-chart').getContext('2d');
	if (!deleteChart) {
		console.log('test');
	}else{
		deleteChart.destroy();
	}
	var chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: chartDate,
			datasets: [{
				type: "line",
				label: "Price",
				borderColor: '#3e95cd',
				data: chartPrice,
			}]
		},
		options: {
			scales: {
				xAxes: [{
					type: 'linear',
					position: 'bottom'
				}]
			}
		}
	});
	deleteChart = chart;
}

function getCoinInfo(selectedButton) {
	var cryptoId = $(selectedButton).closest("tr").find(".crypto-id").text();

	$.ajax({
		type: "GET",
		dataType: "json",
		url: "https://api.coincap.io/v2/assets/" + cryptoId + "/history?interval=d1",

		success: function (historicalData) {
			var dateArray = [];
			var priceArray = [];

			$.each(historicalData.data, function (index, value) {
				dateArray.push(value.date);
				priceArray.push(value.priceUsd);
			})
			generateChart(dateArray, priceArray)
		}
	});
}



$(document).ready(function () {
	$(".loading-container").fadeOut("slow");
	getAllCoins();

	// $(document).on('click', '.coins-info-btn', function () {
	// 	getCoinInfo(this);
	// });

	$(document).on('click', '.coins-info-btn', function () {
		getCoinInfo(this);
	});

});