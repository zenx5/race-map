<template>
    <gmap-marker
        :position="bot.position"
        :clickable="true"
        :draggable="false"
        @click="e=>console.log(e)"
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
        
        this.initMove( );
    },
    destroyed( ) {
        
    },
    methods:{
        update( ) {
            if( this.bot.distance <= 0.01 ){ 
                this.bot.style = "completed";
                this.bot.styleNum = 0
                return;
            }
            let energy_required = getRandomInteger( 10, 30 );
            if( energy_required < this.bot.energy ){
                this.bot.energy -= energy_required;
                this.move( getRandomInteger( 1, 5 )/100 );
            }
            else{
                this.bot.style = "charging";
                this.bot.styleNum = 3
                this.chargeEnergy( );
            }
        },
        move( distance ){
            let x = this.bot.position.lng;
            let y = this.bot.position.lat;
            let x1 = this.meta.lng;
            let y1 = this.meta.lat;
            let angle = Math.atan2( y1-y, x1-x );
            this.bot.position.lat += distance*Math.sin(angle);
            this.bot.position.lng += distance*Math.cos(angle);
            this.bot.distance = Math.pow(  Math.pow(y1 - y,2) + Math.pow(x1 - x,2) , 0.5 );
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
            clearInterval( this.interval );
        },
        win( ) {

        }
        
    }

}
</script>

<style scoped>

</style>