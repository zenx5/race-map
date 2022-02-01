<template>
    <v-card
        :height="height"
        color="primary"
        
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
                :sort-by="['styleNum','name']">
                <template #item.name="{ item }">
                    <span :class="item.style">{{ item.name }}</span>
                </template>
                <template #item.position="{ item }">
                    <table>
                        <tr>
                            <th> Lat: </th>
                            <td> {{ item.position.lat | precition(5) }} </td>
                        </tr>
                        <tr>
                            <th> Lng: </th>
                            <td> {{ item.position.lng | precition(5) }} </td>
                        </tr>
                    </table>
                </template>
                <template #item.distance="{ item }">
                    {{ item.distance | decimal(2) }}
                </template>
                <template #item.energy="{ item }">
                    <span v-if="item.style=='charging'">
                        <small style="font-size:50%;">Charging...</small>
                        <v-progress-linear
                            indeterminate
                            height="4"  
                            rounded
                            color="#050"
                        ></v-progress-linear>
                    </span>
                    <span v-else>
                        {{ item.energy }}
                    </span>
                </template>
                <template #item.action="{item}">
                    <v-icon @click="deletebot(item.name)">mdi-delete</v-icon>
                </template>
            </v-data-table>
            
        </v-card-content>
        <v-card-actions>
            <text-field-action
                label="Nombre Bot"
                icon="mdi-plus"
                @click="value=>{createBot(value)}"
            ></text-field-action>
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
        },
        meta:{
            type:Object,
            require: true
        }
    },
    components:{
        'text-field-action' : window.httpVueLoader('./components/TextFieldAction.vue'),
    },
    filters: {
        precition: (value, fix)=>{
            return parseFloat( value.toPrecision(fix) );
        },
        decimal: (value, fix)=>{
            return parseFloat( value.toFixed(fix) ); return;
        }        
    },
    computed: {
        latMax: {
            get(){
                return this.center.lat + this.lat;
            }
        },
        latMin: {
            get(){
                return this.center.lat - this.lat;
            }
        },
        lngMax: {
            get(){
                return this.center.lng + this.lng;
            }
        },
        lngMin: {
            get(){
                return this.center.lng - this.lng;
            }
        }
    },
    data(){
        return {
            first: 0,
            last: 0,
            name: "",
            lat: 0.01,
            lng: 0.01,
            headers: [
                { value: "name", text: "Nombre"},
                { value: "position", text: "Posicion"},
                { value: "distance", text: "Distancia"},
                { value: "energy", text: "Energia" },
                { value: "action", text: "Accion" }
            ]
        }
    },
    created(){
        console.log( this.center )
        const countBots = Math.floor(Math.random() * ((10+1)-5)+5);
        for(let i = 0; i < countBots; i++ ) {
            this.name = "Bot "+(i+1);
            this.createBot()
        }
        this.name = ""
        console.log( this.bots )
        setInterval( _ => {
            let min = Infinity, max = 0;
            this.bots.forEach( (bot,ind) => {
                if( bot.distance > max ) {
                    max = bot.distance;
                    this.last = ind;
                }
                if( bot.distance < min ) {
                    min = bot.distance;
                    this.first = ind;
                }
                bot.setIcon();
            })
            this.bots[ this.first ].setIcon('first')
            this.bots[ this.last ].setIcon('last')
            this.bots.forEach( (bot) => {
                bot.setMeta( this.meta.lat, this.meta.lng )
                bot.update();        
            })
        }, 1000)
    },
    methods: {
        createBot(name){
            if(name == undefined) name = this.name;
            this.bots.push( new Bot(name, {
                energy: 100,
                latMin: this.latMin,
                latMax: this.latMax,
                lngMin: this.lngMin,
                lngMax: this.lngMax
            }) );
            // this.bots.push({
            //     name: name,
            //     style: 'active',
            //     styleNum: 1,
            //     energy: 100,
            //     distance: Infinity,
            //     position: {
            //         lat: getRandomReal( this.latMin, this.latMax ),
            //         lng: getRandomReal( this.lngMin, this.lngMax)
            //     }
            // })
            this.name = ""
        },
        deletebot(name) {
            this.$emit('deletebot',name);
        }
    }
}
</script>

<style scoped>
    .completed {
        color: green;
        text-shadow: 1px 1px 2px black;
    }
    .active {
        color: greenyellow;
        text-shadow: 1px 1px 2px black;
    }
    .charging{
        color: orangered;
        text-shadow: 1px 1px 2px black;
    }


</style>