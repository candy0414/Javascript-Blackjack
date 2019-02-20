var playerwincount = 0;
var playerlosecount = 0;
var mark1 =0;
var mark2 = 0;
var mark3 = 0;
var splitmark;

function reset(){

	// Reset
	$(".dealer-cards").html("<div class='card flipped card1'></div><div class='card card2 flipped'></div><div class='new-cards'></div><div class='clear'></div><div id='dealerTotal' class='dealer-total'></div>");
	
	$(".player-cards").html("<div class='card flipped card1'></div><div class='card card2 flipped'></div><div class='new-cards'></div><div class='clear'></div><div id='playerTotal' class='player-total'></div>");
	
	var reloadGame = "<div class='btn disabled' id='hit'>Hit</div><div class='btn disabled' id='stand'>Stand</div><div class='btn disabled' id='double'>Double</div><div class='btn disabled' id='split'>Split</div>";
	$(".buttons").html(reloadGame);
	
	$(".dealer-cards").css("width","");
	$(".player-cards").css("width","");

	$("#playerTotal").html('');
	$("#dealerTotal").html('');
	$(".betting-area").css('display','block');
	$("#message").html('');

}


function deal(){	
	reset();
				
/// Store cards in array
	var cards = ["ace-of-clubs","two-of-clubs","three-of-clubs","four-of-clubs","five-of-clubs","six-of-clubs","seven-of-clubs","eight-of-clubs","nine-of-clubs","ten-of-clubs","jack-of-clubs","queen-of-clubs","king-of-clubs","ace-of-spades","two-of-spades","three-of-spades","four-of-spades","five-of-spades","six-of-spades","seven-of-spades","eight-of-spades","nine-of-spades","ten-of-spades","jack-of-spades","queen-of-spades","king-of-spades","ace-of-hearts","two-of-hearts","three-of-hearts","four-of-hearts","five-of-hearts","six-of-hearts","seven-of-hearts","eight-of-hearts","nine-of-hearts","ten-of-hearts","jack-of-hearts","queen-of-hearts","king-of-hearts","ace-of-diamonds","two-of-diamonds","three-of-diamonds","four-of-diamonds","five-of-diamonds","six-of-diamonds","seven-of-diamonds","eight-of-diamonds","nine-of-diamonds","ten-of-diamonds","jack-of-diamonds","queen-of-diamonds","king-of-diamonds"];
	
	/// Store correlating values in an array
	var values = [11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10];
	
	/// Zero out dealer total
	var dealerTotal = 0;
	$(".dealer-cards .card").each(function(){
		
		var num = Math.floor(Math.random()*cards.length);
		var cardClass = cards[num];
		
		$(this).addClass(cardClass);
		
		$(this).attr("data-value",values[num]);
		
		dealerTotal = parseInt(dealerTotal) + parseInt(values[num]);

		//Dealer Jack!
		if(dealerTotal == 21) {
			$("#message").html("DEALER BALCK JACK");
			$('#hit, #stand, #double,#split').addClass("disabled");
			$(".betting-area").css("display","none");
			$("#playerlose").html(++playerlosecount);
			var coin = Number($("#money").html());
			var bett = Number($("#bet").html());
			$("#money").html(coin);
			
		}
		
		if(dealerTotal>21){
			$(".dealer-cards .card").each(function(){
				if($(this).attr("data-value")==11){
					dealerTotal = parseInt(dealerTotal) - 10;
					$(this).attr("data-value",1);
				}
			});
		}
		
		$("#dealerTotal").html(dealerTotal);
		
		cards.splice(num, 1);
		values.splice(num, 1);
	});
	$(".dealer-cards .card1").removeClass("flipped");

	/// Zero out player total
	var playerTotal = 0;
	$(".player-cards .card").each(function(){
		
		var num = Math.floor(Math.random()*cards.length);
		var cardClass = cards[num];
		
		$(this).removeClass("flipped");
		$(this).addClass(cardClass);
		
		$(this).attr("data-value",values[num]);
		
		if(parseInt(playerTotal) == parseInt(values[num])) $("#split").removeClass("disabled");
		playerTotal = parseInt(playerTotal) + parseInt(values[num]);

		//player Jack!
		if(playerTotal == 21) {
			$("#message").html("BALCK JACK");
			$('#hit, #stand, #double,#split').addClass("disabled");
			$(".betting-area").css("display","none");
			$("#playerwin").html(++playerwincount);
			var coin = Number($("#money").html());
			var bett = Number($("#bet").html());
			$("#money").html(coin + bett * 2);
		}
		
		if(playerTotal>21){
			$(".player-cards .card").each(function(){
				if($(this).attr("data-value")==11){
					playerTotal = parseInt(playerTotal) - 10;
					$(this).attr("data-value",1);
				}
			});
		}
		
		$("#playerTotal").html(playerTotal);
		
		cards.splice(num, 1);
		values.splice(num, 1);
		
	});
	
	//If split click
	if(splitmark == 1){
		splitmark = 0;
		$(".betting-area").css('display','none');
	}
	
	/// If player hits
	$("#hit").click(function(){

		if($(this).attr("class")=="btn disabled") return;

		$(".betting-area").css('display','none');
		$('#double').addClass("disabled");

		var num = Math.floor(Math.random()*cards.length);
		var cardClass = cards[num];
		
		var newCard = "<div class='card " +  cardClass + "' data-value='" + values[num] + "'></div>";
		$(".player-cards .new-cards").append(newCard);
		
		playerTotal = parseInt(playerTotal) + parseInt(values[num]);
		
		if(playerTotal>21){
			$(".player-cards .card").each(function(){
				if($(this).attr("data-value")==11){
					playerTotal = parseInt(playerTotal) - 10;
					$(this).attr("data-value",1);
				}
			});
		}
		
		cards.splice(num, 1);
		values.splice(num, 1);
		
		$("#playerTotal").html(playerTotal);
		$(".player-cards").width($(".player-cards").width()+84);
		
		
		if(playerTotal>21){
			$("#message").html('Bust!');
			// var reloadGame = "<div class='btn' id='deal'>New Game</div>";
			// $(".buttons").html(reloadGame);
			console.log($("#playerlose").html());
			$("#playerlose").html(++playerlosecount);
			$('#hit, #stand, #double,#split').addClass("disabled");
			/// Pay up
			// $("#bet").html('0');
			// $("#betpresent").html('0');
			return false;
		}
		
				 
	});
	
	/// If player stands
	$("#stand").click(function(){

		if($(this).attr("class")=="btn disabled") return;

		$('#hit, #stand, #double,#split').addClass("disabled");

		$(".betting-area").css('display','none');
		$('#double').addClass("disabled");

		$("#dealerTotal").css("visibility","visible");
		$(".card2").removeClass("flipped");
		
		//// Keep adding a card until over 17 or dealer busts
		var keepDealing = setInterval(function(){
								 
			var dealerTotal = $("#dealerTotal").html();
			var playerTotal = $("#playerTotal").html();
			
			/// If there are aces
			if(dealerTotal>21){
				$(".dealer-cards .card").each(function(){
					
					//// and check if still over 21 in the loop
					if($(this).attr("data-value")==11 && dealerTotal>21){
						dealerTotal = parseInt(dealerTotal) - 10;
						$(this).attr("data-value",1);
					}
				});
			}
			
			if(dealerTotal>21){

				$("#playerwin").html(++playerwincount);

				$("#message").html('Dealer Bust!');	
				// var reloadGame = "<div class='btn' id='deal'>New Game</div>";
				// $(".buttons").html(reloadGame);
				clearInterval(keepDealing);
				/// Pay up
				var bet = $("#bet").html();
				var money = $("#money").html();

				console.log("stand");
				console.log("bet"+bet);
				console.log("money"+money);
				if(mark1 == 0){
					var winnings = bet * 2;
					// $("#bet").html('0');
					// $("#betpresent").html('0');
					$("#money").html(parseInt(winnings) + parseInt(money));
				}
				else{
					money =parseInt(money) + bet/2;
					$("#money").html(parseInt(bet) + parseInt(money));
				}
				return false;
			}
			
			
			if(dealerTotal>=17){
				/// You Win
				if(playerTotal>dealerTotal){

					$("#playerwin").html(++playerwincount);

					$("#message").html('You Win!');
					
					/// Pay up
					var bet = $("#bet").html();
					var money = $("#money").html();
					var winnings = bet * 2;
					// $("#restart").click();
					if(mark3 == 0){
						$("#money").html(parseInt(winnings) + parseInt(money));
					}
					else{
						money =parseInt(money) + bet/2;
						$("#money").html(parseInt(bet) + parseInt(money));
					}
				}
				
				/// You Lose
				if(playerTotal<dealerTotal){

				 	$("#playerlose").html(++playerlosecount);

					$("#message").html('You Lose!');
					/// Pay up
					var bet = $("#bet").html();
					var money = $("#money").html();
					// $("#restart").click();
					if(mark2 == 0){
						$("#money").html(parseInt(money));
					}
					else{
						$("#money").html(parseInt(money) - bet/2);
					}
				}
				if(playerTotal==dealerTotal){
					$("#message").html('Push!');
					var bet = $("#bet").html();
					var money = $("#money").html();
					$("#money").html(parseInt(bet) + parseInt(money));
					// $("#restart").click();
				}
				// var reloadGame = "<div class='btn' id='deal'>New Game</div>";
				// $(".buttons").html(reloadGame);
				clearInterval(keepDealing);
				return false;
			}
			
			var num = Math.floor(Math.random()*cards.length);
			var cardClass = cards[num];
			
			var newCard = "<div class='card " +  cardClass + "' data-value='" + values[num] + "'></div>";
			$(".dealer-cards .new-cards").append(newCard);
			
			dealerTotal = parseInt(dealerTotal) + parseInt(values[num]);
			
			$("#dealerTotal").html(dealerTotal);
			$(".dealer-cards").width($(".dealer-cards").width()+84)
			
			
			cards.splice(num, 1);
			values.splice(num, 1);
			
			}, 300);
	});			

	//if player double
	$("#double").click(function(){

		mark1 = 0;
		mark2 = 0;
		mark3 = 0;

		if($(this).attr("class")=="btn disabled") return;
		// $('#hit, #stand, #double,#split').addClass("disabled");

		var betting = $("#bet").html() *2;
		$("#bet").html(betting);
		$("#betpresent").html(betting);
		// var money = $("#money").html()-betting;
		// $("#money").html(money);
		var basemoney = Number($("#money").html()) + betting/2;

		$("#hit").click();
		// if(playerTotal>dealerTotal){
		// 	var bet = $("#bet").html();
		// 	var money = $("#money").html();
		// 	// $("#restart").click();
		// 	$("#money").html(parseInt(bet) + parseInt(money));
		// }
		// if(playerTotal>21){
		// 	var bet = $("#bet").html();
		// 	var money = $("#money").html();
		// 	// $("#restart").click();
		// 	console.log("money"+money);
		// 	console.log("bet"+bet);
		// 	$("#money").html(parseInt(money) - parseInt(bet));
		// }
		if(playerTotal > 21){
			$("#money").html(basemoney - betting);
		}
		if(playerTotal == 21){
			$("#message").html("You Win!");
			$("#money").html(basemoney + betting);
		}
		if(playerTotal < 21){
			console.log("camdfe");
			mark1 = 1;
			mark2 = 1;
			mark3 = 1;
			$('#stand').click();
			console.log(dealerTotal);
			// if(dealerTotal>21){
			// 	console.log("asdasf");
			// 	$("#money").html(basemoney + betting*2);
			// }

			// if(dealerTotal>=17){
			// 	console.log("opopop");
			// 	if(playerTotal==dealerTotal){
			// 		$("#money").html(""+basemoney);
			// 		// $("#restart").click();
			// 	}
			// 	if(playerTotal > dealerTotal){
			// 		console.log("betting"+betting);
			// 		console.log("money"+basemoney);
			// 		$("#money").html(basemoney + betting);
			// 	}
			// 	if(playerTotal < dealerTotal){
			// 		console.log("betting"+betting);
			// 		console.log("money"+basemoney);
			// 		$("#money").html(parseInt(basemoney) - parseInt(betting));
			// 		// $("#restart").click();
			// 	}
			// }
		}
		$('#hit, #stand, #double,#split').addClass("disabled");
	});

	$('#split').click(function(){
		if($(this).attr("class") == "btn disabled") return;
		$(this).addClass("disabled");
		$("#player-othercards").css("display","block");
		splitmark = 1;
		$('#submitt').click();
	});
}

$(document).ready(function(){

	// deal();
	reset();
	$("#submitt").click(function(){
		if($("#bet").html() == 0) return;
		$('#hit,#stand,#double').removeClass("disabled");
		$(".betting-area").css("display","none");
		deal();
	});
	//// Bet
	$("#more").click(function(){

		// $('#hit,#stand,#double,#split').removeClass("disabled");

		var bet = 10;
		var currentBet = $("#bet").html();
		var money = $("#money").html();
		if(money==0) return false;
		if(currentBet){
			
			$("#bet").html(parseInt(currentBet) + bet);
			$("#betpresent").html(parseInt(currentBet) + bet);
			
			} else {
			
			$("#bet").html(bet);
			$("#betpresent").html(bet);
			
		}
		
		$("#money").html(money-bet);
		
	});
	
	$("#less").click(function(){
		
		var bet = -10;
		var currentBet = $("#bet").html();
		if(currentBet==0) return false;
		
		var money = $("#money").html();
		
		if(currentBet){
			
			$("#bet").html(parseInt(currentBet) + bet);
			$("#betpresent").html(parseInt(currentBet) + bet);

			// if($('#bet').html() == 0) $('#hit,#stand,#double').addClass("disabled");
			// else $('#hit,#stand,#double').removeClass("disabled");
			
			} else {
			
			$("#bet").html(bet);
			$("#betpresent").html(bet);

			// if($('#bet').html() == 0) $('#hit').addClass("disabled");
			// else $('#hit').removeClass("disabled");
			
		}
		
		$("#money").html(money-bet);
		
	});

	//Reset
	$("#reset").click(function(){

		$("#playerwin").html(0);
		$("#playerlose").html(0);
		$("#money").html(1000);
		$("#bet").html(0);
		$("#betpresent").html(0);

		playerwincount=playerlosecount=0;


		$("#restart").click();
		reset();
	});

	//Restart
	$("#restart").click(function(){

		$(".betting-area").css("display","block");
		// $('#hit,#stand,#double').removeClass("disabled");
		$("#bet").html(0);
		$("#betpresent").html(0);
		$("#message").html("");
		reset();

	});
	
});
$(document).on('click','#submitt', function(){
	if($("#bet").html() == 0) return;
	$('#hit,#stand,#double').removeClass("disabled");
	$(".betting-area").css("display","none");
	// deal();
});