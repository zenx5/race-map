<template>
    <gmap-marker
        :position="position"
        :clickable="true"
        :draggable="false"
    />
</template>

<script>
module.exports = {
    props: {
        energy:{
            type:Number,
            require: true,
            default: 0
        },
        meta: {
            type:Object,
            require: true
        },
        position: {
            type:Object,
            require: true
        }
    },
    data(){
        return {
            interval: null
        }
    },
    created(){
        this.initMove( );
    },
    destroyed( ) {
        this.stopMove( );
    },
    methods:{
        update( ) {
            let energy_required = getRandomInteger( 10, 30 );
            if( energy_required < this.energy ){
                this.energy -= energy_required;
                this.move( getRandomInteger( 1, 5 ) );
            }
            else {
                this.chargeEnergy( );
            }
        },
        move( distance ){
            let x1 = this.position.lng;
            let y1 = this.position.lat;
            let x2 = this.meta.lng;
            let y2 = this.meta.lat;
            let angle = Math.atan2( y2-y1, x2-x1 );
            this.position.lat += distance*Math.sin(angle);
            this.position.lng += distance*Math.cos(angle);
            if ( distanceBetweenPoints( {x1,y1}, {x2,y2} ) ) {

            }
        },
        chargeEnergy( ) {
            this.stopMove( ) ;
            setTimeout( _ => {
                this.energy = 100;
                this.interval = initMove( );
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