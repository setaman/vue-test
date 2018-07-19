<template>
    <div>
        <v-autocomplete
                class="mb-5"
                color="white"
                clearable
                hide-no-data
                hide-selected
                :v-model="location"
                hint="Enter your city or use location button"
                :items="cities"
                persistent-hint
                prepend-icon="location_city"
                return-object
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

                <!--<v-icon
                        ripple
                        :color="isEditing ? 'success' : 'white'"
                        :key="`icon-${isEditing}`"
                        v-text="isEditing ? 'wb_sunny' : 'wb_sunny'"
                        @click="isEditing = !isEditing"
                        class="v-btn&#45;&#45;outline v-btn"
                ></v-icon>-->
            </v-slide-x-reverse-transition>
        </v-autocomplete>
        <v-expand-transition>
            <v-list class="red lighten-3" v-if="location">
                <v-list-tile
                        v-for="(city, i) in cities"
                        :key="i"
                >
                    <v-list-tile-content>
                        <v-list-tile-title v-text="city"></v-list-tile-title>
                        <v-list-tile-sub-title v-text="i"></v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-expand-transition>
    </div>
</template>

<script>

    export default {
        name: "location-input",
        data() {
            return {
                cities: ['kek', 'kek', 'kek'/*...this.$store.getters.cities*/],
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
                            console.log(position);
                            this.is_loading = false;
                            this.location = position.coordinates;
                        },
                        (error) => {
                            console.log(`Some Erro: ${error}`);
                        });
                } else {
                    console.log('Geolocation is not supported by this browser');
                }
            }
        }
    }
</script>

<style scoped>

</style>