window.getRandomInteger = ( min, max ) => {
    return Math.round( Math.random( )*( max - min ) + min );
}

window.distanceBetweenPoints = ( {x1,y1}, {x2,y2} ) => {
    return Math.sqrt( (x2-x1)**2 + (y2-y1)**2 );
}