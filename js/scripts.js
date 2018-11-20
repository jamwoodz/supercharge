$(function(){
 let Game=(function(){
		const game = $(".game");
		const restartButton = $("button.restart");
		let paused = false;
		let guess = null;

		function win(){
			alert("Game is over");
		}

		function cardClicked(elem){
			var $card = $(elem);
			if(!paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!guess){
					guess = $card.attr("data-id");
				} else if(guess == $card.attr("data-id") && !$card.hasClass("picked")){
					$(".picked").addClass("matched");
					guess = null;
				} else {
					guess = null;
					paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					win();
				}
			}
		}

		function renderElements(cards){
			var deck = '';
			$.each(cards,function(key, value){
				deck += '<div class="card" data-id="'+ value.id +'"><div class="inside">\
				<div class="front"><img src="'+ value.img +'"\
				alt="'+ value.name +'" /></div>\
				<div class="back"><img src="./img/supercharge.png"\
				alt="supercharge" /></div></div>\
				</div>';
			});
			return deck;
		}

	  function setup(cards){
		 game.html(renderElements(cards));
		 $(document).on("click",".card",function(){
			 cardClicked(this);
		 });

	 }

	 function shuffleCards(arr) {
    let ctr = arr.length;
    let temp;
    let index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arr[ctr];
        arr[ctr] = arr[index];
        arr[index] = temp;
    }
    return arr;
}

	function deployGame(cards){
		 const cardsArray = $.merge(cards, cards);
		 let randomDeck = shuffleCards(cardsArray);
		 setup(randomDeck);
	 }
	 var init = function(cards){
		 deployGame(cards);
	 }

	 return{
     init:init
   }
 })();

 const items = [
 	{
 		name: "angular",
 		img: "./img/cards/angular.png",
 		id: 1,
 	},
 	{
 		name: "d3",
 		img: "./img/cards/d3.png",
 		id: 2,
 	},
 	{
 	 name: "jenkins",
 	 img: "./img/cards/jenkins.png",
 	 id: 3,
  },
  {
 	 name: "postcss",
 	 img: "./img/cards/postcss.png",
 	 id: 4,
  },
  {
 	 name: "react",
 	 img: "./img/cards/react.png",
 	 id: 5,
  },
  {
 	 name: "redux",
 	 img: "./img/cards/redux.png",
 	 id: 6,
  },
  {
 	 name: "sass",
 	 img: "./img/cards/sass.png",
 	 id: 7,
  },
  {
 	 name: "ts",
 	 img: "./img/cards/ts.png",
 	 id: 8,
  },
  {
 	 name: "webpack",
 	 img: "./img/cards/webpack.png",
 	 id: 9,
  }

 ];

Game.init(items);

});
