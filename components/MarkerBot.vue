<template>
    <gmap-marker
        :position="bot.position"
        :clickable="true"
        :draggable="false"
    />
</template>

<script>
module.exports = {
    props: {
        meta: {
            type:Object,
            require: true
        },
        bot: {
            type: Object,
            require: true
        }
    },
    data(){
        return {
            interval: null,
            energy: 0,
            meta: {}
        }
    },
    created(){
        console.log("meta",this.meta)
        this.initMove( );
    },
    destroyed( ) {
        this.stopMove( );
    },
    methods:{
        update( ) {
            // console.log("update")
            if( this.bot.distance <= 0.05 ){ 
                this.bot.style = "completed";
                this.bot.styleNum = 0
                return;
            }
            let energy_required = getRandomInteger( 10, 30 );
            if( energy_required < this.bot.energy ){
                this.bot.energy -= energy_required;
                this.move( getRandomReal( 1, 2 ) );
            }
            else{
                this.bot.style = "charging";
                this.bot.styleNum = 3
                this.chargeEnergy( );
            }
        },
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
        },
        move( xG ){
            let x = this.bot.position.lng;
            let y = this.bot.position.lat;
            let x1 = this.meta.lng;
            let y1 = this.meta.lat;
            let angle = Math.atan2( y1-y, x1-x );
            this.bot.position.lat += xG*0.000318*Math.sin(angle);
            this.bot.position.lng += xG*0.000318*Math.cos(angle);
            this.bot.distance = this.getDistance(x,y,x1,y1,'M');
            if ( distanceBetweenPoints( {x,y}, {x1,y1} ) ) {

            }
        },
        chargeEnergy( ) {
            this.stopMove( );
            setTimeout( _ => {
                this.bot.energy = 100
                this.bot.style = "active"
                this.bot.styleNum = 1
                this.interval = this.initMove( );
                
            }, 6000 );
        },
        initMove( ) {
            this.interval = setInterval( _ => {
                this.update( );
            }, 1000 );
        },
        stopMove( ) {
            // console.log(this.interval)
            clearInterval( this.interval );
        },
        win( ) {

        }
        
    }

}
</script>

<style scoped>

</style>