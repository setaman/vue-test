<template>
    <div>
        <v-card>
            <v-list>
                <v-list-tile
                        v-for="(item, i) in weather_data"
                        :key="i"
                        @click=""
                >
                    <v-list-tile-action>
                        <v-icon color="pink">{{item.icon}}</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.temp + ' ' + item.date"></v-list-tile-title>
                    </v-list-tile-content>

                </v-list-tile>
            </v-list>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "weather-list",
        data () {
            return {
            }
        },
        props: {
            weather_data: {
                type: Array,
                required: true,
                default () {
                    return {
                        temperature: 0,
                        location: 'Aachen',
                        hours_temp: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        icon: 'wb_sunny'
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