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
			})
			// console.log(data.data[0].priceUsd)
			// let figure = data.data[0].priceUsd;
			// roundFigures(parseFloat(figure));
			var template = $("#all-coins-template").html();
			console.log(template)
			var renderTemplate = Mustache.render(template, data);
			$("#coins-table tbody").append(renderTemplate);
		}
	});
}

function getCoinInfo(selectedButton) {
	var cryptoId = $(selectedButton).closest("tr").find(".crypto-id").text();
	console.log(cryptoId);

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
			$('#more-info-modal').modal('show');
		}
	});
}


function roundFigures(figure) {
	nr = Math.round((figure + Number.EPSILON) * 100) / 100;
	console.log(nr)
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
		success: function (data) {
			// coins = data;
			console.log(data)
			// var template = $("#all-coins").html();
			// var renderTemplate = Mustache.render(template, coins);
			// $("#coins-table tbody").append(renderTemplate);
		}
	});
}

function addCryptoModalShow(selectedButton) {
	var cryptoId = $(selectedButton).attr('id');

	$.ajax({
		type: "GET",
		dataType: "json",
		url: "https://api.coincap.io/v2/assets/" + cryptoId,

		success: function (data) {
			// var template = $("#add-coin-template").html();
			// var renderTemplate = Mustache.render(template, data);
			// $(".coins-table tbody").append(renderTemplate);
			// $('#add-coin-modal').modal('show');
			// var template = $("#all-coins-template").html();
			var template = $("#add-coins-template").html();
			console.log(template)
			var renderTemplate = Mustache.render(template, data);
			$("#add-coin-modal .modal-dialog").append(renderTemplate);
			$('#add-coin-modal').modal('show');
		}
	});
}

function addCrypto(selectedButton) {
	var form = $("form #add-crypto-form")
	console.log(form)
	// var cryptoId = $(selectedButton).attr('id');
	// $.ajax({
	// 	type: "GET",
	// 	dataType: "json",
	// 	url: "https://api.coincap.io/v2/assets/"+cryptoId,

	// 	success: function(data){
	// 		console.log(data.data)
	// 		var priceUsd = data.data.priceUsd;
	// 	}
	//  });

	//  $.ajax({
	// 	type: "POST",
	// 	url: "localhost:8000/api/crypto",
	// 	data: {
	// 	   id: cryptoId,
	// 	   amount: amount,
	// 	   priceUsd : priceUsd
	// 	},
	// 	cache: false,
	// 	success: function(data) {
	// 	   getTableData();
	// 	},
	// 	error: function(xhr, status, error) {
	// 	console.error(xhr);
	// 	}
	// 	});
}

function generateChart(chartDate, chartPrice) {
	if (chart) {
		chart.destroy()
	}

	var ctx = document.getElementById('coin-history-chart').getContext('2d');


	console.log(ctx)
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


$(document).ready(function () {
	getAllCoins();
	if ($(document).data('#more-info-modal') == undefined) {
		if (typeof chart == undefined) {
			console.log("this");
			chart.destroy()
		}
	}


	$(document).on('click', '.coins-info-btn', function () {
		getCoinInfo(this);
	});

	$(document).on('click', '.show-crypto-modal', function () {
		addCryptoModalShow(this);
	});

	$(document).on('click', '#coins-add-btn', function () {
		addCrypto(this);
	});

	$(document).on('click', '#more-info-modal', function () {
		console.log("safdsfdafdsafdsafdsasfdafdsafdsafdsfdsafdsafdasfdsadfsafdsafdsaaaaaaa")
		// var chart = document.getElementById('coin-history-chart').getContext('2d');
		ctx.destroy();
		$('#more-info-modal').modal('hide');
	});

	$(".add-crypto").on("click", function () {
		addCrypto(this);
	});
});
// $('#myModal').modal('toggle');
// $('#myModal').modal('show');
// $('#myModal').modal('hide');