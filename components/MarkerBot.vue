<template>
    
    <gmap-marker
        :position="bot.position"
        :icon="bot.getIcon()"
        :clickable="true"
        :draggable="false"
    >
    </gmap-marker>
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
        console.log("meta",this, this.setIcon)
        
    },
    destroyed( ) {
        
    },
    methods:{
        
    }

}
</script>

<style scoped>

</style>