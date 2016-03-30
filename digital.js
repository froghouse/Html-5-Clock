function paddZero( i )
{
	if ( i < 10 )
		i = "0" + i;
	
	return i;
}

function getMonth( m )
{
	switch( m )
	{
		case 0:
			return "January";
			break;
		case 1:
			return "Feburary";
			break;
		case 2:
			return "March";
			break;
		case 3:
			return "April";
			break;
		case 4:
			return "May";
			break;
		case 5:
			return "June";
			break;
		case 6:
			return "July";
			break;
		case 7:
			return "August";
			break;
		case 8:
			return "September";
			break;
		case 9:
			return "October";
			break;
		case 10:
			return "November";
			break;
		case 11:
			return "December";
			break;
		default:
			return "This is not a month";
			break;
	}
}

function getDay( d )
{
	switch( d )
	{
		case 0:
			return "Sunday";
			break;
		case 1:
			return "Monday";
			break;
		case 2:
			return "Tuseday";
			break;
		case 3:
			return "Wednesday";
			break;
		case 4:
			return "Thursday";
			break;
		case 5:
			return "Friday";
			break;
		case 6:
			return "Saturday";
			break;
		default:
			return "Not a day";
			break;
	}
}

function numerate( d )
{
	switch( d )
	{
		case 1:
		case 21:
		case 31:
			return d + "<sup>st</sup>";
			break;
		case 2:
		case 22:
			return d + "<sup>nd</sup>";
			break;
		case 3:
			return d + "<sup>rd</sup>";
			break;
		default:
			return d + "<sup>th</sup>";
			break;
	}
}

function DigitalClock()
{
	this.now = new Date();
	
	this.hour   = paddZero(this.now.getHours());
	this.minute = paddZero(this.now.getMinutes());
	this.second = paddZero(this.now.getSeconds());
	
	this.year  = this.now.getFullYear();
	this.month = getMonth(this.now.getMonth());
	this.date  = numerate(this.now.getDate());
	this.day   = getDay(this.now.getDay());
	
	this.draw = function( time, date )
	{
		var showTime = document.getElementById( time );
		var showDate = document.getElementById( date );
		
		showTime.innerHTML = "" + this.hour + ":" + this.minute + ":" + this.second + "";
		showDate.innerHTML = "" + this.day + " the " + this.date + " of " + this.month + " " + this.year;
	}
}