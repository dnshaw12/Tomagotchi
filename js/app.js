$timer = $('#timer')

const game = {
	gameStarted: false,
	tamagotchi: null,
	time: 0,
	timer: null,
	lightOn: true,
	startGame(){
		game.gameStarted = true;
		game.tamagotchi = new Tamagotchi();
		$('#name').text(game.tamagotchi.surName+game.tamagotchi.name)
		$('#screen').css('background-image',"url('images/field.jpg')")
		$('#startScreen').remove()
		game.timer = setInterval(function(){
		game.increaseTimer();
		//stat increases
		$('#hunger').text(game.tamagotchi.hunger)

		game.dies();

		}, 1000);
	},
	increaseTimer(){
		this.time++;
		$timer.text(this.time);
	},
	// check if dead

	dies(){
		if (this.tamagotchi.hunger === 10 || this.tamagotchi.sleepiness === 10 || this.tamagotchi.boredom === 10) {
			console.log(this.tamagotchi.surName + this.tamagotchi.name + ' died!');
			clearInterval(this.timer)
		}
	},
	// turn off light
	toggleLight(){
		if (game.gameStarted) {
			if (game.lightOn) {
				console.log('turn light off');
				game.lightOn = false;
				$('#screen').css('background-color',"black")
				$('#screen').css('background-image',"")
				$('#screen2').css('background-image',"url('images/sleeping-zzz.gif')")
			} else {
				console.log('turn light on');
				game.lightOn = true;
				$('#screen').css('background-image',"url('images/field.jpg')")
				$('#screen').css('background-color',"")
				$('#screen2').css('background-image',"")
			}
		}
	}

	// sleep state // cannot feed or play



	// increase hunger // keep in mind sleep state
	// increase sleepiness 
	// increase boredom // keep in mind sleep state
	// evolve
	// feed
}

$('#startButton').on('click',game.startGame);
$('#lightButton').on('click',game.toggleLight);
