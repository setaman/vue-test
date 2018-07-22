<template>
    <div>
        <v-layout text-xs-center class="weather-card">
            <v-flex xs12 sm3 md3 lg3 xl3>
                <v-icon color="yellow darken-3">{{weather_data.icon}}</v-icon>
                <div class="grey--text text--darken-2">{{weather_data.temp}}</div>
            </v-flex>

            <v-flex xs12 sm9 md9 lg9 xl9>
                {{weather_data.location}}
            </v-flex>
        </v-layout>
        <v-layout class="weather-card">
            <v-flex xs12 sm9 md9 lg9 xl9>
                Hello
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: "weather-inner-card",
        props: {
            weather_data: {
                type: Object,
                required: true,
                default () {
                    return {
                        temperature: 0,
                        location: 'Aachen',
                        hours_temp: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        icon: 'wb_sunny',
                    }
                }
            }
        },
        computed : {
            weatherDataArray() {
                return this.$store.getters.getWeather;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .weather-card{
        i {
            font-size: 4rem;
        }
        div{
            font-size: 4rem;
        }
    }
</style>