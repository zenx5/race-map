(function(){
    new Vue({
        el: "#app",
        vuetify: new Vuetify(),
        components: {
          //'location': window.httpVueLoader('./components/Location.vue'),
        },
        data(){
            return {
                name: "Race Map",
                version: "1.0.0"
            }
        },
        methods:{
            async getData(){

            }
        }
        
    })
})();