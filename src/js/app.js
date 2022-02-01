(function(){
    let MAPS = Vue.use(VueGoogleMaps,{
        load:{
            key: 'AIzaSyCzsAdLpGYkTujvr_cT1wlOQqEfrrwF2Pw',
            libraries: 'places'
        }
    });
    console.log(MAPS)
    new Vue({
        el: "#app",
        vuetify: new Vuetify(),
        components: {
          //'location': window.httpVueLoader('./components/Location.vue'),
          'map-board': window.httpVueLoader('./components/MapBoard.vue'),
          'bots-register': window.httpVueLoader('./components/BotsRegister.vue'),
          'marker-bot': window.httpVueLoader('./components/MarkerBot.vue')
        },
        data(){
            return {
                name: "Race Map",
                version: "1.0.0",
                meta:{
                    lat:0, 
                    lng:0
                },
                center: {
                    lat:0, 
                    lng:0
                },
                position: {
                    lat: 10.5004352,
                    lng: -66.9511459
                },
                bots: [],
                markers: [
                    {
                        position: {
                            lat:0, 
                            lng:0   
                        }
                    }
                ]
            }
        },
        created(){
            console.log(MAPS)
            if ("geolocation" in navigator) {
                console.log("geolocation")
                navigator.geolocation.getCurrentPosition( position => {
                    console.log(position)
                    this.center.lat = position.coords.latitude
                    this.center.lng = position.coords.longitude
                    this.meta.lat = position.coords.latitude
                    this.meta.lng = position.coords.longitude
                })
            } else {
                console.log("no geolocation")
            }
        },
        methods:{
            async getData(){

            },
            deletebot(name) {
                this.bots = this.bots.filter( bot => bot.name != name )
            },
            changemeta(ev) {
                console.log( this.meta )
                console.log( ev.latLng )
                this.meta.lat = ev.latLng.lat
                this.meta.lng = ev.latLng.lng
            }
        }
        
    })
})();