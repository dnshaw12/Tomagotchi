$timer = $('#timer')

const game = {
	tamagotchi: {},
	time: 0,
	timer: null,
	startGame(){
		this.timer = setInterval(function(){
			game.increaseTimer()
		}, 1000);
	},
	increaseTimer(){
		this.time++;
		$timer.text(this.time);
	},
}