function Hands()
{
	this.angle = 0;
	this.beginX = 0;
	this.beginY = 0;
	this.endX = 0;
	this.endY = 0;
	this.radius = 0;
	this.length = 0;
	this.modLength = 0;
	this.color = '';
	this.lineCap = '';
	this.lineWidth = 0;
	this.rotation = ( Math.PI * 2 ) / 4;
	
	this.draw = function(ctx)
	{
		this.length = this.radius - this.modLength;
		
		this.endX = this.beginX + Math.cos( this.angle - this.rotation ) * this.length;
		this.endY = this.beginY + Math.sin( this.angle - this.rotation ) * this.length;
		
		ctx.beginPath();
		ctx.moveTo( this.beginX, this.beginY );
		ctx.lineWidth = this.lineWidth;
		ctx.strokeStyle = this.color;
		ctx.lineCap = this.lineCap;
		ctx.lineTo( this.endX, this.endY );
		ctx.stroke();
	};
}

function AnalogClock()
{
	this.canvas = document.getElementById( "clockface" );
	this.context = this.canvas.getContext('2d');
	
	this.margin = 30;
	this.rotation = (Math.PI * 2) / 4; // Rotate 0 rad to be at top of circle
	this.centerX = this.canvas.width / 2;
	this.centerY = this.canvas.height / 2;
	
	this.secondHand = new Hands(this.canvas);
	this.secondHand.lineWidth = 16;
	this.secondHand.modLength = 175;
	this.secondHand.beginX = this.centerX;
	this.secondHand.beginY = this.centerY;
	this.secondHand.radius = this.canvas.height / 2.031;
	
	this.minuteHand = new Hands(this.canvas);
	this.minuteHand.lineWidth = 10;
	this.minuteHand.modLength = 100;
	this.minuteHand.beginX = this.centerX;
	this.minuteHand.beginY = this.centerY;
	this.minuteHand.radius = this.canvas.height / 2.031;
	
	this.hourHand = new Hands(this.canvas);
	this.hourHand.lineWidth = 3;
	this.hourHand.modLength = 100;
	this.hourHand.beginX = this.centerX;
	this.hourHand.beginY = this.centerY;
	this.hourHand.radius = this.canvas.height / 2.031;
	
	this.resizeCanvas = function()
	{
		this.canvas.width  = window.innerWidth  - this.margin;
		this.canvas.height = window.innerHeight - this.margin;
	};
	
	this.drawSecondHand = function( s )
	{
		this.secondHand.angle = ( Math.PI * 2 ) * ( s / 60 );
		this.secondHand.draw( this.context() );
	};
	
	this.drawMinuteHand = function( m )
	{
		this.minuteHand.angle = ( Math.PI * 2 ) * ( m / 60 );
		this.minuteHand.draw( this.context() );
	};
	
	this.drawHourHand = function( h )
	{
		this.hourHand.angle = ( Math.PI * 2 ) * ( h / 60 );
		this.hourHand.draw( this.context() );
	};
	
	this.drawDot = function( x, y, radius, radians, color )
	{
		this.context.beginPath();
		this.context.arc( x, y, radius, 0, Math.PI * 2, false );
		this.context.fillStyle = color;
		this.context.fill();
	};
	
	this.drawClockFace = function()
	{
		var distance = this.centerY - 80;
		
		for( i = 0; i < 60; i++ )
		{
			var targetX = this.centerX + Math.cos( ( ( Math.PI * 2 ) * ( i / 60 ) ) - this.rotation ) * distance;
			var targetY = this.centerY + Math.sin( ( ( Math.PI * 2 ) * ( i / 60 ) ) - this.rotation ) * distance;
			
			this.drawDot( targetX, targetY, 3, this.minuteHand.color);
		}
		
		for( i = 0; i < 12; i++ )
		{
			var targetX = this.centerX + Math.cos( ( ( Math.PI * 2 ) * ( i / 12 ) ) - this.rotation ) * distance;
			var targetY = this.centerY + Math.sin( ( ( Math.PI * 2 ) * ( i / 12 ) ) - this.rotation ) * distance;
			
			this.drawDot( targetX, targetY, 8, this.hourHand.color );
		}
	};
	
	this.draw = function() 
	{
		var now = new Date();
		
		this.resizeCanvas();
		this.drawClockFace();
		this.drawHourHand( now.getHours() );
		this.drawMinuteHand( now.getMinutes() );
		this.drawSecondHand( now.getSeconds() );
		
		this.drawDot( this.centerX, this.centerY, 10, this.secondHand.color ); // Center dot
	};
}


/******** 
LOAD APP
*********/

// ctx.translate(0.5, 0.5); // Anti-aliasing

var analogClock = new AnalogClock();

function tick()
{
	setInterval( analogClock.draw, 1000 );
	analogClock.draw();
}

window.addEventListener("load", function(){ tick(); });