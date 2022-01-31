<template>
    <v-text-field
        :label="label"
        v-model="value">
        <template v-slot:append>
            <v-icon @click="action">{{icon}}</v-icon>
        </template>
    </v-text-field>
</template>

<script>
module.exports = {
    props: {
        label: {
            type: String,
            default: ""
        },
        icon: {
            type: String,
            default: ""
        }
    },
    data(){
        return {
            value: ""
        }
    },
    methods: {
        action(){
            this.$emit('click',this.value)
            this.value = ""
        }
    }
}
</script>

<style>

</style>