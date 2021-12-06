var deleteChart;
function getAllCoins() {
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "https://api.coincap.io/v2/assets",

		success: function (data) {
			for (let i = 0; i < data.data.length; i++) {
				data.data[i] = data.data[i]
			}

			$.each(data.data, function (index, value) {
				value.priceUsd = roundFigures(parseFloat(value.priceUsd))
				value.marketCapUsd = roundFigures(parseFloat(value.marketCapUsd))
				value.changePercent24Hr = value.changePercent24Hr
				value.symbolLowerCase = value.symbol.toLowerCase();
				if (value.changePercent24Hr >= 0) value.color = "green";
				if (value.changePercent24Hr <= 0) value.color = "red";
			})
			var template = $("#all-coins-template").html();
			var renderTemplate = Mustache.render(template, data);
			$("#coins-table tbody").append(renderTemplate);
		}
	});
}

function setCookie(cname, cvalue, exdays) {
	const date = new Date();
	date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
	let expires = "expires=" + date.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	let name = cname + "=";
	let ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}


function roundFigures(figure) {
	nr = Math.round((figure + Number.EPSILON) * 100) / 100;
	return nr;
}

function generateChart(chartDate, chartPrice) {
	var ctx = document.getElementById('coin-history-chart').getContext('2d');
	if (!deleteChart); else deleteChart.destroy();

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
	deleteChart = chart;
}

function getCoinInfo(selectedButton) {
	var cryptoId = $(selectedButton).closest("tr").find(".crypto-id").text().toLowerCase();
	timeToday = Math.floor(Date.now());
	timeWeekAgo = Math.floor(Date.now() - 691200000);
	// get current data from the selected coin and appends it to the modal
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "https://api.coincap.io/v2/assets/" + cryptoId,

		success: function (data) {
			console.log(data)
			var template = $("#more-info-template").html();
			var renderTemplate = Mustache.render(template, data);
			console.log(renderTemplate)
			$("#more-info-modal .more-info-container").html(renderTemplate);
		}
	});

	$.ajax({
		type: "GET",
		dataType: "json",
		url: "https://api.coincap.io/v2/assets/" + cryptoId + "/history?interval=d1&start=" + timeWeekAgo + "&end=" + timeToday + "",

		success: function (historicalData) {
			var dateArray = [];
			var priceArray = [];
			$.each(historicalData.data, function (index, value) {
				dateArray.push(value.date.replace("T00:00:00.000Z", ""))
				priceArray.push(value.priceUsd);
			})
			generateChart(dateArray, priceArray)
		}
	});
}

function updatePrice(form) {
	console.log(form.closest('form'))
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
		}, timeout * 1000);
	}
}

function addCoinInfo(selectedButton) {
	var cryptoId = $(selectedButton).closest("tr").find(".crypto-id").text();
	var priceUsd = $(selectedButton).closest("tr").find(".crypto-priceUsd").text();

	$("#modal-title-coin").html(cryptoId);
	$("[name='amount']").val(1);
	$("[name='priceUsd']").val(priceUsd);
}

function getEditCoin(selectedButton) {
	var cryptoId = $(selectedButton).closest("tr").find(".crypto-name").text();
	var priceUsd = $(selectedButton).closest("tr").find(".crypto-priceUsd").text();
	var amount = $(selectedButton).closest("tr").find(".crypto-amount").text();
	$(".edit-title-coin").html(cryptoId);
	$("[name='amount']").val(amount);
	$("[name='priceUsd']").val(priceUsd);
}

function editCoin() {
	var cryptoId = $(".edit-title-coin").text();
	var amount = $("[name='amount']").val();
	var priceUsd = $("[name='priceUsd']").val();
	$.ajax({
		type: "POST",
		dataType: "json",
		headers: [
			'Access-Control-Allow-Origin',
		],
		url: "http://127.0.0.1:8000/api/portfolio/edit/" + cryptoId,
		data: {
			cryptoId: cryptoId,
			amount: amount,
			priceUsd: priceUsd,
			id: getCookie("id"),
		},
		cache: false,
		success: function (data) {
			succesPopup('Succesfully changed the cryptofolio', 3)
			getPortfolio();
		},
		error: function (xhr) {
			errorPopup('Failed to change', 3)
		}
	});
}

function deleteCoin (selectedButton) {
	var cryptoId = $(selectedButton).closest("tr").find(".crypto-id").text();
	
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "http://127.0.0.1:8000/api/portfolio/delete/"+cryptoId,

		success: function (objects) {
			succesPopup("Succesfully deleted coin");
			// $(selectedButton).closest("tr").remove();
			getPortfolio();
		},
		error: function () {
			errorPopup("Failed to delete");
		}
	});
	$(btnDelete).closest("tr").remove();
}

function getPortfolio() {
	console.log(parseInt(getCookie("id")));
	$.ajax({
		type: "GET",
		dataType: "json",
		headers: [
			'Access-Control-Allow-Origin',
		],
		url: "http://127.0.0.1:8000/api/portfolio",
		cache: false,
		data: {
			id: parseInt(getCookie("id")),
		},
		success: function (data) {
			var template = $("#cryptofolio-template").html();
			var renderTemplate = Mustache.render(template, data);
			$("#tbody-portfolio").html(renderTemplate);
		},
		error: function (xhr, status, error) {
			console.error(xhr);
		}
	});
}

function addCrypto() {
	var cryptoId = $("#modal-title-coin").text();
	var amount = $("[name='amount']").val();
	var priceUsd = $("[name='priceUsd']").val();
	$.ajax({
		type: "POST",
		dataType: "json",
		headers: [
			'Access-Control-Allow-Origin',
		],
		url: "http://127.0.0.1:8000/api/portfolio",
		data: {
			cryptoId: cryptoId,
			amount: amount,
			priceUsd: priceUsd,
			id: getCookie("id"),
		},
		cache: false,
		success: function (data) {
			succesPopup('Succesfully added ' + amount + ' ' + cryptoId, 3)
		},
		error: function (xhr) {
			errorPopup('Failed to add ' + amount + ' ' + cryptoId, 3)
		}
	});
}


function getNews() {
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "https://newsapi.org/v2/everything?q=bitcoin&apiKey=85c8b39f552e4759bb301d88aaef51fb",
		success: function (response) {
			var articles = response.articles
			var template = $("#all-characters-template").html();
			var renderTemplate = Mustache.render(template, articles);
			$("body").append(renderTemplate);
		}
	});
}

function loginUser() {
	var email = document.getElementById("email-login").value;
	var password = document.getElementById("password-login").value;

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
			id: getCookie("id"),
		},
		cache: false,
		success: function (data) {
			setCookie("email", data.user.email, 365);
			setCookie("id", data.user.id, 365);
			$("#login-btn").hide();
			$("#create-account-btn").hide();
			$("#logout-btn").show();
		},
		error: function (xhr, status, error) {
			console.error(xhr);
		}
	});
}

function createUser() {
	var email = document.getElementById("email-create").value;
	var password = document.getElementById("password-create").value;
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
			id: getCookie("id"),
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
	let id = getCookie("id");
	if (id != "") {
		$("#logout-btn").show();
		$("#login-btn").hide();
		$("#create-account-btn").hide();
	} else {
		$("#login-btn").show();
		$("#create-account-btn").show();
		$("#logout-btn").hide();
	}
	getNews();
	getPortfolio();
	$(".loading-container").fadeOut("slow");
	getAllCoins();
	$(document).on('click', '#edit-coin', function (event) {
		event.preventDefault();
		editCoin();
	});

	$(document).on('click', '.coins-info-btn', function () {
		getCoinInfo(this);
	});

	$(document).on('click', '.edit-coin-open', function () {
		getEditCoin(this);
	});

	$(document).on('click', '#delete-coin', function () {
		deleteCoin(this);
	});

	$(document).on('click', '.add-coin', function (event) {
		let id = getCookie("id");
		if (id != "") {
			event.preventDefault();
			addCrypto(this);
		} else {
			event.preventDefault();
			errorPopup("please login", 3);
		}
	});

	$(document).on('click', '#login-account', function (event) {
		event.preventDefault();
		loginUser();
	});

	$(document).on('click', '#create-account', function (event) {
		event.preventDefault();
		createUser();
	});

	$(document).on('click', '.open-add-coin-button', function () {
		addCoinInfo(this);
	});

	$(document).on('click', '#logout-btn', function () {
		document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		$("#login-btn").show();
		$("#create-account-btn").show();
		$("#logout-btn").hide();
	});
});