<template>
    <div>
        <div class="loader">
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
    </div>
</template>

<script>
    import axios from 'axios';
    import {api_keys} from '../../config';

    export default {
        name: "loading",
        data() {
            return {}
        },
        methods: {
            getLocation: function () {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                            this.location = position.coordinates;
                            this.getWeather(position);
                        },
                        (error) => {
                            console.log(`Some Erro: ${error}`);
                        });
                } else {
                    console.log('Geolocation is not supported by this browser');
                }
            },
            getWeather: function (position) {
                axios
                    .get(`http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=${api_keys.weather_api_key}`)
                    .then(response => {
                        console.log(response.data);
                        this.$store.commit('SET_WEATHER_DATA', this.buildWeatherObjectArray(response.data));
                    })
                    .catch(error => console.log(error));
            },
            buildWeatherObjectArray: data => {
                let weatherDataArray = [];
                let weatherDataObject = {};

                for (let i = 0; i < data.list.length; i++) {
                    let item = data.list[i];

                    let time = Number(item.dt_txt.slice(item.dt_txt.indexOf(' ')).slice(1,3));

                    //init object for first item
                    weatherDataObject = {
                        date: item.dt_txt,
                        temp: item.main.temp,
                        pressure: item.main.pressure,
                        icon: item.weather[0].main,
                        location: data.city.name,
                        hours_forecast: [{
                            time: time,
                            temp: item.main.temp
                        }]
                    };
                    for (let j = 0 ; j < ((24-time)/3 - 1); j++){
                        i++;
                        if (i === data.list.length) break;
                        let following_item = data.list[i];
                        let following_item_time = Number(following_item.dt_txt.slice(following_item.dt_txt.indexOf(' ')).slice(1,3));
                        weatherDataObject.hours_forecast.push({
                            time: following_item_time,
                            temp: following_item.main.temp
                        })
                    }
                    weatherDataArray.push(weatherDataObject);
                }
                return weatherDataArray;
            }
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