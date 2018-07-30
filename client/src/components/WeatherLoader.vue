<template>
    <div>
        <snack-bar :text="sb_options.text"
                   :snackbar="sb_options.sb"
                   :color="sb_options.color"
                   :timeout="sb_options.timeout"
                   :button="sb_options.button"
                   :button_color="sb_options.button_color"
                   :method="sb_options.sb_method">
        </snack-bar>

        <v-autocomplete
                deletable-chips
                class="mb-2"
                color="white"
                clearable
                :search-input.sync="model"
                @keyup.native.enter="submit(model)"
                :hint="current_location ? `Your current Location is ${current_location}` : 'Enter your city or use location button'"
                :items="cities"
                persistent-hint
                prepend-icon="location_city"
                label="Select your city"
                :disabled="is_automatic_loading || is_loading"
                :loading="is_loading"
                hide-selected
                no-data-text="No Cities"
        >
            <v-slide-x-reverse-transition
                    mode="out-in"
                    slot="append-outer"
            >
                <div class="d-flex justify-center align-center">
                    <v-btn flat medium icon color="white" @click="getLocation" :loading="is_automatic_loading"
                           :disabled="is_loading || is_automatic_loading">
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
    import {getCities} from '../api/cities';
    import SnackBar from "./SnackBar";

    export default {
        name: "WeatherLoader",
        components: {SnackBar, FadeIn},
        data() {
            return {
                is_automatic_loading: true,
                is_loading: false,
                model: '',
                current_location: '',
                entries: [],
                sb_options: {
                    sb: false,
                    text: '',
                    color: '',
                    button: '',
                    button_color: '',
                    sb_method: null,
                    timeout: 6000
                }
            }
        },
        methods: {
            getLocation() {
                this.is_automatic_loading = true;

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                            this.getWeather(null, position);
                        },
                        (error) => {
                            console.log(`Some Error: ${error}`);
                            this.is_automatic_loading = false;
                        });
                } else {
                    console.log('Geolocation is not supported by this browser');
                    this.is_automatic_loading = false;
                }
            },
            getWeather: function (city, coords) {

                if (city) this.is_loading = true;

                this.weatherDataIsLoading();

                let url = '';
                city ? url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}` :
                    url = `http://api.openweathermap.org/data/2.5/forecast?lat=${coords.coords.latitude}&lon=${coords.coords.longitude}`;
                setTimeout(() => {
                    axios
                        .get(`${url}&units=metric&APPID=${api_keys.weather_api_key}`)
                        .then(response => {
                            console.log(response.data);
                            this.$store.commit('SET_WEATHER_DATA', this.buildWeatherObjectArray(response.data));
                        })
                        .catch(error => {
                            console.log(error);
                            this.sb_options = {
                                sb: true,
                                text: 'Some error was occurred. Please try again',
                                color: 'error',
                                button: 'retry',
                                button_color: 'warning',
                                sb_method: () => {this.getLocation()},
                                timeout: 5000
                            };
                        });
                }, 1000)

            },
            buildWeatherObjectArray(data) {
                let weatherDataArray = [];
                let weatherDataObject = {};

                this.current_location = data.city.name;

                moment.locale(data.city.country.toLowerCase());

                for (let i = 0; i < data.list.length; i++) {
                    let item = data.list[i];

                    let time = item.dt_txt.slice(item.dt_txt.indexOf(' ')).slice(1, 6);//HH-MM
                    let time_number = Number(time.slice(0, 2));//HH
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
                            condition: this.setCondition(item.weather[0].id),
                            time: time,
                            temp: Number(item.main.temp.toFixed(0))
                        }]
                    };
                    for (let j = 0; j < ((24 - time_number) / 3 - 1); j++) {
                        i++;
                        if (i === data.list.length) break;
                        let following_item = data.list[i];
                        let following_item_time = following_item.dt_txt.slice(following_item.dt_txt.indexOf(' ')).slice(1, 6);
                        weatherDataObject.hours_forecast.push({
                            condition: this.setCondition(following_item.weather[0].id),
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
            calcTemp(obj) {
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
            setCondition: (condition) => {
                switch (true) {
                    case condition === 800:
                        return 0;
                    case condition === 801:
                        return 1;
                    case condition === 802:
                        return 2;
                    case (condition === 803 || condition === 804):
                        return 3;
                    case (/^6[0-9]+[0-9]+$/).test(condition):
                        return 4;
                    case (/^5[0-9]+[0-9]+$/).test(condition):
                        return 5;
                    case (/^3[0-9]+[0-9]+$/).test(condition):
                        return 6;
                    case (/^2[0-9]+[0-9]+$/).test(condition):
                        return 7;
                }
            },
            weatherDataIsLoaded() {
                this.is_automatic_loading = false;
                this.is_loading = false;
                this.$store.commit('WEATHER_DATA_LOADED');
            },
            weatherDataIsLoading() {
                this.$store.commit('WEATHER_DATA_LOADING');
            },
            submit() {
                this.is_loading = true;
                getCities(this.model)
                    .then((response) => {
                        if (!response || !response.data || response.data.length === 0) {
                            this.sb_options = {
                                sb: true,
                                text: 'No cities found',
                                color: 'error',
                                button: 'close',
                            };
                        } else {
                            this.entries = [];
                            this.entries.push(response.data.map((i) => i.name));
                            console.log(this.entries);
                            this.sb_options = {
                                sb: true,
                                text: 'Cities',
                                color: 'success',
                                button: 'close',
                                sb_method: () => console.log(`Here are your cities: ${response.data[0]}`),
                                timeout: 5000
                            };
                        }
                        this.is_loading = false;
                    })
                    .catch((err) => {
                        console.log(err);
                        this.sb_options = {
                            sb: true,
                            text: 'Some error was occurred while executing request. Please try again',
                            color: 'error',
                            button: 'retry',
                            button_color: 'warning',
                            sb_method: () => {
                                this.submit()
                            },
                            timeout: 10000
                        };
                        this.is_loading = false;
                    });
            }
        },
        mounted: function () {
            this.getLocation();
        },
        watch: {
            model () {
                //if (this.model.length >= 3) this.submit();
            }
        },
        computed: {
            cities () {
                return this.entries;
            }
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