class Bot {

    

    constructor(name,options) {
        this.name = name;
        this.style = 'active';
        this.styleNum = 1;
        this.icons = {
            first: 'src/img/botfirst.png',
            last: 'src/img/botlast.png',
            default: 'src/img/botdefault.png'
        }
        this.icon = 'default'
        this.distance = Infinity;
        this.countCharge = 0;
        this.energy = options.energy ?? 100;
        this.meta = {
            lat: 0,
            lng: 0
        };
        this.position = {
            lat: getRandomReal( options.latMin, options.latMax ),
            lng: getRandomReal( options.lngMin, options.lngMax )
        };

    }
    setIcon(icon){
        if( ['first','last','default'].indexOf(icon) == -1 ){
            this.icon = 'default';
        }else{
            this.icon = icon;
        }
        
    }
    getIcon(){
        return this.icons[ this.icon ];
    }

    setMeta( lat, lng ) {
        this.meta.lat = lat; 
        this.meta.lng = lng;
    }

    getRandomInteger( min, max ) {
        return Math.round( this.getRandomReal( min, max) );
    }

    getRandomReal( min, max ) {
        return Math.random( )*( max - min ) + min;
    }
    
    update( ) {
        switch(this.style){
            case 'completed': return;
            case 'active':
                if( this.distance <= 20 ){ 
                    this.style = "completed";
                    this.styleNum = 0
                    return;
                }
                let energy_required = this.getRandomInteger( 10, 30 );
                if( energy_required < this.energy ){
                    this.energy -= energy_required;
                    this.move( this.getRandomReal( 1, 2 ) );
                }else{
                    this.style = "charging";
                    this.styleNum = 2
                    this.countCharge = 0;
                }
                break;
            case 'charging':
                this.countCharge++;
                if( this.distance <= 20 ){ 
                    this.style = "completed";
                    this.styleNum = 0
                    return;
                }else if( this.countCharge == 6 ) {
                    this.style = 'active';
                    this.styleNum = 1;
                    this.energy = 100;
                }
                break;
        }
    }

    move( xG ){
        let x = this.position.lng;
        let y = this.position.lat;
        let x1 = this.meta.lng;
        let y1 = this.meta.lat;
        let angle = Math.atan2( y1-y, x1-x );
        this.position.lat += xG*0.000318*Math.sin(angle);  //0.000318 equivale a 50mts
        this.position.lng += xG*0.000318*Math.cos(angle);
        this.distance = this.getDistance(x,y,x1,y1,'M');
    }

    getDistance(fromLng, fromLat, toLng, toLat, unit = ''){
        //Calculate distance from latitude and longitude
        let theta = fromLng - toLng;
        //let dist = sin(deg2rad(latitudeFrom)) * sin(deg2rad(latitudeTo)) +  cos(deg2rad(latitudeFrom)) * cos(deg2rad(latitudeTo)) * cos(deg2rad(theta));
        let dist = Math.sin(deg2rad(fromLat)) * Math.sin(deg2rad(toLat)) +  Math.cos(deg2rad(fromLat)) * Math.cos(deg2rad(toLat)) * Math.cos(deg2rad(theta));
        dist = rad2deg( Math.acos(dist) );
        let miles = dist * 60 * 1.1515;            
        if (unit.toUpperCase() == "K") {
            return (miles * 1.609344);//+' km';
        } else if (unit.toUpperCase() == "M") {
            return (miles * 1609.344);//+' m';
        } else if (unit.toUpperCase() == "N") {
            return (miles * 0.8684);//+' nm';
        } else {
            return miles; //+' mi';
        }
    }


}