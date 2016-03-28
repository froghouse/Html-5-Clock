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
	
	this.draw = function( ctx )
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
	this.context = this.canvas.getContext( '2d' );
	
	this.margin = 30;
	this.rotation = ( Math.PI * 2 ) / 4; // Rotate 0 rad to be at top of circle
	this.centerX = this.canvas.width / 2;
	this.centerY = this.canvas.height / 2;
	
	this.secondHand = new Hands();
	this.secondHand.lineWidth = 3;
	this.secondHand.modLength = 100;
	this.secondHand.color = '#ff0000';
	this.secondHand.lineCap = "round";
	this.secondHand.radius = this.canvas.height / 2.031;
	
	this.minuteHand = new Hands();
	this.minuteHand.lineWidth = 10;
	this.minuteHand.modLength = 100;
	this.minuteHand.color = '#101010';
	this.minuteHand.lineCap = "round";
	this.minuteHand.radius = this.canvas.height / 2.031;
	
	this.hourHand = new Hands();
	this.hourHand.lineWidth = 16;
	this.hourHand.modLength = 175;
	this.hourHand.color = '#101010';
	this.hourHand.lineCap = "round";
	this.hourHand.radius = this.canvas.height / 2.031;
	
	this.drawSecondHand = function( s )
	{
		this.secondHand.angle = ( Math.PI * 2 ) * ( s / 60 );
		this.secondHand.draw( this.context );
	};
	
	this.drawMinuteHand = function( m )
	{
		this.minuteHand.angle = ( Math.PI * 2 ) * ( m / 60 );
		this.minuteHand.draw( this.context );
	};
	
	this.drawHourHand = function( h )
	{
		this.hourHand.angle = ( Math.PI * 2 ) * ( h / 12 );
		this.hourHand.draw( this.context );
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
	
	this.clearCanvas = function()
	{
		this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
	}
	
	this.draw = function() 
	{
		var now = new Date();
		
		this.clearCanvas();
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

var canvas = document.getElementById( "clockface" );

var analogClock = new AnalogClock();

function tick() {
    window.requestAnimationFrame( function() { 
		analogClock.draw(); 
	} );
    setTimeout( tick, 1000 );
}

window.addEventListener( "load", function() {
    canvas.width = window.innerWidth - 30;
	canvas.height = window.innerHeight - 30;
	
	analogClock.centerX = canvas.width / 2;
	analogClock.centerY = canvas.height / 2;
	analogClock.radius = canvas.height / 2.031;
	
	analogClock.secondHand.beginX = analogClock.centerX;
	analogClock.secondHand.beginY = analogClock.centerY;
	analogClock.secondHand.radius = analogClock.radius;
	analogClock.minuteHand.beginX = analogClock.centerX;
	analogClock.minuteHand.beginY = analogClock.centerY;
	analogClock.minuteHand.radius = analogClock.radius;
	analogClock.hourHand.beginX = analogClock.centerX;
	analogClock.hourHand.beginY = analogClock.centerY;
	analogClock.hourHand.radius = analogClock.radius;
	
	tick();
} );

window.addEventListener( "resize", function() {
	canvas.width = window.innerWidth - 30;
	canvas.height = window.innerHeight - 30;
	
	analogClock.centerX = canvas.width / 2;
	analogClock.centerY = canvas.height / 2;
	analogClock.radius = canvas.height / 2.031;
	
	analogClock.secondHand.beginX = analogClock.centerX;
	analogClock.secondHand.beginY = analogClock.centerY;
	analogClock.secondHand.radius = analogClock.radius;
	analogClock.minuteHand.beginX = analogClock.centerX;
	analogClock.minuteHand.beginY = analogClock.centerY;
	analogClock.minuteHand.radius = analogClock.radius;
	analogClock.hourHand.beginX = analogClock.centerX;
	analogClock.hourHand.beginY = analogClock.centerY;
	analogClock.hourHand.radius = analogClock.radius;
} );