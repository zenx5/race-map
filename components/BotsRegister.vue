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

    </v-card>
</template>

<script>
module.exports = {
    props:{
        height: {
            type: Number,
            require: false
        },
        latMax: {
            type: Number,
            require: true
        },
        latMin: {
            type: Number,
            require: true
        },
        lngMax: {
            type: Number,
            require: true
        },
        lngMin: {
            type: Number,
            require: true
        },
    },
    data(){
        return {
            headers: [
                { value: "name", text: "Nombre"},
                { value: "distance", text: "Distancia"},
                { value: "moves", text: "Energia" },
                { value: "action", text: "Accion" }
            ],
            bots: []
        }
    },
    created(){
        const countBots = Math.floor(Math.random() * ((10+1)-5)+5);
        for(let i = 0; i < countBots; i++ ) {
            this.bots.push({
                name: "Bot "+(i+1),
                moves: 100,
                lat: Math.random()*( (this.latMax + 1) - this.latMin  ) + this.latMax,
                lng: Math.random()*( (this.lngMax + 1) - this.lngMin  ) + this.lngMax
            })
        }
    }
}
</script>

<style>

</style>