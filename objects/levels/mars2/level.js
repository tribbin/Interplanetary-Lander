level.landingspace = 600;
level.gravity = 0.05; // The gravity on the planet.
level.burst = 160; // The amount of fuel-burst that are available.
level.viewbox = '-3200 -3400 6400 3600';
var background = document.createElementNS('http://www.w3.org/2000/svg','image');
var back = document.createElementNS('http://www.w3.org/2000/svg','rect');
var front = document.createElementNS('http://www.w3.org/2000/svg','rect');
var concrete = document.createElementNS('http://www.w3.org/2000/svg','rect');
var concreteTop = document.createElementNS('http://www.w3.org/2000/svg','rect');
var concreteTopFront = document.createElementNS('http://www.w3.org/2000/svg','rect');
var alarm = document.createElementNS('http://www.w3.org/2000/svg','rect');
background.setAttribute('href',level.img.background);
background.setAttribute('x',-3200);
background.setAttribute('y',-3400);
background.setAttribute('width',6400);
background.setAttribute('height',3600);
alarm.id = 'alarm';
front.id = 'front';

back.setAttribute(
	"x","-800"
);
back.setAttribute(
	"y","-10"
);
back.setAttribute(
	"width","1600"
);
back.setAttribute(
	"height","80"
);
back.setAttribute(
	"fill","rgb(60,20,20)"
);

front.setAttribute(
	"x","-800"
);
front.setAttribute(
	"y","70"
);
front.setAttribute(
	"width","1600"
);
front.setAttribute(
	"height","390"
);
front.setAttribute(
	"fill","rgb(50,10,10)"
);

concreteTop.setAttribute(
	"x","-600"
);
concreteTop.setAttribute(
	"y","-20"
);
concreteTop.setAttribute(
	"width","1200"
);
concreteTop.setAttribute(
	"height","50"
);
concreteTop.setAttribute(
	"fill","rgb(120,120,120)"
);

concreteTopFront.setAttribute(
	"x","-600"
);
concreteTopFront.setAttribute(
	"y","0"
);
concreteTopFront.setAttribute(
	"width","1200"
);
concreteTopFront.setAttribute(
	"height","20"
);
concreteTopFront.setAttribute(
	"fill","rgb(120,120,120)"
);

concrete.setAttribute(
	"x","-600"
);
concrete.setAttribute(
	"y","20"
);
concrete.setAttribute(
	"width","1200"
);
concrete.setAttribute(
	"height","30"
);
concrete.setAttribute(
	"fill","rgb(50,50,50)"
);

alarm.setAttribute(
	"x","-590"
);
alarm.setAttribute(
	"y","30"
);
alarm.setAttribute(
	"width","1180"
);
alarm.setAttribute(
	"height","10"
);

document.getElementById('lander').appendChild(background);
document.getElementById('lander').appendChild(back);
document.getElementById('lander').appendChild(concreteTop);
document.getElementById('lander').appendChild(front);
document.getElementById('lander').appendChild(concreteTopFront);
document.getElementById('lander').appendChild(concrete);
document.getElementById('lander').appendChild(alarm);
