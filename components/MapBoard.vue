<template>
    <gmap-map
        :center="center"
        :zoom="zoom"
        map-type-id="terrain"
        :style="'width: '+width+'px; height: '+height+'px'"
        >
        <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
        />
    </gmap-map>
  
</template>

<script>
module.exports = {
    props:{
        width: {
            type:Number,
            require:false,
            default:400
        },
        height: {
            type:Number,
            require:false,
            default:400
        },
        zoom: {
            type: Number,
            require: false,
            default: 7
        },
        center: {
            type: Object,
            require:true
        },
        markers: {
            type: Array,
            require: true
        }
    }
}
</script>

<style>

</style>