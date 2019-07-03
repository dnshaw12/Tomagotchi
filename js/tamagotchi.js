/// tamagotchi class

class Tamagotchi {
	constructor(){
		this.surName = 'Kitten ';
		this.name = $('input')[0].value;
		this.age = 1;
		this.hunger = 1;
		this.sleepiness = 1;
		this.boredom = 1;
		this.isAsleep = false;
		this.angryMeow = new Audio('sounds/angrymeow.mp3')
		this.meow = new Audio('sounds/meow.mp3')
		this.eatSound = new Audio('sounds/eat.mp3')
		this.hiss = new Audio('sounds/hiss.mp3')
	}
	growUp(){
		this.age++
	}
};