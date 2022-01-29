<template>
    
</template>

<script>
module.exports = {
    props: {
        moves:{
            type:Number,
            require: true,
            default: 0
        }
    },
    data(){
        return {

        }
    },
    created(){

    },
    methods:{
        move(){
            let energy = Math.floor(Math.random() * ((30+1)-10)+10);
            if( energy > this.moves ){
                this.moves -= energy;

            }
        }
        
    }

}
</script>

<style scoped>

</style>