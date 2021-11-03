var deleteChart;
var colorRedId = [];
var colorGreenId = [];
var renderTmp;

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
			changeColorState(data);

			$.each(data.data, function (index, value) {
				value.priceUsd = roundFigures(parseFloat(value.priceUsd))
				value.marketCapUsd = roundFigures(parseFloat(value.marketCapUsd))
				value.volumeUsd24Hr = roundFigures(parseFloat(value.volumeUsd24Hr))
				value.symbolLowerCase = value.symbol.toLowerCase();
				if(value.volumeUsd24Hr <= 0){
					value.colorVolume = "red";
				}
				if(value.volumeUsd24Hr >= 0){
					value.colorVolume = "green";
				}
			})

			var template = $("#all-coins-template").html();
			var renderTemplate = Mustache.render(template, data);
			renderTmp = renderTemplate;
			$("#coins-table tbody").append(renderTemplate);
		}
	});
}

function changeColorState(data){
	for (let i = 0; i < data.data.length; i++) {
		if(data.data[i].volumeUsd24Hr >= 0){
			colorGreenId.push(data.data[i].volumeUsd24Hr);
			
		}
		if(data.data[i].volumeUsd24Hr <= 0){
			colorRedId.push(data.data[i].volumeUsd24Hr);
		}
	}
}

function roundFigures(figure) {
	nr = Math.round((figure + Number.EPSILON) * 100) / 100;
	//console.log(nr)
	return nr;
	
}

function generateChart(chartDate, chartPrice) {
	var ctx = document.getElementById('coin-history-chart').getContext('2d');
	if (!deleteChart) {
		//console.log('test');
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

function succesPopup(message,timeout){
	if(timeout == undefined){
	  timeout = 2.5
	}
	var a_message = "";
	a_message += "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
	a_message +=  "<strong>Succes!</strong> "+message;
	a_message += "</div>";
	$('body').prepend(a_message)
  
	if(timeout != 0){
	  setTimeout(function () {
		$('.alert').alert('close')
	  }, timeout*1000);
	}
  }

function errorPopup(message,timeout){
	if(timeout == undefined){
	  timeout = 2.5
	}
	var a_message = "";
	a_message += "<div class='alert alert-danger alert-dismissible fade show' role='alert'>";
	a_message +=  "<strong>Error!</strong> "+message;
	a_message += "</div>";
	$('body').prepend(a_message)
  
	if(timeout != 0){
	  setTimeout(function () {
		$('.alert').alert('close')
		//console.log('close')
	  }, timeout*1000);
	}
  }

function getNews(){
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "https://newsapi.org/v2/everything?q=bitcoin&apiKey=85c8b39f552e4759bb301d88aaef51fb",
		success: function (response,status) {
			//console.log(response);
			var articles = response.articles
			//console.log(articles)

			var template = $("#all-characters-template").html();
			var renderTemplate = Mustache.render(template, articles);

			$("body").append(renderTemplate);
		}
	});
}


$(document).ready(function () {
	$(".loading-container").fadeOut("slow");
	getAllCoins();
	getNews();

	// $(document).on('click', '.coins-info-btn', function () {
	// 	getCoinInfo(this);
	// });

	$(document).on('click', '.coins-info-btn', function () {
		getCoinInfo(this);
	});

});