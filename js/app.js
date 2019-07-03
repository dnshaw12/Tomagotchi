$timer = $('#timer')

const game = {
	tamagotchi: null,
	time: 0,
	startGame(){
		game.tamagotchi = new Tamagotchi();
		$('#startScreen').remove()
		timer = setInterval(function(){
			game.increaseTimer()
		}, 1000);
	},
	increaseTimer(){
		this.time++;
		$timer.text(this.time);
	},
}

$('#startButton').on('click',game.startGame);