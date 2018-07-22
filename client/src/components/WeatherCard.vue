<template>
    <div class="weather-card ">
        <v-layout class="weather-card-header" row>
            <v-flex xs4>
                <v-icon class="d-block" color="yellow">
                    wb_sunny
                </v-icon>
                <span>25°</span>
            </v-flex>
            <v-flex xs8>
                Details

            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex>
                <weather-chart></weather-chart>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import WeatherChart from "./WeatherChart";

    export default {
        name: "weather-card",
        components: {WeatherChart},
        props: {
            weather_data: {
                type: Object,
                required: true,
                default() {
                    return {
                        temperature: 0,
                        location: 'Aachen',
                        hours_temp: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        icon: 'wb_sunny'
                    }
                }
            }
        },
        computed: {
            weatherDataArray() {
                return this.$store.getters.getWeather;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .weather-card {
        border-radius: 12px;
        //background-color: rgba(255, 255, 255, 0.25);
        padding: 20px;
        height: 100%;
        color: black;
    }

    .weather-card-header {
        i {
            font-size: 5rem;
        }
        span {
            color: white;
            font-size: 2.5rem;
        }
        div:first-child {
            text-align: center;
        }
    }
</style>