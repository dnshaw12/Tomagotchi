$timer = $('#timer')

const game = {
	gameStarted: false,
	tamagotchi: null,
	time: 0,
	timer: null,
	lightOn: true,
	sleepTimer: null,
	sleepTime: 0,
	startGame(){
		game.gameStarted = true;
		game.tamagotchi = new Tamagotchi();
		$('#name').text(game.tamagotchi.surName+game.tamagotchi.name)
		$('#screen').css('background-image',"url('images/field.jpg')")
		$('#startScreen').remove()

		game.timer = setInterval(function(){
		game.increaseTimer();
		//stat increases

		// game.dies();
		game.increaseHunger();
		game.isHungry();
		game.increaseSleepiness();
		game.increaseBoredom();

		game.beAsleep();

		game.updateVisStats()

		}, 1000);
	},
	increaseTimer(){
		this.time++;
		$timer.text(this.time);
	},
	// update visual stats
	updateVisStats(){
		if (this.tamagotchi.hunger <= 10 || this.tamagotchi.sleepiness <= 10 || this.tamagotchi.boredom <= 10) {
			$('#sleepiness').text(game.tamagotchi.sleepiness)
			$('#hunger').text(game.tamagotchi.hunger)
			$('#boredom').text(game.tamagotchi.boredom)
		}
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
	},

	// sleep state // cannot feed or play

	beAsleep(){
		if (this.lightOn === false) {
			//decrease sleepiness
			this.tamagotchi.isAsleep = true;
			if (this.tamagotchi.sleepiness > 1) {
				if (this.time % 5 === 0) {
					this.tamagotchi.sleepiness--;
				};
			}
			$('#sleepiness').text(game.tamagotchi.sleepiness)
		} else {
			this.sleepTime = 0;
			this.tamagotchi.isAsleep = false;
		}
	},

	// increase hunger // keep in mind sleep state
	increaseHunger(){
		if (this.tamagotchi.isAsleep === false) {
			if (this.time % 2 === 0) {
				this.tamagotchi.hunger++;
			}
		} else {
			if (this.time % 24 === 0) {
				this.tamagotchi.hunger++;
			}
		}
	},

	// increase sleepiness 
	increaseSleepiness(){
		if (this.tamagotchi.isAsleep === false) {
			if (this.time % 15 === 0) {
				this.tamagotchi.sleepiness++;
			}
		}
	},

	// increase boredom // keep in mind sleep state

	increaseBoredom(){
		if (this.tamagotchi.isAsleep === false) {
			if (this.time % 25 === 0) {
				this.tamagotchi.boredom++;
			}
		} else {
			if (this.time % 10 === 0) {
				this.tamagotchi.boredom++;
			}
		}
	},

	// is hungry

	isHungry(){
		if (this.tamagotchi.hunger > 6 && this.tamagotchi.isAsleep === true) {
			$('#screen1').css('background-image',"url('images/hungry-thought.gif')")
		} else if (this.tamagotchi.hunger > 6 && this.tamagotchi.isAsleep === false) {
			$('#screen1').css('background-image',"url('images/hungry-thought.gif')")
			if (this.time % 2 === 0) {
				this.tamagotchi.angryMeow.play();
			};
		} else {
			$('#screen1').css('background-image',"")
		}
	}

	// is sleepy
	// is bored
	// evolve
	// feed
	// play
}

$('#startButton').on('click',game.startGame);
$('#lightButton').on('click',game.toggleLight);
