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
		this.power = 0.7;
		this.name = id;
		this.img = Object();
		this.img.path = "./objects/vehicles/"+id+"/img/";
		this.img.vehicle = this.img.path+"spacecraft.svg";
		this.img.forward = this.img.path+"forward.svg";
		this.img.left = this.img.path+"left.svg";
		this.img.right = this.img.path+"right.svg";
		this.img.landing = this.img.path+"landing.svg";
		this.img.flare = this.img.path+"flare.png";
		this.img.radarPanel = this.img.path+"radar_panel.png";
		this.img.radarHorizon = this.img.path+"radar_horizon.png";
		this.translate = Object();
		this.translate.x = -this.width/2;
		this.translate.y = -this.height/2;
	}
	replace(id) {
		this.name = id;
		this.img.path = "./objects/vehicles/"+id+"/img/";
		this.img.vehicle = this.img.path+"spacecraft.svg";
		this.img.forward = this.img.path+"forward.svg";
		this.img.left = this.img.path+"left.svg";
		this.img.right = this.img.path+"right.svg";
		this.img.landing = this.img.path+"landing.svg";
		this.img.flare = this.img.path+"flare.png";
		this.img.radarPanel = this.img.path+"radar_panel.png";
		this.img.radarHorizon = this.img.path+"radar_horizon.png";
		game.radarHorizon.setAttribute('href',this.img.radarHorizon);
		game.radarPanel.setAttribute('href',this.img.radarPanel);
		game.spacecraft.setAttribute('href',this.img.vehicle);
		game.forward.setAttribute('href',this.img.forward);
		game.left.setAttribute('href',this.img.left);
		game.right.setAttribute('href',this.img.right);
		game.legs.setAttribute('href',this.img.landing);
	}
}

class Game {

	constructor() {

		this.difficulty = 4.9;
		this.losses = 0;
		this.wins = 0;

		// Adjust the landingspace size to fit the whole vehicle
		level.landingspace -= vehicle.width*5;

		// Level-logic
		this.svg = document.getElementById('lander');
		this.front = document.getElementById('front');
		this.alarm = document.getElementById('alarm');
		this.whole = document.createElementNS('http://www.w3.org/2000/svg','g');
		this.intro = document.createElementNS('http://www.w3.org/2000/svg','text');
		this.introImage = document.createElementNS('http://www.w3.org/2000/svg','image');
		this.spacebar = document.createElementNS('http://www.w3.org/2000/svg','text');
		this.difficultyText = document.createElementNS('http://www.w3.org/2000/svg','text');

//		this.flare = document.createElementNS('http://www.w3.org/2000/svg','image');
		this.radarHorizon = document.createElementNS('http://www.w3.org/2000/svg','image');
		this.radarAltitudeLabel = document.createElementNS('http://www.w3.org/2000/svg','tspan');
		this.radarDistanceLabel = document.createElementNS('http://www.w3.org/2000/svg','tspan');
		this.radarRotationLabel = document.createElementNS('http://www.w3.org/2000/svg','tspan');
		this.radarFuelLabel = document.createElementNS('http://www.w3.org/2000/svg','tspan');
		this.radarAltitude = document.createElementNS('http://www.w3.org/2000/svg','tspan');
		this.radarDistance = document.createElementNS('http://www.w3.org/2000/svg','tspan');
		this.radarRotation = document.createElementNS('http://www.w3.org/2000/svg','tspan');
		this.radarFuel = document.createElementNS('http://www.w3.org/2000/svg','tspan');
		this.radarText = document.createElementNS('http://www.w3.org/2000/svg','text');
		this.radarPanel = document.createElementNS('http://www.w3.org/2000/svg','image');
		this.radar = document.createElementNS('http://www.w3.org/2000/svg','g');
		this.radarText.appendChild(this.radarAltitudeLabel);
		this.radarText.appendChild(this.radarAltitude);
		this.radarText.appendChild(this.radarDistanceLabel);
		this.radarText.appendChild(this.radarDistance);		
		this.radarText.appendChild(this.radarRotationLabel);
		this.radarText.appendChild(this.radarRotation);
		this.radarText.appendChild(this.radarFuelLabel);
		this.radarText.appendChild(this.radarFuel);
		this.radar.appendChild(this.radarHorizon);
		this.radar.appendChild(this.radarPanel);
		this.radar.appendChild(this.radarText);

/*
		this.flare.setAttribute('href',vehicle.img.flare);
		this.flare.setAttribute('mix-blend-mode','darken');
		this.flare.setAttribute('opacity',0);
		this.flare.setAttribute('width',320);
*/
		this.radarHorizon.setAttribute('href',vehicle.img.radarHorizon);
		this.radarHorizon.setAttribute('width',640);
		this.radarPanel.setAttribute('href',vehicle.img.radarPanel);
		this.radarPanel.setAttribute('width',640);
				
		this.radarHorizon.setAttribute('y',-320);
		this.radarHorizon.setAttribute('x',-320);
		this.radarPanel.setAttribute('y',-320);
		this.radarPanel.setAttribute('x',-320);

		this.radarDistance.style.textAnchor = 'end';
		this.radarRotation.style.textAnchor = 'end';
		this.radarAltitude.style.textAnchor = 'end';
		this.radarFuel.style.textAnchor = 'end';

		this.radarDistance.setAttribute('x',320);
		this.radarRotation.setAttribute('x',320);
		this.radarAltitude.setAttribute('x',320);
		this.radarFuel.setAttribute('x',320);

		this.radarText.setAttribute('x',-320);
		this.radarText.setAttribute('y',450);
		this.radarText.style.fill = 'white';
		this.radarText.style.fontSize = 120;

		this.radarDistanceLabel.setAttribute('x',-320);
		this.radarDistanceLabel.setAttribute('dy','1.2em');
		this.radarRotationLabel.setAttribute('x',-320);
		this.radarRotationLabel.setAttribute('dy','1.2em');
		this.radarFuelLabel.setAttribute('x',-320);
		this.radarFuelLabel.setAttribute('dy','1.2em');
		this.radarAltitudeLabel.innerHTML = "Alt :";
		this.radarDistanceLabel.innerHTML = "Dist:";
		this.radarRotationLabel.innerHTML = "Rot :";
		this.radarFuelLabel.innerHTML = "Fuel:";
		this.radar.setAttribute('transform','translate(0,-1800)');

		this.introImage.setAttribute('href','image/intro.png');
		this.introImage.setAttribute('x','-1600');
		this.introImage.setAttribute('y','-3400');
		this.introImage.setAttribute('width','3200');
		this.introImage.setAttribute('height','1800');

		this.intro.setAttribute('y','-400');
		this.intro.innerHTML = "Fly using arrow-keys.";
		this.intro.style.fill = 'white';
		this.intro.style.fontSize = '120';
		this.intro.style.textAnchor = 'middle';

		this.spacebar.setAttribute('y','-400');
		this.spacebar.innerHTML = "Press spacebar... SPACE-bar.";
		this.spacebar.style.visibility = 'hidden';
		this.spacebar.style.fill = 'white';
		this.spacebar.style.fontSize = '120';
		this.spacebar.style.textAnchor = 'middle';

		this.difficultyText.setAttribute('y','-700');
		this.difficultyText.style.visibility = 'hidden';
		this.difficultyText.style.fill = 'white';
		this.difficultyText.style.fontSize = '120';
		this.difficultyText.style.textAnchor = 'middle';

		// Vehicle-logic
		this.spacecraft = document.createElementNS('http://www.w3.org/2000/svg','image');
		this.forward = document.createElementNS('http://www.w3.org/2000/svg','image');
		this.left = document.createElementNS('http://www.w3.org/2000/svg','image');
		this.right = document.createElementNS('http://www.w3.org/2000/svg','image');
		this.legs = document.createElementNS('http://www.w3.org/2000/svg','image');
		this.meter = document.createElementNS('http://www.w3.org/2000/svg','rect');
		this.fuel = document.createElementNS('http://www.w3.org/2000/svg','rect');

		this.restart(); // Contains initial values.

		this.spacecraft.setAttribute('href',vehicle.img.vehicle);
		this.spacecraft.id = 'spacecraft';
		this.spacecraft.setAttribute('x',-vehicle.width*5);
		this.spacecraft.setAttribute('width',this.zoom);
		this.spacecraft.setAttribute('height',this.zoom);

		this.forward.setAttribute('href',vehicle.img.forward);
		this.forward.id = 'forward';
		this.forward.setAttribute('x',-vehicle.width*5);
		this.forward.setAttribute('width',this.zoom);
		this.forward.setAttribute('height',this.zoom);
		this.forward.setAttribute('opacity',0);

		this.left.setAttribute('href',vehicle.img.left);
		this.left.id = 'left';
		this.left.setAttribute('x',-vehicle.width*5);
		this.left.setAttribute('width',this.zoom);
		this.left.setAttribute('height',this.zoom);
		this.left.setAttribute('opacity',0);

		this.right.setAttribute('href',vehicle.img.right);
		this.right.id = 'right';
		this.right.setAttribute('x',-vehicle.width*5);
		this.right.setAttribute('width',this.zoom);
		this.right.setAttribute('height',this.zoom);
		this.right.setAttribute('opacity',0);

		this.legs.setAttribute('href',vehicle.img.landing);
		this.legs.setAttribute('x',-vehicle.width*5);
		this.legs.setAttribute('width',this.zoom);
		this.legs.setAttribute('height',this.zoom);

		this.meter.setAttribute('y',-60);
		this.meter.setAttribute('x',-vehicle.width*5);
		this.meter.setAttribute('width',vehicle.width*10);
		this.meter.setAttribute('height',10);
		this.meter.setAttribute('fill',"rgba(0,0,0,0.5)");

		this.fuel.setAttribute('x',-vehicle.width*5);
		this.fuel.setAttribute('y',-60);
		this.fuel.setAttribute('height',10);
		this.fuel.setAttribute('fill',"rgb(127,192,255)");

		this.whole.appendChild(this.spacecraft);
		this.whole.appendChild(this.left);
		this.whole.appendChild(this.right);
		this.whole.appendChild(this.forward);
		this.whole.appendChild(this.legs);

		this.svg.appendChild(this.meter);
		this.svg.appendChild(this.fuel);
		this.svg.insertBefore(this.intro,this.front);
		this.svg.insertBefore(this.introImage,this.front);
		this.svg.insertBefore(this.whole,this.front);

		this.svg.appendChild(this.spacebar);
		this.svg.appendChild(this.difficultyText);
		this.svg.appendChild(this.radar);
//		this.svg.appendChild(this.flare);
	}
	restart() {

		// Testing mode.
		if (this.difficulty == -1) {
			this.x = 0;
			this.y = -130;
			this.landing = true;
			this.legs.setAttribute('opacity',1);
			level.burst = 240;
			this.introImage.style.visibility = 'initial';
			this.intro.style.visibility = 'initial';
			this.rotation = 0;
			this.rotationD = 0;
			this.vector = Object();
			this.vector.x = 0;
			this.vector.y = 0;
		} else {
			this.x = this.difficulty*Math.random()*200;
			this.y = -(800+this.difficulty*400);
			this.landing = false;		// Is the player landing?
			this.legs.setAttribute('opacity',0);
			level.burst = 20+(this.difficulty+1)*40;
			this.introImage.style.visibility = 'hidden';
			this.intro.style.visibility = 'hidden';
			this.rotation = this.difficulty*Math.random()*Math.PI/10;
			this.rotationD =this.difficulty*(Math.sin(Math.random()-0.5)/20);
			this.vector = Object();
			this.vector.x = this.difficulty*Math.sin(Math.random()-0.5)*5;
			this.vector.y = this.difficulty*Math.sin(Math.random()-0.8)*5;
			sfx.begin();
		}


		// Game-logic
		this.buttonPressed = false;	// The player can press only one button at a time.
		this.dead = false;		// Is the player dead?
		this.finished = false;		// Is the game finished?
		this.success = false;		// Is the game succesfully finished?

		// Drawing-logic
		this.zoom = 160;						// Relative pixel-size. This should become obsolete soon.
		this.velocity = 0;
		this.whole.style.visibility = "initial";
		this.meter.style.visibility = "initial";
		this.fuel.style.visibility = "initial";
		this.spacebar.style.visibility = 'hidden';
		this.difficultyText.style.visibility = 'hidden';
	}
}
// Drawing
function nextFrame() {
	if(!game.finished) {
		game.velocity=Math.sqrt(Math.pow(game.vector.x,2)+Math.pow(game.vector.y,2));
		game.rotation+=game.rotationD;
		game.vector.y+=level.gravity;
		game.x+=game.vector.x;
		game.y+=game.vector.y;
		if ( game.difficulty == -1) {
			if ( game.y < -7000 ) {
				game.intro.innerHTML = 'To start the game; press ENTER.';
			} else if ( game.y < -3200 ) {
				game.intro.innerHTML = 'You can navigate using your radar.';
			} else if ( game.y < -1700 ) {
				game.intro.innerHTML = 'You can switch spacecraft during flight.';
			} else if ( game.y < -850 ) {
				game.intro.innerHTML = 'Try to touch the sky!';
			}
		}
		if ( game.y < -400 || game.velocity > 3 || !(game.x > -level.landingspace && game.x < level.landingspace ) || Math.cos(game.rotation) < 0.9 ) {
			if (!game.finished && !game.dead) {
				alarm.style.fill = "rgb(255,0,0)";
			}
			if (game.y > -60 && !(game.x > -level.landingspace && game.x < level.landingspace ) && !game.finished) {
				game.dead = true;
				game.losses++;
				sfx.dead();
				game.finished = true;
				game.whole.style.visibility = "hidden";
				game.meter.style.visibility = "hidden";
				game.fuel.style.visibility = "hidden";
				game.introImage.style.visibility = 'hidden';
				game.intro.style.visibility = 'hidden';
				game.spacebar.style.visibility = 'initial';
			} else if (game.y > -130 && (game.x > -level.landingspace && game.x < level.landingspace ) && !game.finished) {
				game.dead = true;
				game.losses++;
				sfx.dead();
				game.finished = true;
				game.whole.style.visibility = "hidden";
				game.meter.style.visibility = "hidden";
				game.fuel.style.visibility = "hidden";
				game.introImage.style.visibility = 'hidden';
				game.intro.style.visibility = 'hidden';
				game.spacebar.style.visibility = 'initial';
			}
		} else {
			game.alarm.style.fill = "rgb(0,255,0)";

			if(!game.landing) {
				game.landing = true;
				sfx.gear();
				game.legs.setAttribute('opacity',1);
			}
			if (game.y > -130) {
				game.finished = true;
				if (!game.success && game.difficulty > -1) {
					game.success = true;
					game.wins++;
					game.difficultyText.style.visibility = 'initial';
					game.difficultyText.innerHTML = "Completed Difficulty: "+(10*game.difficulty).toFixed(0);;
					game.difficulty += 0.1;
					sfx.success();
					game.spacebar.style.visibility = 'initial';
				}
				game.alarm.style.fill = "rgb(255,255,0)";
				game.rotation=0;
				//game.y=-130;
				game.whole.setAttribute('transform',
					'translate('+game.x+','+-130.1+') ' 
					+ 'rotate(0,'+game.zoom/2+','+game.zoom/4+')');
			}
		}

		var scale = 1;
		scale = scale > game.x/500? scale : 2;
		scale = scale > -(game.x/500)? scale : 2;
		scale = scale > game.y/100? scale : 2;
		scale = scale > -(game.y/700)? scale : 2;
		scale = scale > game.x/700? scale : 4;
		scale = scale > -(game.x/700)? scale : 4;
		scale = scale > game.y/200? scale : 4;
		scale = scale > -(game.y/800)? scale : 4;
		game.svg.setAttribute('viewBox',
			scale*-800 + " " +
			scale*-850 + " " +
			scale*1600 + " " +
			scale*900 );

		game.whole.setAttribute('transform',
			'translate('+game.x+','+game.y+') ' 
			+ 'rotate('+game.rotation*(180/Math.PI)+','+0+','+vehicle.height*2.5+')');
//		game.flare.setAttribute('transform',
//			'translate('+(-game.x)+','+((-900*scale)-game.y)+')');
		game.meter.setAttribute('transform',
			'translate('+game.x+','+game.y+')');
		game.fuel.setAttribute('transform',
			'translate('+game.x+','+game.y+')');
		if (game.x<-3200||game.x>3200||game.y>200||game.y<-3400) {
			game.radarAltitude.innerHTML = (-(game.y+60)).toFixed(0);
			game.radarDistance.innerHTML = game.x.toFixed(0);
			game.radarRotation.innerHTML = (game.rotationD*60).toFixed(1);
			game.radarFuel.innerHTML = (level.burst).toFixed(0);
			game.radar.style.display = 'initial';
			game.radarHorizon.setAttribute('transform',
			'rotate('+game.rotation*(180/Math.PI)+')');
		} else {
			game.radar.style.display = 'none';
		}

		game.fuel.setAttribute('width',level.burst*(2/3));
	}
	requestAnimationFrame(nextFrame);
}
function keyboard(event) {
	if (level.burst > 0 && !game.dead) {
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
//				game.flare.style.animation = "start 200ms";
			} else {
				game.forward.style.animation = "stop 200ms";
				game.buttonPressed = false;
//				game.flare.style.animation = "stop 200ms";
			}
		}
	}
	if (event.keyCode == 32) {
		game.restart();
	} else if (event.keyCode == 49) {
		vehicle.replace('classic');
		vehicle.power = 1;
	} else if (event.keyCode == 50) {
		vehicle.replace('emerald');
		vehicle.power = 2;
	} else if (event.keyCode == 51) {
		vehicle.replace('rose');
		vehicle.power = 0.5;
	} else if (event.keyCode == 13 && game.difficulty == -1) {
		game.difficulty = 0;
		game.restart();
	}
}

// Different control-options can call these functions.
function steer(direction) {
	level.burst -= vehicle.power;
	if (game.finished) {
		game.finished = false;
		game.landed = false;
	}
	sfx.burst();
	if (direction == 'left') {
		game.rotationD-=0.5*(Math.PI/180)*(vehicle.power/vehicle.weight);
		game.vector.x += Math.sin(game.rotation)*(vehicle.power/vehicle.weight)/2;
		game.vector.y -= Math.cos(game.rotation)*(vehicle.power/vehicle.weight)/2;
	}
	if (direction == 'right') {
		game.rotationD+=0.5*(Math.PI/180)*(vehicle.power/vehicle.weight);
		game.vector.x += Math.sin(game.rotation)*(vehicle.power/vehicle.weight)/2;
		game.vector.y -= Math.cos(game.rotation)*(vehicle.power/vehicle.weight)/2;
	}
	if (direction == 'forward') {
		level.burst -= vehicle.power;
		game.vector.x += Math.sin(game.rotation)*(vehicle.power/vehicle.weight);
		game.vector.y -= Math.cos(game.rotation)*(vehicle.power/vehicle.weight);
	}
}

// Listen for keyboard actions and call keyboard();
addEventListener("keydown", keyboard);
addEventListener("keyup", keyboard);
