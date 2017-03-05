class Level {
	constructor(id) {
		this.name = id;
		this.img = Object();
		this.img.path = "./objects/levels/"+id+"/img/";
		this.img.background = this.img.path+"background.png";
	}
}

class Vehicle {	
	constructor(id) {
		this.width = 16;
		this.height = 16;
		this.weight = 1;
		this.power = 1;
		this.name = id;
		this.img = Object();
		this.img.path = "./objects/vehicles/"+id+"/img/";
		this.img.vehicle = this.img.path+id+".svg";
		this.img.forward = this.img.path+id+"_forward.svg";
		this.img.left = this.img.path+id+"_left.svg";
		this.img.right = this.img.path+id+"_right.svg";
		this.img.landing = this.img.path+id+"_landing.svg";
		this.translate = Object();
		this.translate.x = -this.width/2;
		this.translate.y = -this.height/2;
	}
}

class Game {

	constructor() {

		// Level-logic
		this.svg = document.getElementById('lander');
		this.front = document.getElementById('front');
		this.alarm = document.getElementById('alarm');
		this.whole = document.createElementNS('http://www.w3.org/2000/svg','g');
		this.spacecraft = document.createElementNS('http://www.w3.org/2000/svg','image');
		this.spacebar = document.createElementNS('http://www.w3.org/2000/svg','text');
		this.spacebar.setAttribute('y','-400');
		this.spacebar.innerHTML = "Press spacebar... SPACE-bar.";
		this.spacebar.style.visibility = 'hidden';
		this.spacebar.style.fill = 'white';
		this.spacebar.style.fontSize = '120';
		this.spacebar.style.textAnchor = 'middle';

		// Vehicle-logic
		this.forward = document.createElementNS('http://www.w3.org/2000/svg','image');
		this.left = document.createElementNS('http://www.w3.org/2000/svg','image');
		this.right = document.createElementNS('http://www.w3.org/2000/svg','image');
		this.legs = document.createElementNS('http://www.w3.org/2000/svg','image');
		this.meter = document.createElementNS('http://www.w3.org/2000/svg','rect');
		this.fuel = document.createElementNS('http://www.w3.org/2000/svg','rect');

		this.restart(); // Contains initial values.

		this.spacecraft.setAttribute('href',vehicle.img.vehicle);
		this.spacecraft.id = 'spacecraft';
		this.spacecraft.setAttribute('width',this.zoom);
		this.spacecraft.setAttribute('height',this.zoom);

		this.forward.setAttribute('href',vehicle.img.forward);
		this.forward.id = 'forward';
		this.forward.setAttribute('width',this.zoom);
		this.forward.setAttribute('height',this.zoom);
		this.forward.setAttribute('opacity',0);

		this.left.setAttribute('href',vehicle.img.left);
		this.left.id = 'left';
		this.left.setAttribute('width',this.zoom);
		this.left.setAttribute('height',this.zoom);
		this.left.setAttribute('opacity',0);

		this.right.setAttribute('href',vehicle.img.right);
		this.right.id = 'right';
		this.right.setAttribute('width',this.zoom);
		this.right.setAttribute('height',this.zoom);
		this.right.setAttribute('opacity',0);

		this.legs.setAttribute('href',vehicle.img.landing);
		this.legs.setAttribute('width',this.zoom);
		this.legs.setAttribute('height',this.zoom);
		this.legs.setAttribute('opacity',0);

		this.meter.setAttribute('y',-60);
		this.meter.setAttribute('width',vehicle.width*10);
		this.meter.setAttribute('height',10);
		this.meter.setAttribute('fill',"rgba(0,0,0,0.5)");

		this.fuel.setAttribute('y',-60);
		this.fuel.setAttribute('height',10);
		this.fuel.setAttribute('fill',"rgb(127,192,255)");

		this.whole.setAttribute('transform','translate('+vehicle.translate.x+','+vehicle.translate.y+')');

		this.whole.appendChild(this.spacecraft);
		this.whole.appendChild(this.left);
		this.whole.appendChild(this.right);
		this.whole.appendChild(this.forward);
		this.whole.appendChild(this.legs);

		this.svg.appendChild(this.meter);
		this.svg.appendChild(this.fuel);
		this.svg.insertBefore(this.whole,this.front);

		this.svg.appendChild(this.spacebar);
		sfx.begin();
	}
	restart() {
			// Game-logic
		this.buttonPressed = false;	// The player can press only one button at a time.
		this.finished = false;		// Is the game finished?
		this.dead = false;		// Is the player dead?

		// Drawing-logic
		this.zoom = 160;						// Relative pixel-size. This should become obsolete soon.

		// Motion-logic
		this.x = 800;
		this.y = -2400;
		this.rotation = Math.random();
		this.rotationD = Math.sin(Math.random()-0.5)*Math.PI/30;
		this.vector = Object();
		this.vector.x = Math.sin(Math.random()-0.5)*25;
		this.vector.y = Math.sin(Math.random()-0.7)*25;
		this.velocity = 0;
		this.whole.style.visibility = "initial";
		this.meter.style.visibility = "initial";
		this.fuel.style.visibility = "initial";
		this.legs.setAttribute('opacity',0);
		level.burst = 160;
		this.spacebar.style.visibility = 'hidden';
		sfx.begin();
	}
}
// Drawing
function nextFrame() {
	game.velocity=Math.sqrt(Math.pow(game.vector.x,2)+Math.pow(game.vector.y,2));
	game.rotation+=game.rotationD;
	if(!game.finished) {
		game.vector.y+=level.gravity;
		game.x+=game.vector.x;
		game.y+=game.vector.y;
	}

	if ( game.y < -400 || game.velocity > 3 || !(game.x > -200 && game.x < 40 ) || Math.cos(game.rotation) < 0.9 ) {
		if (!game.finished && !game.dead) {
			alarm.style.fill = "rgb(255,0,0)";
		}
		if (game.y > -60 && !(game.x > -120 && game.x < 120 ) && !game.finished) {
			game.dead = true;
			sfx.dead();
			game.finished = true;
			game.whole.style.visibility = "hidden";
			game.meter.style.visibility = "hidden";
			game.fuel.style.visibility = "hidden";
			game.spacebar.style.visibility = 'initial';
		}
		if (game.y > -130 && (game.x > -120 && game.x < 120 ) && !game.finished) {
			game.dead = true;
			sfx.dead();
			game.finished = true;
			game.whole.style.visibility = "hidden";
			game.meter.style.visibility = "hidden";
			game.fuel.style.visibility = "hidden";
			game.spacebar.style.visibility = 'initial';
		}
	} else {
		game.alarm.style.fill = "rgb(0,255,0)";
		game.legs.setAttribute('opacity',1);
		if (game.y > -130 && !game.finished) {
			game.finished = true;
			sfx.success();
			game.whole.setAttribute('transform',
				'translate('+game.x+','+game.y+') ' 
				+ 'rotate(0,'+game.zoom/2+','+game.zoom/4+')');
			game.spacebar.style.visibility = 'initial';
		}
	}

	var scale = 1;
	if (game.finished && !game.dead) {
	} else {
		scale = scale > game.x/500? scale : 2;
		scale = scale > -(game.x/500)? scale : 2;
		scale = scale > game.y/100? scale : 2;
		scale = scale > -(game.y/700)? scale : 2;
		scale = scale > game.x/700? scale : 4;
		scale = scale > -(game.x/700)? scale : 4;
		scale = scale > game.y/200? scale : 4;
		scale = scale > -(game.y/800)? scale : 4;
	}
	game.svg.setAttribute('viewBox',
		scale*-800 + " " +
		scale*-850 + " " +
		scale*1600 + " " +
		scale*900 );
	if(!game.finished) {
		game.whole.setAttribute('transform',
			'translate('+game.x+','+game.y+') ' 
			+ 'rotate('+game.rotation*(180/Math.PI)+','+game.zoom/2+','+game.zoom/4+')');
		game.meter.setAttribute('transform',
			'translate('+game.x+','+game.y+')');
		game.fuel.setAttribute('transform',
			'translate('+game.x+','+game.y+')');
	}
	game.fuel.setAttribute('width',level.burst);
	requestAnimationFrame(nextFrame);
}
function keyboard(event) {
	if (event.keyCode == 32) {
		game.restart();
	}
	if (level.burst > 0 && !game.finished) {
		if (event.keyCode == 37) {
			if(!game.buttonPressed && event.type == 'keydown') {
				game.buttonPressed = true;
				steer('left');
				game.left.style.animation = "start 200ms";
			} else {
				game.left.style.animation = "stop 200ms";
				game.buttonPressed = false;
			}
		}
		if (event.keyCode == 39) {
			if(!game.buttonPressed && event.type == 'keydown') {
				game.buttonPressed = true;
				steer('right');
				game.right.style.animation = "start 200ms";
			} else {
				game.right.style.animation = "stop 200ms";
				game.buttonPressed = false;
			}
		}
		if (event.keyCode == 38) {
			if(!game.buttonPressed && event.type == 'keydown') {
				game.buttonPressed = true;
				steer('forward');
				game.forward.style.animation = "start 200ms";
			} else {
				game.forward.style.animation = "stop 200ms";
				game.buttonPressed = false;
			}
		}
	}
}

// Different control-options can call these functions.
function steer(direction) {
	level.burst -= 1;
	sfx.burst();
	if (direction == 'left') {
		game.rotationD-=0.5*(Math.PI/180);
		game.vector.x += Math.sin(game.rotation)/2;
		game.vector.y -= Math.cos(game.rotation)/2;
	}
	if (direction == 'right') {
		game.rotationD+=0.5*(Math.PI/180);
		game.vector.x += Math.sin(game.rotation)/2;
		game.vector.y -= Math.cos(game.rotation)/2;
	}
	if (direction == 'forward') {
		level.burst -= 1;
		game.vector.x += Math.sin(game.rotation);
		game.vector.y -= Math.cos(game.rotation);
	}
}

// Listen for keyboard actions and call keyboard();
addEventListener("keydown", keyboard);
addEventListener("keyup", keyboard);
