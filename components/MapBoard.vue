<template>
    <span>
        <v-row>
            <gmap-map
                ref="ref"
                :center="center"
                :zoom="zoom"
                map-type-id="terrain"
                :style="'width: '+width+'px; height: '+height+'px'"
                @click="click()"
                >
                
                <gmap-marker
                    :position="meta"
                    :clickable="true"
                    :draggable="true"
                    @click="e=>console.log(e)"
                />
                <!-- 
                    zoom: 15 / width: 700 / height: 500
                    lng:
                        -0.015 => +0.015 :: 0.030
                    lat:
                        -0.0105 => +0.0105 :: 0.0210
                    div: 
                        20,000
                    
                    zoom: 7 / width: 700 / height: 500
                    lng:
                        -3.85 => +3.85 :: 7.70
                    lat:
                        -2.75 => +2.75 :: 5.50
                    div
                        100
                    
                    --->
                <!-- <gmap-marker
                    :position="{lat: meta.lat + 2.75, lng: meta.lng - 0.0 }"
                    :clickable="true"
                    :draggable="true"
                    @click="e=>console.log(e)"
                /> -->
                <marker-bot
                    :key="ind"
                    v-for="(bot, ind) in markers"
                    :bot="bot"
                    :meta="meta"
                    ></marker-bot>
            </gmap-map>
        </v-row>
    </span>
  
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
        meta: {
            type: Object,
            require:true
        },
        markers: {
            type: Array,
            require: true
        }
    },
    components:{
        'marker-bot': window.httpVueLoader('./components/MarkerBot.vue')
    },
    data(){
        return {
            position: {
                lat: 10.5004352,
                lng: -66.9511459
            }
        }
    },
    created() {
        
    },
    methods:{
        click() {
            let map = this.$refs.ref;
            console.log(smap)
            //console.log(map.finalLat,map.finalLng)
            //console.log(this.center.lat, this.center.lng)
        }
    }
}
</script>

<style>

</style>