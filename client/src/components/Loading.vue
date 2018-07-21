<template>
    <div>
        <div class="loader" >
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
            return {
                location: null
            }
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
                        this.location = response.data.list[0].main.temp;
                        this.$store.commit('SET_WEATHER_DATA', response.data.list.map((item) => {
                            //console.log(item)
                            return {
                                date: item.dt_txt,
                                temp: item.main.temp,
                                pressure: item.main.pressure,
                                icon: item.weather[0].main,
                                location: response.data.city.name
                            }
                        }));
                    })
                    .catch(error => console.log(error));
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
        0%, 100%{
            transform: scale(1);
        }
        25%{
            transform: scale(1.2);
        }
        50% {
            transform: scale(1.1);
        }
    }

    @keyframes pulse-back {
        0%,100%{
            border-color: transparent;
            box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);

        }
        10% {
            box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.25);

        }

    }

</style>