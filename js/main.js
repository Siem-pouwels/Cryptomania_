var deleteChart;
function getAllCoins() {
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "https://api.coincap.io/v2/assets",

		success: function (data) {
			// for each entry of data in the array round the prices.
			// after that we check if the values have increased or decreased.
			$.each(data.data, function (index, value) {
				value.priceUsd = roundFigures(parseFloat(value.priceUsd))
				value.marketCapUsd = roundFigures(parseFloat(value.marketCapUsd))
				value.changePercent24Hr = value.changePercent24Hr
				value.symbolLowerCase = value.symbol.toLowerCase();
				if (value.changePercent24Hr >= 0) value.color = "green";
				if (value.changePercent24Hr <= 0) value.color = "red";
			})
			// render the template using mustache and the data we recieved.
			var template = $("#all-coins-template").html();
			var renderTemplate = Mustache.render(template, data);
			$("#coins-table tbody").append(renderTemplate);
		}
	});
}

function setCookie(cname, cvalue, exdays) {
	// gets a date for the cookie
	const date = new Date();
	// uses this date to calculate the time when it should expire.
	date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
	// sets expire date
	let expires = "expires=" + date.toUTCString();
	// sets the cookie using the cookie name value and the date it expires.
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	let name = cname + "=";
	// split the cookie so we can use it in a loop.
	let ca = document.cookie.split(';');
	//use the length of the cookie to return the cookie where the function is called.
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
	// this function is used to round a number.
	nr = Math.round((figure + Number.EPSILON) * 100) / 100;
	return nr;
}

function generateChart(chartDate, chartPrice) {
	var ctx = document.getElementById('coin-history-chart').getContext('2d');
	if (!deleteChart); else deleteChart.destroy();

	// type of chart we generate plus we use chartPrice to fill up the data in the chart.
	// we use chartDate for the dates in the chart.
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
	// get crypto id from the tr close to the button.
	var cryptoId = $(selectedButton).closest("tr").find(".crypto-id").text().toLowerCase();
	// do some math to get the data of 7 days ago.
	timeToday = Math.floor(Date.now());
	timeWeekAgo = Math.floor(Date.now() - 691200000);
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "https://api.coincap.io/v2/assets/" + cryptoId,

		success: function (data) {
			data.data.priceUsd = roundFigures(parseFloat(data.data.priceUsd))
			data.data.maxSupply = roundFigures(parseFloat(data.data.maxSupply))
			data.data.volumeUsd24Hr = roundFigures(parseFloat(data.data.volumeUsd24Hr))
			data.data.supply = roundFigures(parseFloat(data.data.supply))
			var template = $("#more-info-template").html();
			var renderTemplate = Mustache.render(template, data);
			$("#more-info-modal .more-info-container").html(renderTemplate);
		}
	});

	$.ajax({
		type: "GET",
		dataType: "json",
		url: "https://api.coincap.io/v2/assets/" + cryptoId + "/history?interval=d1&start=" + timeWeekAgo + "&end=" + timeToday + "",

		success: function (historicalData) {
			// we use historicalData to fill up dateArray and priceArray these arrays are used for generating the chart.
			// we get the dates we need and push them in dateArray.
			// we get the prices we need and push them in the priceArray.
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

function updateCoinVal(amount) {
	var priceUsd = $("[name='priceUsd']").val();
	var totalVal = priceUsd * amount;
	$("[name='totalValue']").val(totalVal)
}

function succesPopup(message, timeout) {
	// timeout = time the message stays on screen
	// a_message = the message we display
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
	// timeout = time the message stays on screen
	// a_message = the message we display
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
	// gets and sets the cryptoId and priceUsd by using the clostest tr with the id's.
	var cryptoId = $(selectedButton).closest("tr").find(".crypto-id").text();
	var priceUsd = $(selectedButton).closest("tr").find(".crypto-priceUsd").text();

	$("#modal-title-coin").html(cryptoId);
	$("[name='amount']").val(1);
	$("[name='priceUsd']").val(priceUsd);
	$("[name='totalValue']").val(priceUsd);
}

function getEditCoin(selectedButton) {
	// gets and sets the cryptoId, priceUsd and the amount by using the clostest tr with the id's.
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
		error: function () {
			errorPopup('Failed to change', 3)
		}
	});
}

function deleteCoin(selectedButton) {
	var cryptoId = $(selectedButton).closest("tr").find(".crypto-id").text();

	$.ajax({
		type: "POST",
		dataType: "json",
		url: "http://127.0.0.1:8000/api/portfolio/delete/" + cryptoId,

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
	// uses users id to recieve the portfolio of that user
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
			// it uses the data recieved from the backend and the template to render a template using mustache.
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
	// gets the crypto id amount and price from the template and sends it to the backend.
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
		// get the news from coincap and paste it on the page.
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
	// login function uses the data you entered into the template and sends it to the backend.
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
			// sets cookies as soon as the login is a success
			setCookie("email", data.user.email, 365);
			setCookie("id", data.user.id, 365);
			// hides login and create account
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
	// here we create an account by sending the data you entered into the template and sending it to the backend
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
			succesPopup('Succesfully created user')
		},
		error: function (xhr, status, error) {
			console.error(xhr);
		}
	});
}

$(document).ready(function () {
	// activate buttons when logged in and when not logged in (is for when the page is refreshed)
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
	// call all the functions for receiving api data
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
		// this function does not work if your not logged in :D
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
		// deletes cookies when you log out!
		document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		$("#login-btn").show();
		$("#create-account-btn").show();
		$("#logout-btn").hide();
	});
});