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
                    this.markers[0].position.lat = this.center.lat;
                    this.markers[0].position.lng = this.center.lng;
                    /*this.markers.push( {
                        position:{
                            lat: this.center.lat,
                            lng: this.center.lng
                        }
                    } )*/
                })
            } else {
                console.log("no geolocation")
            }
        },
        methods:{
            async getData(){

            }
        }
        
    })
})();