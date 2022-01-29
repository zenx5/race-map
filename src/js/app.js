(function(){
    Vue.use(VueGoogleMaps,{
        load:{
            key: 'AIzaSyCzsAdLpGYkTujvr_cT1wlOQqEfrrwF2Pw',
            libraries: 'places'
        }
    });
    new Vue({
        el: "#app",
        vuetify: new Vuetify(),
        components: {
          //'location': window.httpVueLoader('./components/Location.vue'),
          'map-board': window.httpVueLoader('./components/MapBoard.vue')
        },
        data(){
            return {
                name: "Race Map",
                version: "1.0.0",
                center: {
                    lat:0, 
                    lng:0
                },
                markers: [
                    
                ]
            }
        },
        created(){
            if ("geolocation" in navigator) {
                console.log("geolocation")
                navigator.geolocation.getCurrentPosition( position => {
                    console.log(position)
                    this.center.lat = position.coords.latitude
                    this.center.lng = position.coords.longitude
                    this.markers.push( {
                        position:{
                            lat: this.center.lat,
                            lng: this.center.lng
                        }
                    } )
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