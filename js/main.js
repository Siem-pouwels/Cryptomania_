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
				// if(value.volumeUsd24Hr > 0)
				// {
				// 	document.getElementById("text").innerHTML = event.data;
        		// 	document.getElementById("text").style.color = color;
				// }
				// console.log(value);
			})

			var template = $("#all-coins-template").html();
			// console.log(template)
			var renderTemplate = Mustache.render(template, data);
			$("#coins-table tbody").append(renderTemplate);
		}
	});
}

function getCoinInfo(selectedButton) {
	var cryptoId = $(selectedButton).closest("tr").find(".crypto-id").text();
	var cryptoPrice = $(selectedButton).closest("tr").find(".crypto-price").text();
	// console.log(cryptoId);

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
			//$("#more-info-modal").append(generateChart(dateArray, priceArray));
		}
	});
}

function addCoinInfo() 
{
	var cryptoId = $(selectedButton).closest("tr").find(".crypto-id").text();
	var cryptoPrice = $(selectedButton).closest("tr").find(".crypto-price").text();
	// console.log(cryptoId);
}

function roundFigures(figure) {
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
		success: function (data) {
			// coins = data;
			// console.log(data)
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
			var template = $("#add-coin-modal-content").html();
			// console.log(template)
			var renderTemplate = Mustache.render(template, data);
			$("#add-coin-modal").append(renderTemplate);
			
		}
	});
}

function addCrypto() {
	var amount = document.getElementById("add-amount").value;
	// console.log(input);

	$.ajax({
		type: "POST",
		url: "http://127.0.0.1:8000/api/portfolio",
		data: {
			amount: amount
		},
		cache: false,
		success: function (data) {
			console.log(data)
		},
		error: function (xhr, status, error) {
			console.error(xhr);
		}
	});
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

function createUser() {
	var email = document.getElementById("email-create").value;
	var password = document.getElementById("password-create").value;
	// console.log(input);

	$.ajax({
		type: "POST",
		dataType: "json",
		headers: [
		'Access-Control-Allow-Origin',
		],
		url: "http://127.0.0.1:8000/api/user/create",
		data: {
			email: email,
			password: password,
		},
		cache: false,
		success: function (data) {
			console.log('Created user succesful')
		},
		error: function (xhr, status, error) {
			console.error(xhr);
		}
	});
}

function loginUser() {
	var email = document.getElementById("email-login").value;
	var password = document.getElementById("password-login").value;
	// console.log(input);

	$.ajax({
		type: "POST",
		dataType: "json",
		headers: [
		'Access-Control-Allow-Origin',
		],
		url: "http://127.0.0.1:8000/api/user/login",
		data: {
			email: email,
			password: password,
		},
		cache: false,
		success: function (data) {
			console.log("coookieeees")
			console.log(document.cookie)
		},
		error: function (xhr, status, error) {
			console.error(xhr);
		}
	});
}

function succesPopup(message,timeout){
	if(timeout == undefined){
	  timeout = 2.5
	}
	var a_message = "";
	a_message += "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
	a_message +=  "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
	a_message +=  "<strong>Succes!</strong> "+message;
	a_message += "</div>";
	$('body').prepend(a_message)
  
	if(timeout != 0){
	  setTimeout(function () {
		$('.alert').alert('close')
	  }, timeout*1000);
	}
  }


$(document).ready(function(){
	document.cookie = "username=John Doe";
	console.log(document.cookie)
	$(".loading-container").fadeOut("slow");
	// if ($(document).data('#more-info-modal') == undefined) {
	// 	if (typeof chart == undefined) {
	// 		console.log("this");
	// 		chart.destroy()
	// 	}
	// }
	getAllCoins();

	// $(document).on('click', '.coins-info-btn', function () {
	// 	getCoinInfo(this);
	// });

	// $(document).on('click', '.show-crypto-modal', function () {
	// 	addCryptoModalShow(this);
	// });

	$(document).on('click', '#submit-crypto', function (event) {
		event.preventDefault();
		addCrypto();
		$('#add-coin-modal').modal('hide')
		succesPopup("succesfully added coins to wallet")
	});

	$(document).on('click', '#show-create-account', function () {
		console.log('test')
		$('#create-account-modal').modal('show');
	});

	$(document).on('click', '#create-account', function (event) {
		event.preventDefault();
		createUser();
	});
	
	$(document).on('click', '#show-login-account', function () {
		console.log('test')
		$('#login-account-modal').modal('show');
	});

	$(document).on('click', '#login-account', function (event) {
		event.preventDefault();
		loginUser();
	});

	// $(document).on('click', '#more-info-modal.modal.fade.show', function (event) {
	// 	// console.log('test')
	// });

	// $(document).on('click', '#more-info-modal', function () {
	// 	console.log("safdsfdafdsafdsafdsasfdafdsafdsafdsfdsafdsafdasfdsadfsafdsafdsaaaaaaa")
	// 	// var chart = document.getElementById('coin-history-chart').getContext('2d');
	// 	ctx.destroy();
	// 	$('#more-info-modal').modal('hide');
	// });
});
// $('#myModal').modal('toggle');
// $('#myModal').modal('show');
// $('#myModal').modal('hide');