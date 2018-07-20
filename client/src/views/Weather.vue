<template>
    <v-container id="weather-container" fluid align-center justify-center fill-height>
        <v-layout id="weather-content" row align-center justify-center>
            <v-flex sm12 md6 lg6 xl6>
                <location-input></location-input>
                <v-expansion-panel v-if="weatherData.length > 0" focusable class="elevation-10">
                    <v-expansion-panel-content v-for="(item, i) in weatherData" :key="i">
                        <div slot="header" class="d-flex justify-start align-content-center">
                            <!--<v-icon color="yellow darken-3">{{item.icon}}</v-icon>-->
                            <span class="">{{item.temp}}</span>
                            <span>{{item.date}}</span>
                        </div>
                        <v-card>
                            <v-card-text class="lighten-3">
                                <weather-inner-card :weather_data="item"></weather-inner-card>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-flex>
        </v-layout>
        <div id="weather-img" class="fill-height"></div>
    </v-container>
</template>

<script>
    import WeatherInnerCard from "../components/WeatherInnerCard";
    import LocationInput from "../components/LocationInput";

    export default {
        name: "Weather",
        components: {LocationInput, WeatherInnerCard},
        data() {
            return {
                currentWeatherData: []
            }
        },
        computed: {
            weatherData: function () {
                return this.currentWeatherData = this.$store.getters.getWeather;
            }
        }
    }
</script>

<style lang="scss" scoped>
    #weather-container {
        div.flex {
            ul {
                border-radius: 10px;
            }
            li:first-child {
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
            }
            li:last-child {
                border-bottom-left-radius: 10px;
                border-bottom-right-radius: 10px;
            }
            div, span {
                font-family: 'Montserrat', sans-serif;
            }
        }

        #weather-content {
            z-index: 1;
        }
        #weather-img {
            position: fixed;
            background: url("../assets/img/weather_sunshine.jpg") no-repeat;
            background-size: cover;
            height: 100%;
            width: 100%;
            filter: blur(0px) brightness(85%) opacity(100%) contrast(50%);
        }
    }

    .align-content-center {
        * {
            margin: 0 10px;
            align-self: center;
            flex: 0 0 auto !important;
        }
        span {
            text-transform: uppercase;
            font-weight: bold;
        }
    }

    .v-btn {
        background-image: $background_gradient_danger !important;
    }

</style>