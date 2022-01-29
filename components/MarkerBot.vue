<template>
    <div>

    </div>
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
        move(){
            let energy_required = this.getRandomInteger( 10, 30 );
            if( energy_required > this.energy ){
                this.energy -= energy;
            }
            else {
                this.chargeEnergy( );
            }
        },
        chargeEnergy( ) {
            this.stopMove( ) ;
            setTimeout( _ => {
                this.interval = initMove( );
            }, 6000 );
        },
        getRandomInteger( min, max ) {
        	return Math.round( Math.random( )*( max - min ) + min );
        },
        initMove( ) {
            this.interval = setInterval( _ => {
                this.move( );
            }, 1000 );
        },
        stopMove( ) {
            clearInterval( this.interval );
        }
        
    }

}
</script>

<style scoped>

</style>