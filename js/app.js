$timer = $('#timer')

const game = {
	tamagotchi: null,
	time: 0,
	startGame(){
		game.tamagotchi = new Tamagotchi();
		$('#name').text(game.tamagotchi.name)
		$('#screen').css('background-image',"url('images/field.jpg')")
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