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

		this.gameStarted = true;
		this.tamagotchi = new Tamagotchi();
		$('#name').text(this.tamagotchi.surName+this.tamagotchi.name)
		$('#screen').css('background-image',"url('images/field.jpg')")
		$('#startScreen').remove();
		$('#screen').css('animation','2s zoom');

		this.timer = setInterval(function(){

			game.increaseTimer();
			game.beAsleep();

			if (game.time % 6 === 0) {
				game.tamagotchi.growUp();
			}

			//stat increases
			game.increaseHunger();
			game.isHungry();
			game.increaseSleepiness();
			game.isSleepy();
			game.increaseBoredom();
			game.isBored();

			game.evolve();

			game.updateVisStats()

			game.dies();

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
			$('#age').text(game.tamagotchi.age)
		}
	},

	// check if dead

	dies(){
		if (this.tamagotchi.hunger === 10 || this.tamagotchi.sleepiness === 10 || this.tamagotchi.boredom === 10) {
			console.log(this.tamagotchi.surName + this.tamagotchi.name + ' died!');
			$('#screen').css('background-color',"black");
			$('#screen').css('background-image','');
			$('#screen1').css('background-image','');
			$('#screen2').css('background-image','');
			$('#screen3').css('background-image','');
			$('#catImage').attr('src','images/ghostcat.gif')

			$('#screen1').append($('<img src="images/headstone.png">'))
			$('#screen3').append($('<img src="images/headstone.png">'))

			$('#screen2').text(`${this.tamagotchi.surName}${this.tamagotchi.name} died! You're a terrible owner....`)
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
				$('#catImage').attr('src','images/black.png')
			} else {
				console.log('turn light on');
				game.lightOn = true;
				$('#screen').css('background-image',"url('images/field.jpg')")
				$('#screen').css('background-color',"")
				if (game.time < 60) {
					$('#catImage').attr('src','images/kitten1.gif')
				} else if (game.time >= 60 && game.time < 120) {
					$('#catImage').attr('src','images/kitten-2.gif')
				} else if (game.time >= 120) {
					$('#catImage').attr('src','images/kitten-3.gif')
				}
			}
		}
	},

	// sleep state // cannot feed or play

	beAsleep(){
		if (this.lightOn === false) {
			//decrease sleepiness
			this.tamagotchi.isAsleep = true;
			$('#screen2').css('background-image',"url('images/sleeping-zzz.gif')")
			if (this.tamagotchi.sleepiness > 1) {
				if (this.time % 5 === 0) {
					this.tamagotchi.sleepiness--;
				};
			}
			$('#sleepiness').text(game.tamagotchi.sleepiness)
		} else {
			this.tamagotchi.isAsleep = false;
			$('#screen2').css('background-image',"")
		}
	},

	// increase hunger // keep in mind sleep state
	increaseHunger(){
		if (this.tamagotchi.isAsleep === false) {
			if (this.time % 10 === 0) {
				this.tamagotchi.hunger++;
			}
		} else {
			if (this.time % 20 === 0) {
				this.tamagotchi.hunger++;
			}
		}
	},

	// increase sleepiness 
	increaseSleepiness(){
		if (this.tamagotchi.isAsleep === false) {
			if (this.time % 12 === 0) {
				this.tamagotchi.sleepiness++;
			}
		}
	},

	// increase boredom // keep in mind sleep state

	increaseBoredom(){
		if (this.tamagotchi.isAsleep === false) {
			if (this.time % 15 === 0) {
				this.tamagotchi.boredom++;
			}
		} else {
			if (this.time % 7 === 0) {
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
	},

	// is sleepy

	isSleepy(){
		if (this.tamagotchi.sleepiness > 6 && this.tamagotchi.isAsleep === false) {
			if (this.time % 2 === 0) {
				this.tamagotchi.angryMeow.play();
				$('#screen2').css('background-image',"url('images/sleeping-zzz.gif')")
			} else {
				$('#screen2').css('background-image',"")
			};
		} else if (this.tamagotchi.sleepiness < 6 && this.tamagotchi.isAsleep === false) {
			$('#screen2').css('background-image',"")
		}
	},

	// is bored

	isBored(){
		if (this.tamagotchi.boredom > 6 && this.tamagotchi.isAsleep === true) {
				$('#screen3').css('background-image',"url('images/bored-thought.gif')")
		} else if (this.tamagotchi.boredom > 6 && this.tamagotchi.isAsleep === false) {
			$('#screen3').css('background-image',"url('images/bored-thought.gif')")
			if (this.time % 2 === 0) {
				this.tamagotchi.angryMeow.play();
			}
		}  else {
			$('#screen3').css('background-image',"")
		}
	},

	// feed

	feedPet(){
		if (game.gameStarted) {
			if (game.tamagotchi.isAsleep === true) {
				game.tamagotchi.hiss.play();
			} else {
				if (game.tamagotchi.hunger <= 3) {
					game.tamagotchi.hunger = 1;
					game.tamagotchi.eatSound.play();
				} else {
					game.tamagotchi.hunger -= 3;
					game.tamagotchi.eatSound.play();
				}
			}
			game.updateVisStats()
		}
	},
	// play

	play(){
		if (game.gameStarted) {
			if (game.tamagotchi.isAsleep === true) {
				game.tamagotchi.hiss.play();
			} else {
				if (game.tamagotchi.boredom <= 5) {
					game.tamagotchi.boredom = 1;
					game.tamagotchi.meow.play();
				} else {
					game.tamagotchi.boredom -= 5;
					game.tamagotchi.meow.play();
				}
			}
			game.updateVisStats()
		}
	},

	// evolve

	evolve(){
		if (this.tamagotchi.isAsleep === false) {
			if (this.time === 59) {
				$('#catImage').attr('src','images/poof.gif')
			}
			if (this.time === 60) {
				$('#catImage').attr('src','images/kitten-2.gif')
				this.tamagotchi.surName = 'Cat '
				$('#name').text(this.tamagotchi.surName+this.tamagotchi.name)
			}
			if (this.time === 119) {
				$('#catImage').attr('src','images/poof.gif')
			}
			if (this.time === 120) {
				console.log('second evolution');
				$('#catImage').attr('src','images/kitten-3.gif')
				this.tamagotchi.surName = 'Grande Matriarche '
				$('#name').text(this.tamagotchi.surName+this.tamagotchi.name)
			}
		}
	}
}

//$('#startButton').on('click', game.startGame);
$('#startButton').on('click', (e) => {
	///e
	game.startGame()
});
$('#lightButton').on('click', game.toggleLight);
$('#feedButton').on('click', game.feedPet);
$('#playButton').on('click', game.play);
