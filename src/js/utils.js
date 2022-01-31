window.getRandomInteger = ( min, max ) => {
    return Math.round( Math.random( )*( max - min ) + min );
}

window.getRandomReal = ( min, max ) => {
    return Math.random( )*( max - min ) + min;
}

window.distanceBetweenPoints = ( {x1,y1}, {x2,y2} ) => {
    return Math.sqrt( (x2-x1)**2 + (y2-y1)**2 );
}

function deg2rad( value ) {
	let Pi = Math.PI;
	return value*Pi/180;
}

function rad2deg( value ) {
	let Pi = Math.PI;
	return value*180/Pi;
}