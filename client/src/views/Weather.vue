<template>
    <v-container id="weather-container" fluid fill-height grid-list-md>
        <div id="weather-img" class="fill-height"></div>

        <div id="weather-content">
            <v-layout row wrap justify-center>
                <v-flex sm12 md6 lg6 xl6>
                    <location-input></location-input>
                </v-flex>
            </v-layout>
            <v-layout v-if="weatherDataArray.length > 0" row wrap align-center justify-center>
                <v-flex sm12 md6 lg6 xl6>
                    <weather-card :weather_data="weatherDataArray"></weather-card>
                </v-flex>
                <v-flex sm12 md6 lg6 xl3>
                    <!--<v-expansion-panel focusable class="elevation-10">
                        <v-expansion-panel-content v-for="(item, i) in weatherDataArray" :key="i">
                            <div slot="header" class="d-flex justify-start align-content-center">
                                &lt;!&ndash;<v-icon color="yellow darken-3">{{item.icon}}</v-icon>&ndash;&gt;
                                <span class="">{{item.temp}}</span>
                                <span>{{item.date}}</span>
                            </div>
                            <v-card>
                                <v-card-text class="lighten-3">
                                    <weather-inner-card :weather_data="item"></weather-inner-card>
                                </v-card-text>
                            </v-card>
                        </v-expansion-panel-content>
                    </v-expansion-panel>-->
                    <weather-list :weather_data="weatherDataArray"></weather-list>

                </v-flex>
            </v-layout>
            <loading v-else></loading>
        </div>
    </v-container>
</template>

<script>
    import WeatherInnerCard from "../components/WeatherInnerCard";
    import WeatherCard from "../components/WeatherCard";
    import LocationInput from "../components/LocationInput";
    import Loading from "../components/Loading";
    import WeatherList from "../components/WeatherList";

    export default {
        name: "Weather",
        components: {WeatherList, WeatherCard, Loading, LocationInput, WeatherInnerCard},
        data() {
            return {
                currentWeatherData: []
            }
        },
        computed: {
            weatherDataArray: function () {
                return this.currentWeatherData = this.$store.getters.getWeather;
            },
            weatherSelectedDataSet() {

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
            width: 100%;
            z-index: 1;
        }
        #weather-img {
            z-index: 0;
            position: fixed;
            top: 0;
            left: 0;
            background: url("../assets/img/weather_sunshine.jpg") no-repeat;
            height: 100vh;
            width: 100vw;
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