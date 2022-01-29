<template>
    <v-card
        :height="height"
        
    >
        <v-card-title>
            Bots
        </v-card-title>
        <v-card-content>
            <v-data-table
                :items="bots"
                item-text="name"
                :headers="headers"
                hide-default-footer
                style="text-align:center;"
            ></v-data-table>

        </v-card-content>
        <v-card-actions>

        </v-card-actions>
    </v-card>
</template>

<script>
module.exports = {
    props:{
        height: {
            type: Number,
            require: false
        },
        center: {
            type:Object,
            require: true
        },
        bots:{
            type:Object,
            require: true
        }
    },
    computed: {
        latMax: {
            get(){
                return this.center.lat + this.lat/12;
                
            }
        },
        latMin: {
            get(){
                return this.center.lat - this.lat/12;
            }
        },
        lngMax: {
            get(){
                return this.center.lng + this.lng/12;
            }
        },
        lngMin: {
            get(){
                return this.center.lng - this.lng/12;
            }
        }
    },
    data(){
        return {
            lat: 0.000000000005,
            lng: 0.000000000005,
            headers: [
                { value: "name", text: "Nombre"},
                { value: "distance", text: "Distancia"},
                { value: "moves", text: "Energia" },
                { value: "action", text: "Accion" }
            ]
        }
    },
    created(){
        console.log( this.center )
        const countBots = Math.floor(Math.random() * ((10+1)-5)+5);
        for(let i = 0; i < countBots; i++ ) {
            this.bots.push({
                name: "Bot "+(i+1),
                energy: 100,
                position: {
                    lat: Math.random()*( (this.latMax + 1) - this.latMin  ) + this.latMax,
                    lng: Math.random()*( (this.lngMax + 1) - this.lngMin  ) + this.lngMax
                }
                
            })
        }
        console.log( this.bots )
    }
}
</script>

<style>

</style>