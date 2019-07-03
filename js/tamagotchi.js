/// tamagotchi class

class Tamagotchi {
	constructor(){
		this.surName = 'Kitten ';
		this.name = $('input')[0].value;
		this.hunger = 1;
		this.sleepiness = 1;
		this.boredom = 1;
		this.hungry = false;
		this.sleepy = false;
		this.bored = false;
		this.isAsleep = false;
		this.angryMeow = new Audio('sounds/angrymeow.mp3')
		this.meow = new Audio('sounds/meow.mp3')
	}
};