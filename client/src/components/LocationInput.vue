<template>
    <div>
        <v-autocomplete
                class="mb-5"
                color="white"
                clearable
                v-model="location"
                :hint="location ? location.toString() : 'Enter your city or use location button'"
                :items="cities"
                persistent-hint
                prepend-icon="location_city"
                label="Add your Location"
        >
            <v-slide-x-reverse-transition
                    mode="out-in"
                    slot="append-outer"
            >
                <div class="d-flex justify-center align-center">
                    <v-btn flat medium icon color="white" @click="getLocation" :loading="is_loading">
                        <v-icon>room</v-icon>
                    </v-btn>
                </div>
            </v-slide-x-reverse-transition>
        </v-autocomplete>
    </div>
</template>

<script>
    import axios from 'axios';
    import weather_api_key from '../api/weather';

    export default {
        name: "location-input",
        data() {
            return {
                cities: ['Alabama', 'Alaska', 'American Samoa', 'Arizona',
                    'Arkansas', 'California', 'Colorado', 'Connecticut',
                    'Delaware', 'District of Columbia', 'Federated States of Micronesia'/*...this.$store.getters.cities*/],
                is_loading: false,
                location: null
            }
        },
        computed: {},
        methods: {
            showCities: function () {
                alert(this.cities);

            },

            getLocation: function () {

                this.is_loading = true;

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
                    .get(`http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=${weather_api_key}`)
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
                    .catch(error => console.log(error))
                    .then(() => {
                        this.is_loading = false;
                    });
            }
        }
    }
</script>

<style scoped>

</style>