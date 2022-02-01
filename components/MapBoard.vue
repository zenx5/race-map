<template>
    <span>
        <v-row>
            <gmap-map
                ref="ref"
                :center="center"
                :zoom="zoom"
                map-type-id="terrain"
                :style="'width: '+width+'px; height: '+height+'px'"
                @click="click"
                >
                
                <gmap-marker
                    ref="meta"
                    :position="meta2"
                    icon="src/img/meta2.png"
                    :clickable="false"
                    :draggable="false"
                    
                />
                
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
            },
            meta2: {
                lat: 0,
                lng: 0
            },
        }
    },
    created() {
        this.meta2 = this.meta
    },
    methods:{
        click(ev) {
            this.meta2.lat = ev.latLng.lat();
            this.meta2.lng = ev.latLng.lng();
            //this.$emit('changemeta', ev )
        }
    }
}
</script>

<style>

</style>