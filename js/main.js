var deleteChart;
var priceUsd;
function getAllCoins() {
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "https://api.coincap.io/v2/assets",

		success: function (data) {
			console.log(data);
			for (let i = 0; i < data.data.length; i++) {
				data.data[i] = data.data[i]
			}

			$.each(data.data, function (index, value) {
				value.priceUsd = roundFigures(parseFloat(value.priceUsd))
				value.marketCapUsd = roundFigures(parseFloat(value.marketCapUsd))
				value.volumeUsd24Hr = roundFigures(parseFloat(value.volumeUsd24Hr))
				value.symbolLowerCase = value.symbol.toLowerCase();
				if (value.volumeUsd24Hr <= 0) value.colorVolume = "red";
				if (value.volumeUsd24Hr >= 0) value.colorVolume = "green";
			})
			console.log(data);
			var template = $("#all-coins-template").html();
			var renderTemplate = Mustache.render(template, data);
			console.log(renderTemplate)
			$("#coins-table tbody").append(renderTemplate);
		}
	});
}

// function openAddCrypto(this) {

// }

function authCheck() {
	var cookieObject = getCookieObject();
	if (cookieObject === 'unauth') {
		$('#logout-btn').remove()
	} else {
		$('#login-btn').remove()
	}
}

function getCookieObject() {
	console.log(document.cookie)
	var cookieObject = JSON.parse(document.cookie);
	console.log(cookieObject);
	if (cookieObject === undefined || cookieObject === null) {
		return 'unauth';
	}
	return cookieObject;
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
	} else {
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

function succesPopup(message, timeout) {
	if (timeout == undefined) {
		timeout = 2.5
	}
	var a_message = "";
	a_message += "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
	a_message += "<strong>Succes!</strong> " + message;
	a_message += "</div>";
	$('body').prepend(a_message)

	if (timeout != 0) {
		setTimeout(function () {
			$('.alert').alert('close')
		}, timeout * 1000);
	}
}

function errorPopup(message, timeout) {
	if (timeout == undefined) {
		timeout = 2.5
	}
	var a_message = "";
	a_message += "<div class='alert alert-danger alert-dismissible fade show' role='alert'>";
	a_message += "<strong>Error!</strong> " + message;
	a_message += "</div>";
	$('body').prepend(a_message)

	if (timeout != 0) {
		setTimeout(function () {
			$('.alert').alert('close')
			console.log('close')
		}, timeout * 1000);
	}
}

function addCoinInfo(selectedButton) {
	var cryptoId = $(selectedButton).closest("tr").find(".crypto-id").text();
	console.log(cryptoId);
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "https://api.coincap.io/v2/assets/" + cryptoId,

		success: function (data) {
			console.log(data)
			var template = $("#add-coin-modal").html();
			var renderTemplate = Mustache.render(template, data);
			// console.log(renderTemplate)
			// $("#coins-table tbody").append(renderTemplate);
		}
	});
}

function addCrypto() {
	console.log('sdafsdakufsakdlf')
	$.ajax({
		type: "POST",
		dataType: "json",
		headers: [
			'Access-Control-Allow-Origin',
		],
		url: "http://127.0.0.1:8000/api/portfolio",
		data: {},
		cache: false,
		success: function (data) {
			console.log(data)
		},
		error: function (xhr) {
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
			var userCookie = "";
			userCookie = JSON.stringify(data.user);
			console.log(JSON.stringify(userCookie))
			// document.cookie = JSON.stringify(data.user);
		},
		error: function (xhr, status, error) {
			console.error(xhr);
		}
	});
}

function createUser() {
	var email = document.getElementById("email-create").value;
	var password = document.getElementById("password-create").value;
	authCheck();
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

$(document).ready(function () {
	// addCrypto();
	// authCheck();
	$(".loading-container").fadeOut("slow");
	getAllCoins();

	// $(document).on('click', '.coins-info-btn', function () {
	// 	getCoinInfo(this);
	// });

	// $(document).on('click', '.coins-add-btn', function () {
	// 	addCrypto(this);
	// });

	// $(document).on('click', '#coins-add-btn', function () {
	// 	addCrypto(this);
	// });

	// $(document).on('click', '#login-account', function (event) {
	// 	event.preventDefault();
	// 	loginUser();
	// });

	$(document).on('click', '#create-account', function (event) {
		event.preventDefault();
		createUser();
	});

	$(document).on('click', '.open-add-coin-button', function () {
		addCrypto();
		// addCoinInfo(this);
	});


});