<template>
    <div>
        <v-autocomplete
                class="mb-5"
                color="white"
                clearable
                v-model="city"
                :hint="current_location ? `Your current Location is ${current_location}` : 'Enter your city or use location button'"
                :items="[]"
                persistent-hint
                prepend-icon="location_city"
                label="Choose your city"
                :disabled="is_automatic_loading || is_loading"
                :loading="is_loading"
                @enter="getWeather(city)"
        >
            <v-slide-x-reverse-transition
                    mode="out-in"
                    slot="append-outer"
            >
                <div class="d-flex justify-center align-center">
                    <v-btn flat medium icon color="white" @click="getLocation" :loading="is_automatic_loading" :disabled="is_loading || is_automatic_loading">
                        <v-icon>room</v-icon>
                    </v-btn>
                </div>
            </v-slide-x-reverse-transition>
        </v-autocomplete>

        <fade-in>
            <div v-if="is_automatic_loading" class="loader">
                <div class="pulse first-shadow">
                    <div class="second-shadow">
                        <div class="third-shadow">
                            <i class="material-icons">
                                room
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </fade-in>
    </div>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    import {api_keys} from '../../config';
    import FadeIn from "./transitions/FadeIn";

    export default {
        name: "WeatherLoader",
        components: {FadeIn},
        data() {
            return {
                is_automatic_loading: true,
                is_loading: false,
                city: null,
                current_location: ''
            }
        },
        methods: {
            getLocation () {
                this.is_automatic_loading = true;

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                            this.getWeather(null, position);
                        },
                        (error) => {
                            console.log(`Some Erro: ${error}`);
                            this.is_automatic_loading = false;
                        });
                } else {
                    console.log('Geolocation is not supported by this browser');
                    this.is_automatic_loading = false;
                }
            },
            getWeather: function (city, coords) {

                if(city) this.is_loading = true;

                this.weatherDataIsLoading();

                let url = '';
                city ? url =`http://api.openweathermap.org/data/2.5/forecast?q=${city}`:
                url = `http://api.openweathermap.org/data/2.5/forecast?lat=${coords.coords.latitude}&lon=${coords.coords.longitude}`;
                setTimeout(()=>{
                    axios
                        .get(`${url}&units=metric&APPID=${api_keys.weather_api_key}`)
                        .then(response => {
                            console.log(response.data);
                            this.$store.commit('SET_WEATHER_DATA', this.buildWeatherObjectArray(response.data));
                        })
                        .catch(error => console.log(error));
                }, 2000)

            },
            buildWeatherObjectArray (data) {
                let weatherDataArray = [];
                let weatherDataObject = {};

                this.current_location = data.city.name;

                moment.locale(data.city.country.toLowerCase());

                for (let i = 0; i < data.list.length; i++) {
                    let item = data.list[i];

                    let time = item.dt_txt.slice(item.dt_txt.indexOf(' ')).slice(1, 6);//HH-MM
                    let time_number = Number(time.slice(0,2));//HH
                    let date = item.dt_txt.slice(0, item.dt_txt.indexOf(' ')).trim();//YYYY-MM-DD

                    //init object for first item
                    weatherDataObject = {
                        date: this.setDate(date),
                        temp_min: 0,
                        temp_max: 0,
                        pressure: item.main.pressure,
                        icon: item.weather[0].main,
                        location: this.current_location,
                        hours_forecast: [{
                            time: time,
                            temp: Number(item.main.temp.toFixed(0))
                        }]
                    };
                    for (let j = 0 ; j < ((24-time_number)/3 - 1); j++){
                        i++;
                        if (i === data.list.length) break;
                        let following_item = data.list[i];
                        let following_item_time = following_item.dt_txt.slice(following_item.dt_txt.indexOf(' ')).slice(1,6);
                        weatherDataObject.hours_forecast.push({
                            time: following_item_time,
                            temp: Number(following_item.main.temp.toFixed(0))
                        })
                    }
                    weatherDataObject = this.calcTemp(weatherDataObject);
                    weatherDataArray.push(weatherDataObject);
                    this.weatherDataIsLoaded();
                }
                return weatherDataArray;
            },
            calcTemp (obj){
                let temp_array = obj.hours_forecast.map(item => item.temp);
                obj.temp_max = this.appendCelsiusSign(Math.max(...temp_array));
                obj.temp_min = this.appendCelsiusSign(Math.min(...temp_array));
                return obj;
            },
            appendCelsiusSign: item => item + '°',
            setDate: date => {
                let momentDate = moment(date).calendar();
                momentDate = momentDate.slice(0, momentDate.indexOf(' '));
                return `${momentDate} ${date}`;
            },
            weatherDataIsLoaded (){
                this.is_automatic_loading = false;
                this.is_loading = false;
                this.$store.commit('WEATHER_DATA_LOADED');
            },
            weatherDataIsLoading (){
                this.$store.commit('WEATHER_DATA_LOADING');
            },
        },
        mounted: function () {
            this.getLocation();
        }
    }
</script>

<style lang="scss" scoped>
    .loader {
        position: fixed;
        height: 100vh;
        width: 100vw;
        top: 0;
        left: 0;
        z-index: 1010;
        font-size: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        div {
            border-radius: 50%;
            box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.25);
        }
        .first-shadow {
            border: 30px solid transparent;
            animation: pulse-back 2s linear infinite;
            animation-delay: .3s;

        }
        .second-shadow {
            border: 30px solid transparent;
            animation: pulse-back 2s linear infinite;
            animation-delay: .2s;
        }
        .third-shadow {
            border: 30px solid transparent;
            animation: pulse-back 2s linear infinite;

        }
        i {
            opacity: 1 !important;
            padding: 40px;
            color: rgba(69, 202, 252, 1);
            font-size: 15rem;
            animation: pulse-resize 2s linear infinite;;
        }

    }

    @keyframes pulse-resize {
        0%, 100% {
            transform: scale(1);
        }
        25% {
            transform: scale(1.2);
        }
        50% {
            transform: scale(1.1);
        }
    }

    @keyframes pulse-back {
        0%, 100% {
            border-color: transparent;
            box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);

        }
        10% {
            box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.25);

        }

    }

</style>