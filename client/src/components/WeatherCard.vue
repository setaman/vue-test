<template>
    <div class="weather-card ">
        <v-layout class="weather-card-header" row wrap align-center>
            <v-flex class="data" xs12 sm4>
                <v-icon class="d-block" color="yellow">
                    wb_sunny
                </v-icon>
                <slide-in-out>
                    <span v-bind:key="time">{{temp + '°'}}</span>
                </slide-in-out>
                <!--<span>{{' / ' + weather_data.temp_min}}</span>-->
            </v-flex>
            <v-flex class="description" xs12 sm8>
                <v-layout align-center row wrap>
                    <v-flex xs12 class="pa-0">
                        <div>
                            <v-icon>
                                room
                            </v-icon>
                            <span>{{weather_data.location}}</span>
                        </div>
                    </v-flex>
                    <v-flex xs12 class="pa-0">
                        <div class="d-inline-block">
                            <v-icon>
                                insert_invitation
                            </v-icon>
                            <span>{{weather_data.date}}</span>
                        </div>
                        <div class="d-inline-block">
                            <v-icon>
                                access_time
                            </v-icon>
                            <slide-in-out>
                                <span v-bind:key="time">{{time}}</span>
                            </slide-in-out>
                        </div>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex>
                <weather-chart @update-hour="setHeaderData($event)" :weather="weather_data"></weather-chart>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import WeatherChart from "./WeatherChart";
    import SlideIn from "./transitions/SlideIn";
    import FadeIn from "./transitions/FadeIn";
    import SlideInOut from "./transitions/SlideOutIn";

    export default {
        name: "weather-card",
        components: {SlideInOut, FadeIn, SlideIn, WeatherChart},
        /*props: {
            weather_data: {
                type: Object,
                required: true
            }
        },*/
        data () {
            return {
             temp_data: 0,
             time_data: 0,
             date_data: 0,
                hour: null,
            }
        },
        computed: {
            temp() {
                return this.temp_data ? this.temp_data : this.weather_data.hours_forecast[0].temp; //this.$store.getters.getCurrentTemp;
            },
            time() {
                return this.time_data ? this.time_data : this.weather_data.hours_forecast[0].time//this.$store.getters.getCurrentTime;
            },
            weather_data () {
                return this.$store.getters.getCurrentWeatherItem;
            }
        },
        methods: {
            setHeaderData(item_index = 0){
                this.temp_data = this.weather_data.hours_forecast[item_index].temp;
                this.time_data = this.weather_data.hours_forecast[item_index].time;
                this.date_data = this.weather_data.hours_forecast[item_index].data;

                this.$emit('condition', item_index);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .weather-card {
        height: 100%;
        color: white;
        font-family: "Montserrat";
    }
    .data {
        text-align: center;
        i {
            font-size: 5rem;
        }
        span {
            color: white;
            font-size: 2.7rem;
            + span {
                color: rgba(255, 255, 255, 0.5);
            }
        }
    }

    .description {
        div {
            padding: 5px;
        }
        font-family: "Montserrat Light";
        font-size: 1.3rem;
        i {
            padding: 0 5px;
            color: rgba(255, 255, 255, 0.5);
        }
    }
</style>