<template>
    <v-snackbar
            v-model="snackState"
            :color="color"
            :timeout="timeout"
    >
        {{ text }}
        <v-btn
                dark
                :color="button_color"
                flat
                @click="snackbarAction"
        >
            {{button}}
        </v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        name: "SnackBar",
        data () {
            return {
                snack: true,
            }
        },
        props:{
            snackbar: {
                type: Boolean,
                default: false,
                required: true
            },
            text: {
                type: String,
                default: '',
                required: true
            },
            color: {
                type: String,
                default: 'dark'
            },
            button: {
                type: String,
                default: 'close'
            },
            button_color: {
                type: String,
                default: 'white'
            },
            method: {
                type: Function,
                default: null
            },
            timeout: {
                type: Number,
                default: 6000
            }
        },
        methods: {
            snackbarAction() {
                this.snack = false;
                if (this.method) {
                    this.method(); //execute some given method
                }
            }
        },
        computed: {
            snackState() {
                this.snack = this.snackbar;
                return this.snack;
            }
        }
    }

</script>

<style scoped>

</style>