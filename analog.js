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

function AnalogClock( clockface )
{
	this.canvas = document.getElementById( clockface );
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
		var factor = 6 * ( Math.PI / 180 );
		this.secondHand.angle = factor * s;
		this.secondHand.draw( this.context );
	};
	
	this.drawMinuteHand = function( m )
	{
		var factor = 6 * ( Math.PI / 180 );
		this.minuteHand.angle = factor * m;
		this.minuteHand.draw( this.context );
	};
	
	this.drawHourHand = function( h, m )
	{
		var factor = 0.5 * ( Math.PI / 180 );
		this.hourHand.angle = factor * ( 60 * h + m );
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
		var factorMin = 6 * ( Math.PI / 180 );
		var factorHrs = 0.5 * ( Math.PI / 180 );
		
		for( i = 0; i < 60; i++ )
		{
			var targetX = this.centerX + Math.cos( ( factorMin * i ) - this.rotation ) * distance;
			var targetY = this.centerY + Math.sin( ( factorMin * i ) - this.rotation ) * distance;
			
			this.drawDot( targetX, targetY, 3, this.minuteHand.color);
		}
		
		for( i = 0; i < 12; i++ )
		{
			var targetX = this.centerX + Math.cos( ( factorHrs * ( 60 * i ) ) - this.rotation ) * distance;
			var targetY = this.centerY + Math.sin( ( factorHrs * ( 60 * i ) ) - this.rotation ) * distance;
			
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
		this.drawHourHand( now.getHours(), now.getMinutes() );
		this.drawMinuteHand( now.getMinutes() );
		this.drawSecondHand( now.getSeconds() );
		
		this.drawDot( this.centerX, this.centerY, 10, this.secondHand.color ); // Center dot
	};
}