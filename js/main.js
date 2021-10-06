function getAllCoins() {
	$.ajax({ 
		type: "GET",
		dataType: "json",
		url: "https://api.coincap.io/v2/assets",
 
		success: function(data){
			console.log(data.data);
			var template = $("#all-coins-template").html();
			var renderTemplate = Mustache.render(template, data);

			$("#coins-table tbody").append(renderTemplate);
		}
	 });
}

function roundFigures(){
	
}

// function getPortfolio() {

// 	$.ajax({ 
// 	   type: "GET",
// 	   dataType: "json",
// 	//    headers: [
// 	// 	'Access-Control-Allow-Origin',
// 	//    ],
// 	   url: "http://127.0.0.1:8000/api/crypto",
// 	   success: function(data){   
// 			coins = data;
// 			console.log(data)
// 			var template = $("#all-coins").html();
// 			var renderTemplate = Mustache.render(template, coins);
// 			$("#coins-table tbody").append(renderTemplate);
// 	   }
// 	});
// }


//function to get a single character
function getCharacter(selectedButton) {
	characterId = $(selectedButton).closest("tr").find(".character-id").text();
}


$(document).ready(function(){
	getAllCoins();
});