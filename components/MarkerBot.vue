<template>
    <gmap-marker
        :position="position"
        :clickable="true"
        :draggable="false"
        @click="e=>console.log(e)"
    />
</template>

<script>
module.exports = {
    props: {
        energy:{
            type:Number,
            require: false,
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
        
    },
    methods:{
        update( ) {
            let energy_required = getRandomInteger( 10, 30 );
            if( energy_required < this.energy ){
                this.energy -= energy_required;
                this.move( getRandomInteger( 1, 5 )/100 );
            }
            else {
                this.chargeEnergy( );
            }
        },
        move( distance ){
            let x = this.position.lng;
            let y = this.position.lat;
            let x1 = this.meta.lng;
            let y1 = this.meta.lat;
            let angle = Math.atan2( y1-y, x1-x );
            this.position.lat += distance*Math.sin(angle);
            this.position.lng += distance*Math.cos(angle);
            
            if ( distanceBetweenPoints( {x,y}, {x1,y1} ) ) {

            }
        },
        chargeEnergy( ) {
            this.stopMove( ) ;
            setTimeout( _ => {
                this.energy = 100
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