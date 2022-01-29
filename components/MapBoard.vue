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
                    :position="center"
                    :clickable="true"
                    :draggable="true"
                    @click="e=>console.log(e)"
                />

                <gmap-marker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    :clickable="true"
                    :draggable="true"
                    @click="center=m.position"
                />
            </gmap-map>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    label="Latitude"
                    type="Number"
                    v-model="position.lat"
                    step="0.000001"
                >
                </v-text-field>
            </v-col>
            <v-col>
                <v-text-field
                    label="Longitude"
                    type="Number"
                    v-model="position.lng"
                    step="0.000001"
                >
                </v-text-field>
            </v-col>
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
        markers: {
            type: Array,
            require: true
        }
    },
    data(){
        return {
            position: {
                lat: 10.5004352,
                lng: -66.9511459
            },
        }
    },
    created() {
        
    },
    methods:{
        click() {
            let map = this.$refs.ref;
            console.log(map)
            //console.log(map.finalLat,map.finalLng)
            //console.log(this.center.lat, this.center.lng)
        }
    }
}
</script>

<style>

</style>