(function(){
    let MAPS = Vue.use(VueGoogleMaps,{
        load:{
            key: '',
            libraries: 'places'
        }
    });
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
                config: {
                    minbot:5,
                    maxbot:10,
                    limit: 6
                },
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
            if( sessionStorage.getItem('config') == undefined) {
                sessionStorage.setItem('config', JSON.stringify( this.config ) )
            }else{
                this.config = JSON.parse( sessionStorage.getItem('config') );
            }

            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition( position => {
                    this.center.lat = position.coords.latitude
                    this.center.lng = position.coords.longitude
                    this.meta.lat = position.coords.latitude
                    this.meta.lng = position.coords.longitude
                })
            } else {
                alert("Geolocation no disponible en su navegador");
            }
        },
        methods:{
            deletebot(name) {
                this.bots = this.bots.filter( bot => bot.name != name )
            },
            changemeta(ev) {
                this.meta.lat = ev.latLng.lat
                this.meta.lng = ev.latLng.lng
            },
            guardarConfig(){
                sessionStorage.setItem('config', JSON.stringify( this.config ) )
            }
        }
        
    })
})();
