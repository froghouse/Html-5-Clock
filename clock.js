var root = document.getElementById("root");
var clockface = document.getElementById("clockface");
var ctx = clockface.getContext('2d');
var tau = 2 * Math.PI;
var rotation = tau / 4;
var margin = 30;

function Hands() {
	this.angle = 0;
	this.beginX = clockface.width / 2;
	this.beginY = clockface.height / 2;
	this.endX = 0;
	this.endY = 0;
	this.radius = clockface.height / 2.031;
	this.length = 0;
	this.modLength = 0;
	this.color = 0;
	this.lineCap = "round";
	this.lineWidth = 10;
	this.draw = function() {
		this.length = this.radius - this.modLength;
		
		this.endX = this.beginX + Math.cos(this.angle - rotation) * this.length;
		this.endY = this.beginY + Math.sin(this.angle - rotation) * this.length;
		
		ctx.beginPath();
		ctx.moveTo(this.beginX, this.beginY);
		ctx.lineWidth = this.lineWidth;
		ctx.strokeStyle = this.color;
		ctx.lineCap = this.lineCap;
		ctx.lineTo(this.endX, this.endY);
		ctx.stroke();
	};
}

ctx.translate(0.5, 0.5); // Anti-aliasing

function clock_resize()
{
	clockface.width = window.innerWidth - margin;
	clockface.height = window.innerHeight - margin;
}

function draw_seconds(second)
{
	var second_hand = new Hands();
	second_hand.angle = tau * (second / 60);
	second_hand.lineWidth = 3;
	second_hand.color = 'red';
	second_hand.modLength = 100;
	
	second_hand.draw();
}

function draw_minutes(minute)
{
	var minute_hand = new Hands();
	minute_hand.angle = tau * (minute / 60);
	minute_hand.lineWidth = 10;
	minute_hand.color = '#101010';
	minute_hand.modLength = 100;
	
	minute_hand.draw();
}

function draw_hours(hour)
{
	var hour_hand = new Hands();
	hour_hand.angle = tau * (hour / 12);
	hour_hand.lineWidth = 16;
	hour_hand.color = '#101010';
	hour_hand.modLength = 175;
	
	hour_hand.draw();
}

function draw_middle()
{
	var centerX = clockface.width / 2;
	var centerY = clockface.height / 2;
	var radius = 10;
	
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, tau, false);
	ctx.fillStyle = '#ff0000';
	ctx.fill();
}

function draw_face()
{
	var centerX = clockface.width / 2;
	var centerY = clockface.height / 2;
	var distance = clockface.height / 2.031;
	distance -= 80;

	for(i = 0; i < 60; i++)
	{	
		var radius = 3;
		var radians = tau * (i / 60);
		var targetX = centerX + Math.cos(radians - rotation) * distance;
		var targetY = centerY + Math.sin(radians - rotation) * distance;
		
		ctx.beginPath();
		ctx.arc(targetX, targetY, radius, 0, tau, false);
		ctx.fillStyle = '#101010';
		ctx.fill();
	}
	
	for(i = 0; i < 12; i++)
	{	
		var radius = 8;
		var radians = tau * (i / 12);
		var targetX = centerX + Math.cos(radians - rotation) * distance;
		var targetY = centerY + Math.sin(radians - rotation) * distance;
		
		ctx.beginPath();
		ctx.arc(targetX, targetY, radius, 0, tau, false);
		ctx.fillStyle = '#101010';
		ctx.fill();
	}
}

function draw_clock()
{
	var now = new Date();
	
	clock_resize();
	
	draw_face();
	draw_hours(now.getHours());
	draw_minutes(now.getMinutes());
	draw_seconds(now.getSeconds());
	draw_middle();
}

function tick()
{
	setInterval(draw_clock, 1000);
	draw_clock();
}

window.addEventListener("load", function(){ tick(); });