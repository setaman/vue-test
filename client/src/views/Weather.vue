<template>
    <v-container id="weather-container" fluid fill-height grid-list-xl>
        <background-img :is_loading="weatherDataIsLoaded"></background-img>
        <div id="weather-content">
            <v-layout row wrap>
                <v-flex xs12>
                    <v-layout row wrap justify-center>
                        <v-flex xs12 sm12 md6 lg6 xl6>
                            <weather-loader></weather-loader>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs12 v-if="weatherDataIsLoaded">
                    <slide-in>
                    <v-layout row wrap align-center justify-center>
                        <v-flex xs12 sm12 md8 lg8 xl8>
                            <transition name="fade">
                                <weather-card v-if="show_card"
                                              :weather_data="weatherDataObject"></weather-card>
                            </transition>
                        </v-flex>
                        <v-flex xs12 sm10 md3 lg2 xl2>
                                <weather-list :weather_data="weatherDataArray"></weather-list>
                        </v-flex>
                    </v-layout>
                    </slide-in>

                </v-flex>
            </v-layout>
        </div>
    </v-container>
</template>

<script>
    import WeatherCard from "../components/WeatherCard";
    import WeatherList from "../components/WeatherList";
    import SlideIn from "../components/transitions/SlideIn";
    import WeatherLoader from "../components/WeatherLoader";
    import BackgroundImg from "../components/BackgroundImg";

    export default {
        name: "Weather",
        components: {BackgroundImg, WeatherLoader, SlideIn, WeatherList, WeatherCard},
        data() {
            return {
                currentWeatherData: [],
                currentWeatherObject: null,
                show_card: true,
            }
        },
        computed: {
            weatherDataArray () {
                return this.currentWeatherData = this.$store.getters.getWeather;
            },
            weatherDataObject () {
                this.currentWeatherObject = this.$store.getters.getCurrentWeatherItem;
                this.selectCurrentWeatherObject(this.currentWeatherObject);
                return this.currentWeatherObject;
            },
            weatherDataIsLoaded () {
                return this.$store.getters.weatherDataLoaded;
            }
        },
        methods: {
            selectCurrentWeatherObject(item) {
                this.show_card = false;
                console.log(item);
                /*this.$store.commit('CHANGE_CURRENT_CONDITION', item.hours_forecast[0].condition);
                this.$store.commit('CHANGE_CURRENT_TEMP', item.hours_forecast[0].temp);
                this.$store.commit('CHANGE_CURRENT_TIME', item.hours_forecast[0].time);*/
                setTimeout(() => this.show_card = true, 300);
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
                //font-family: 'Montserrat', sans-serif;
            }
        }

        #weather-content {
            width: 100%;
            z-index: 1;
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

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to
    {
        opacity: 0;
    }

    @media only screen and (max-width: 959px) {
        #weather-content {
            padding-top: 40px !important;
        }

    }
</style>